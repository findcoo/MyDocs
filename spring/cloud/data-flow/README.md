# Spring cloud data flow

## 개요

데이터 처리를 중점으로하는 application의 간편한 개발에 초점을 두고 있으며 주요 구성은 데이터 처리 application과 데이터 플로우 서버와 이 서버의 실행환경입니다.
데이터 플로우에서 application은 다음과 같은 두 가지 형태로 나뉩니다. 

* 긴 시간 활동하며 메시지 기반의 데이터 전달 메커니즘을 사용하면서 데이터를 처리하는 stream application.
* 짧은 시간 활동하며 유한한 데이터셋을 기반으로 데이터를 처리하는 task application.

그리고 데이터 플로우 서버의 실행환경에 따라 application을 패키징하는 방식이 나뉩니다.

* maven 저장소를 기반으로한 [uber-jar](https://stackoverflow.com/questions/11947037/what-is-an-uber-jar/11947093#11947093)
* docker image

### Microservice Architectural Style

데이터 플로우 서버는 마이크로 서비스 아키텍쳐를 기반으로 application을 배포합니다. 하나의 stream application은 여러개의 작은 application으로 구성되며 각각 독립적으로 프로세스를 확장하고 축소 합니다.
application은 독립적으로 versioning lifecycle을 갖고 있으며 이에 따라 실행환경에서 업그레이드되고 롤백됩니다.

#### Server components

Data flow는 두가지 유형의 메인 컴포넌트를 갖고 있습니다.

* Data flow server
* Skipper server

Data flow server는 대쉬보드 어드민과 Restfule API를 제공하는 서버입니다. Dataflow shell application은 Dataflow server와 web API를 통해 연결됩니다.

![서버 컴포넌트](https://dataflow.spring.io/static/19e89c2894aa4586aec3336ac4e6954b/49503/arch-overview.webp "서버 컴포터")

Dataflow server는 사용자와 Skipper간에 중계자로써 작동하며 사용자로부터 입력받는 요청(DSL, RestAPI)을 검사하고 전달합니다.
Skipper는 배포 플랫폼별로 상이한 방식을 통합하여 동일한 인터페이스를 제공하여 다양한 배포 플랫폼에서 동일한 배포가 가능하도록 해줍니다.

#### Monitoring

Data flow는 메트릭 수집 라이브러리인 migrometer를 활용해서 메트릭 모니터링 아키텍쳐를 구성하고 있습니다.
micrometer는 다양한 메트릭 시스템을 위한 통합 인터페이스를 지원함으로 다양한 메트릭 도구를 사용할 수 있습니다.
하지만 공식적으로 data flow에서 지원되는 도구는 프로메테우스와 인플럭스DB입니다.

![Monitoring architecture](https://dataflow.spring.io/static/18ef6024fa362eb8bfcd00a2e5cd7d85/01f9a/SCDF-stream-metrics-architecture.webp "Monitoring Architecture")


![Task monitoring architecuter](https://dataflow.spring.io/static/65fae97817a1f53de01d0366e665a825/a7004/SCDF-task-metrics-architecture.webp "Task monitoring architecture")


### Spring boot

stream 혹은 task application은 기본적으로 spring boot를 사용하여 개발되며 특히 task는 기존의 spring batch를 활용 할 수 있습니다.

### 다른 플랫폼과의 비교

data flow의 주요 비교 대상은 Spark, Flink, Google cloud dataflow등 실시간 데이터처리 솔루션들입니다.
비교 대상으로 거론된 플랫폼들은 단순한 데이터 처리에도 많은 인프라 리소스를 필요로하며 하나의 컴퓨터 엔진 클러스터 전체를 사용합니다.
이에 비하면 application 별로 사용량에 따라 인프라 리소스를 최적화 할 수 있으며 컴퓨터 엔진 클러스터 전체를 사용하지 않고 마이크로서비스 단위로 사용합니다.

