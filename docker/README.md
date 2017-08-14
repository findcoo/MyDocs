# Docker

## Docker compose를 이용한 배포 
|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|/|1|`docker pull test0`|해당 노드에 이미지 다운로드|
|/|2|`docker-compose up -d`|컨테이너 런칭|
|/|3|`docker-compose scale container0=2`|컨테이너를 1개에서 2개로 증가|
---
* **Scale down**

|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|/|1|`docker-compose scale container0=1`|컨테이너가 2개에서 1개로 감소|
---
* **모든 컨테이너 제거**

|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|/|1|`docker-compose down`|모든 컨테이너 제거|
---
* **컨테이너 한개 제거**

|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|/|1|`docker-compose stop container0`| container0를 멈춤|
|/|2|`docker-compose rm container0`|정지된 container0를 제거|
---
* **컨테이너 이중화 업그레이드**

|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|/|1|`docker-compose scale container0=1`| 컨테이너 1개로 축소|
|/|2|`docker-compose up -d container0`| 컨테이너 재생성|
|/|3|`docker-compose scale container0=2`| 컨테이너 2개로 증가|
---
* **컨테이너 터미널로 접근**

|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|/|\*|`docker-comopose exec container0 bash`| 컨테이너에 다음 명령을 할당하며 명령은 bash|
|\*|\*|`docker exec -it [container id] bash`| 컨테이너에 다음 명령을 할당하며 명령을 bash|
---
## Devicemapper 관리

Devicemapper는 레드햇 계열에서 AUFS를 사용하기위해 파일 시스템 사상 계층을 이용하는 것이다.
back-loop 방식과 direct-loop 방식으로 나뉘며 전자는 성능이 매우 떨어진다.
direct-loop 방식은 lvm을 구성하여 devicemapper의 사상 속도를 증가시킨다.
현재 서버는 direct-loop가 설정되어 있으나 볼륨 크기가 부족하여 증가시킬때 별도의 관리가 필요하다.
aws ebs를 통해 볼륨 크기를 증가시키고나서 다음 명령을 통해 lvm 크기를 증가시킨다.

```bash
pvresize /dev/sdb
lvresize -l +100%FREE -n docker/thinpool
```
---
## Swarm관리
* **Swarm 생성**

|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|\*|1|`ssh swarm-node`|swarm 노드로 접속|
|services/docker/swarm|1|`docker-compose up -d consul`|swarm 이중화 구성을 위한 컨설 실행|
|services/docker/swarm|2|`docker-compose up -d manager`|swarm manger 실행|
|\*|4|`ssh consul-node`|consul 노드로 접속|
|services/docker/swarm|3|`docker-compose up -d consul`|swarm discovery를 위한 컨설 실행|
|services/docker/swarm|4|`docker-compose up -d manager`|swarm manager 후보 실행|
---
* **Node 생성**

노드에 접속 후 시행한다.

|디렉토리|순서|명령|목적|
|:-------|:---|:---|:---|
|\*|*|`docker run -d --restart=always swarm join --advertise=$(hostname -i):2375 consul://[conser address]:8500`|internal swarm에 노드를 등록한다|
