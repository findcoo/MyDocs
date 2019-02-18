# Spring Batch

## The Domain Language of Batch
스프링 배치에서 `Job`은 다수의 `Step`을 갖고 있고 각 스텝들은 하나의 `ItemReader` 하나의 `ItemProcessor` 하나의 `ItemWriter`를 갖고 있다.

### Job
일반적으로 통용되는 Batch job을 뜻한다. 전체 배치 프로세스를 함축하고 있다.
XML 혹은 java로 구성된 설정과 연결되있다.
스프링 배치에서 Job은 단순히 Step 인스턴스의 컨테이너 역할을 한다.
Job에 대한 설정 값은 다음과 같다.

* Job의 이름
* Step의 순서
* Job의 재시작 여부 

### JobInstance
Job의 실행에 논리적 개념이다. 에를 들어 `EndOfDay` job의 경우 하루에 한번만 실행된다. 이런 경우 하루에 단 하나의 `JobInstance`만이 존재한다.

### JobParameters
`JobInstance`가 구별 될 수 있는 방법이다.
`JobParameters`의 객체는 job의 실행에 있어 필요한 매개변수들을 갖고 있다. 이를 통해 JobInstance를 구별한다.

### JobExecution
Job을 실행하는 시도를 기술적으로 나타낸다. 하나의 실행이 실패하거나 성공했다고 할 때, 잡이 성공적으로 끝나지 않는다면 JobInstance가 끝나지 않았다고 판단한다.
만일 하루에 한번 실행되는 job이 실패한다면 다시 해당 job을 하나의 JobInstance로 처음부터 실행시킨다.
JobExecution은 Job에 우선시 되는 저장 메커니즘으로 실행간에 어떤 일이 발생할지 관여한다. 이는 프로퍼티로써 제어되며 지속적으로 관리된다.

* ProPerty
    * <b>Status</b>: `BatchStatus` 객체는 실행의 상태를 나타내며 시작 상태면 `BatchStatus#STARTED` 실패라면 `BatchStatus#FAILED` 성공했다면  `BatchStatus#COMPLETED`와 같은 형식이다.
    * <b>startTime</b>: Job의 실행 시간이며 JAVA의 시스템 시간으로 기록된다. 이값이 비었다면 job은 아직 시작되지 않은 것.
    * <b>endTime</b>: 성공과 실패 여부와 상관없이 job의 종료된 시간을 나타낸다.
    * <b>exitStatus</b>: 실행의 결과를 표현한다. 비어있다면 job은 아직 끝나지 않았다는 뜻
    * <b>createTime</b>: JobExecution의 생성과 관련있다. job의 실행과 상관없으며 프레임워크가 job을 관리하는데 사용한다.
    * <b>lastUpdated</b>: JobExecution의 소멸과 관련있다. 값이 비었다면 job은 아직 시작되지 않았다.
    * <b>executionContext</b>: 실행간에 필요한 사용자 데이터를 등록하고 사용하는 프로퍼티.
    * <b>failureExceptions</b>: job을 실행하면서 발생하는 예외 리스트

### Step
배치 작업에 독립적으로 구성되는 부분을 캡슐화한 객체다. job은 하나 이상의 step으로 구성된다고 볼 수 있다.
step은 개발자에 의해 정의된 실질적인 배치 작업들이다. step은 각각 `StepExecution`을 갖고 있고 특정 `JobExecution`과 연관된다.

### StepExecution
하나의 step 실행을 나타낸다. `JobExecution`과 유사하지만 step의 작업이 실패하기전에 실행이 실패되면 `StepExecution`은 생성되지 않는다.
즉, `StepExecution`은 step이 실질적으로 실행되었을 때만 실행된다. `StepExecution`은 해당하는 step과 `JobExecution`과 트랜잭션에 관련된 정보를 포함한다.
그리고 `ExecutionContext`(사용자에 의해 추가된 data)을 포함한다. 
* Property
    * <b>Status</b>: `JobExecution`과 유사하다.
    * <b>startTime</b>: 스텝의 실행시간.
    * <b>endTime</b>: 스텝의 종료시간. 성공 여부와는 관계 없다.
    * <b>exitStatus</b>: 실행의 결과를 나타낸다.
    * <b>executionContext</b>: 배치간 요구되는 사용자가 정의한 데이터들을 담고 있다.
    * <b>readCount</b>: 성공적으로 읽기 작업을 수행한 횟수.
    * <b>writeCount</b>: 성공적으로 쓰기 작업을 수행한 횟수.
    * <b>commitCount</b>: 실행간에 커밋된 트랜잭션 수.
    * <b>rollbackCount</b>: Step에 의해 비즈니스 로직을 수행중에 일어난 롤백 횟수.
    * <b>readSkipCount</b>: 읽기 작업을 실패한 힛수, 결과적으로 스킵된 아이템들의 수가 된다.
    * <b>processSkipCount</b>: 프로세스 실패로인한 실패 횟수, 스킵된 아이템 수가 된다.
    * <b>fileterCount</b>: `ItemProcessor`에 의해 필터된 아이템의 수.
    * <b>wrtieSkipCount</b>: 쓰기 작업이 실패된 횟수, 스킵된 아이템 수가 된다.

### ExecutionContext
key/value 형태의 데이터를 갖고있는 객체, 데이터는 `StepExecution` 혹은 `JobExecution`에 영향을 주는 state가 된다.
<b>Quartz</b>, `JobDataMap`과 유사한 컨셉이다.


