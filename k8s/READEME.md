# Kubernetes

## Kops
kubernetes(이하 쿠브)의 설치, 업그레이드, 관리용 도구
상용 서비스를 위한 솔루션을 표방한다. 개인적으로는 AWS에 쿠브
클러스터를 만들기 위한 솔루션으로 사용.

## 사전 요구사항
* AWS CLI

  각 OS 플랫폼 별로 패키지 관리자를 통해 aws cli 도구를 설치한 후
  `aws configure` 명령을 통해 aws 프로파일을 생성한다.
  
## 과정
* 설치 (자세한 건 -> [doc](https://kubernetes.io/docs/getting-started-guides/kops/)

  필자는 mac os에서 사용함으로 mac os 설치법만 서술한다.
  `brew update && brew install kubectl kops`
* id\_rsa.pub

  kops는 ~/.ssh/id\_rsa.pub 위치에 있는 ssh 공개키를 이용한다.
  없다면 생성한다. `ssh-keygen -t rsa`
* Route 53 도메인 생성

  kops는 DNS를 통해 클러스터를 발견한다.
  ```bash
  aws route53 create-hosted-zone --name dev.example.com --caller-reference 1
  ```
  dig 명령을 통해 제대로 만들어졌는지 확인.
  ```bash
  dig dev.example.com +short
  ```
  응답이 없으면 문제가 있으니 route53 설정을 확인한다.

* S3 버켓을 생성

  클러스터의 상태를 저장하기 위한 저장소이다.
  저장소 설정을 위해 환경변수를 설정한다.
  ```bash
  aws s3 mb s3://clusters.dev.example.com
  export KOPS_STATE_STORE=s4://clusters.dev.example.com
  ```
* 클러스터를 설정한다.

  ```bash
  kops create cluster --zone=ap-northeast-2a,ap-northeast-2c apnortheast2.dev.example.com
  ```
  해당 명령을 친다고 클러스터의 인스턴스들이 런칭되는건 아니다. 설정만 생성할 뿐.
  * cluster 항목 보기 `kops get cluster`
  * cluster 설정하기 `kops edit cluster apnortheast2.dev.example.com`
  * AWS 인스턴스 그룹 설정하기 `kops edit ig --name=apnortheast2.dev.example.com nodes`
  * AWS 인스턴스 마스터 그룹 설정하기 `kops edit ig --name=apnortheast2.dev.example.com master-ap-northeast-2a`
* 클러스터 생성

  ```bash
  kops update cluster apnortheast2.dev.example.com --yes
  ```
  update 명령은 현재 설정에 맞추어 클러스터를 생성한다.
  이미 생성된 클러스터에 설정을 변경할 때도 사용된다.
  `--yes` 옵션을 부여하면 설정을 적용하고 옵션을 주지않고 명령을 치면
  현재 설정을 보여주기만 한다.

## Terraform을 이용한 클러스터 생성
* 목적 [Doc](https://github.com/kubernetes/kops/blob/master/docs/terraform.md) 

  kops와 terraform을 사용하여 클러스터의 상태를 관리한다.
  이전에 terraform을 별도로 설치한다. [Doc](https://www.terraform.io/intro/getting-started/install.html)
* terraform setting

  ```grooby
  // file test.tf
  terraform {
    backend "s3" {
      bucket = "test.tf"
      key    = "conf"
      region = "ap-northeast-2"
    }
  }
  ```
  파일을 설정하고 다음 명령어를 실행
  `terraform init`
* cluster 생성 및 적용

  ```bash
  kops create cluster \
  --zone=ap-northeast-2a,ap-northeast-2c \
  apnortheast2.dev.example.com \
  --out=. \
  --target=terraform
  ```
  클러스터의 생성 정보가 로컬 파일로 저장되며
  s3 버켓에도 똑같은 클러스터 정보가 저장된다.
  이로써 terraform 플랜이 완성되었다. 
  여기서 주의할 것은 kops명령을 사용하여 클러스터를 구축시에는
  `kops update ...` 명령을 사용했지만 terraform을 사용할 경우에는
  아래 명령을 사용한다. kops 명령은 인프라의 설정 정보를 terraform으로
  저장할 뿐이란 것을 기억할 것.
  ```bash
  terraform plan
  terraform apply
  ```
* cluster 삭제

  먼저 kops를 통해 클러스터를 삭제하고
  terraform plan을 삭제한다. 순서가 뒤바뀌면 마스터 인스턴스 그룹을
  종료하지 못하여 terraform 명령이 무한 루프에 빠진다.
  ```bash
  kops delete cluster apnortheast2.dev.example.com
  terraform plan --destroy
  terraform destroy
  ```
* 재사용

  삭제했던 cluster는 아직 terraform plan으로 남아있기 때문에
  terraform명령으로 다시 재사용 할 수 있다.
  ```bash 
  terraform plan
  terraform apply
  ```
