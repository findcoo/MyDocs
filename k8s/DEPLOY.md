# Deploy

## Kubectl
  컨테이너 배포 및 관리를 위한 CLI도구
## Cheat sheet
```bash
$> kubectl get nodes # node의 정보 출력
$> kubectl run mysql --image=mysql --port=3306 # container 배포
$> kubectl get deployments # deployment 정보 출력
$> kubectl describe  ... # 상세 정보 출력
$> kubectl logs ... # 컨테이너 로그 출력
$> kubectl exec ... # 컨테이너에 명령을 실행시킨다
```
### Tip
`kubectl run` 명령은 다음 절차를 시행시킨다. 
1. 컨테이너가 운용될 수 있는 적절한 node를 선택.
2. 컨테이너 배포 작업을 시행한다.

## Pods
앞서 치트 시트에서 run명령을 통해 컨테이너를 배포할 때,
컨테이너는 Pod위에 생성된다.
Pod은 컨테이너 및 컨테이너가 공유하는 볼륨등 배포의 자원들을 
집합체로 여기는 개념이다. 다음과 같은 특징을 갖는다.

* 볼륨 공유
* 오버레이 네트워크
* 컨테이너의 정보

## Nodes
Pods은 Node위에서 동작하며 Node는 k8s 엔진이 작동하는 머신을 뜻한다.

* kubelet이 동작하여 마스터와 노드 간의 대화를 통해 pod과 컨테이너들을 관리한다.
* 이미지 풀링, 컨테이너 런칭을 수행한다.

