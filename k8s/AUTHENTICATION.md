# Authentication

## 사용자

k8s의 사용자 형식은 두 가지로 나뉜다.

* 일반 사용자

  외부 서비스 혹은 일반적인 사용자는 별도의 인증 도구들을 저장하여 사용한다.
* k8s 사용자

  k8s에서 관리되는 사용자는 네임스페이스로 구별된다.
  이 사용자들의 인증 정보는 `Secrets`에 저장된다.
  이 인증 정보들은 `Pod`에 추가되고 Pod은 클러스터를 제어하는 권한을 얻는다.

* API 요청
  
  위의 인증 구분처럼 api 요청은 일반 사용자, k8s 사용자, 익명 사용자로 인증 방식이 나뉜다.
  k8s 사용자만이 접근 할 수 있는 요청에는 그에 따른 인증 정보가 추가되야 한다.

## 인증 전략

* HTTP request

  요청시에 인증 정보를 추가하여 요청하는 방식
  다음과 같은 값들을 추가한다.

  * Username
  * UID
  * Groups
  * Extra fields

* x509 client certs
  
  api server에 `--client-cs-file=SOMEFILE` 옵션을 통해 인증 파일을 추가하여 적용한다.

* static token
  
  cli 명령에 '--token-auth-file=SOMEFILE' 옵션을 추가하여 사용한다.
  인증 정보의 형식은 다음과 같다.
  `token,user,uid,"group1,group2"`

* bearer token

  요청에 토큰 헤더를 추가한다.
  `Authorization: Bearer 31ada4fd-adec-460c-809a-9e56ceb75269`
