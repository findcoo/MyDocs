# Kubernetes

## Kops
kubernetes(이하 쿠브)의 설치, 업그레이드, 관리용 도구
상용 서비스를 위한 솔루션을 표방한다. 개인적으로는 AWS에 쿠브
클러스터를 만들기 위한 솔루션으로 사용.
## 과정
* 설치
  필자는 mac os에서 사용함으로 mac os 설치법만 서술한다.(자세한 건 -> [link](https://kubernetes.io/docs/getting-started-guides/kops/#creating-a-cluster)
  `brew update && brew install kubectl kops`
  
* id\_rsa.pub
  kops는 ~/.ssh/id\_rsa.pub 위치에 있는 ssh 공개키를 이용한다.
  없다면 생성한다. `ssh-keygen -t rsa`
