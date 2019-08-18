# Trunk Based Development

## 개요
일종의 source-control branching model로써 trunk라 불리는 하나의 branch를 통해 코드 개발이 
이루어지는 방법론입니다. 이 방식은 git flow와 비교되는데, 가장 큰 차이점은 공유 branch의 
역할입니다. git flow에서 공유 branch를 통해 release하려면 release branch에 공유 branch를
merge한 후 release tag를 통해 이루어집니다. 반면 TBD에서는 공유 branch를 바로 release합니다.
단순히 한단계가 축약되었지만 이로인해 소스코드 관리에 새로운 개념들이 추가됩니다.

## 요소

### CI(Continuous integration)
CI를 branching model과는 상관없이 source repository를 감시하며 소스의 상태를 체크하는 deamon process로 생각하는 사람들이 많습니다. 
하지만 초기 켄트벡이 CI에 대하여 저술 할때는 개발팀이 하나의 공유 저장소에 소스를 품질좋게 유지하고 이를 매일 CI서버가 검증하는 습관을 말하는 단어였습니다. 
초기 CI의 의도는 TBD의 의도와 다르지 않습니다. 
* [🔗 Advanced CI topics ](https://martinfowler.com/articles/feature-toggles.html)

### 로컬 빌드
항상 중요하게 여길점은 trunk 브랜치는 항상 릴리즈 가능상태여야 한다는 것입니다.
CI서버가 검증 절차를 수행하더라도 개개인은 커밋 푸쉬전에 간단하게 로컬 빌드를 수행하는 습관을 들여야합니다.

### 빠른 리뷰
개발자들은 자신의 코드가 trunk branch에 merge되는 순간 다른 개발자에게 코드가 속속들이 분석될 것을 알기에
merge이전에 동료에게 코드 리뷰를 의뢰하는 것을 마다하지 않고 리뷰어 또한 이를 꺼려하지 않습니다.

### 빌드 실패 극복
때로는 공유 branch에 빌드 실패를 일으키는 소스가 commit될 수 있습니다. 다른 개발자들은 빌드 실패를 유발하는 소스를
pull하는 것을 꺼림으로 소스를 rollback하거나 빌드 실패 요인을 해결하기위해 긴요하게 대응합니다.

### 아무것도 공유하지 않음
개발환경에는 microcosm(이하 소우주론)이라는 개념이 있습니다. 소우주론에 따르면 개발자는 소스를 자신의 개발환경에 불러와서 
무엇이든 수행할 수 있고 모든 unit, integration test를 수행할 수 있어야합니다.
소우주론은 production환경과 결부되는 비기능적 연속성을 제외하고 오직 기능적 정확성을 확인할 수 있는 방법입니다.
이는 단지 개인의 개발환경 뿐 아니라 CI를 통해 여러 환경들에서의 기능적 정확성을 확보할 수 있는 유일한 방법입니다.

### 코드 동결은 필요없다.
TBD관점에서 개발한다면 일반적으로 branch를 동결하는 일은 발생하지 않습니다. 버그로 인하여 수정을 위한 지연은 생길 수 있지만,
그외 리소스에 할당된 개발자들은 이와 상관없이 개발을 지속할수 있어야합니다. 이는 branch by abstraction, feature flags를 통해
이룰 수 있습니다.

### 항상 릴리즈가 가능해야한다.
공유 branch에 merge전에는 항상 CI를 통한 소스 검증과 코드 리뷰 절차를 거쳐야합니다.

### Monorepo
모든 서비스, 라이브러리, 프레임워크 소스들을 하나의 저장소에서 관리하는 형식입니다. 이를 통해 소스를 원자적으로 관리할 수 있게됨으로
소스의 재사용성 극대화 중복 최소화를 이룰 수 있습니다. Monorepo로 가장 유명한 구글은 하나의 저장소에 20억 라인의 소스 코드, 3만여명의 개발자
분당 3천여개의 커밋을 수행하고 있습니다. 일반적인 도구들로는 이를 수용할수 없어 구글은 자체적은 VCS(Version control system)을 만들고
자체적인 빌드 도구(bazel)을 만들었습니다. Monorepo는 TBD의 구현방식에 일종이며 가장 대표적인 예시입니다.



## 주의점
### short-lived branch 모델에 적합
<details>
<summary>📜  상세</summary>
git flow에서 feature branch의 생명주기는 깁니다. feature branch는 다른 branch와 
상호 독립적으로 개발되며 feature를 위한 영역으로 존재하며 release 브랜치의 생애주기와
밀접한 연관성을 갖고 있습니다. 이를 long-lived feature branch라고 합니다.

반면 release 브랜치의 생명주기와는 상관없이 코드의 변경과 확장에만 관여하고
(build 결과물(artifact, docker, test report, build file 등도 생성하지 않음)
release branch에 merge후 사라지는 branch를 short-lived feature branch라고 합니다.

short-lived branch는 코드의 확장과 변경이 빈번한 팀에게는 최적의 branching model입니다.
TBD에서 release까지의 절차는 git flow보다 짧기 때문에 short-lived branch 모델과 좋은
효율을 보입니다.
</details>

### branch by abstraction, feature flags에 능숙해져야한다.
<details>
<summary>📜  상세</summary>
branch by abstraction은 추상화 기법을 통해 코드 변경을 이루는 방법입니다.
주로 코드 변경이 부분적으로 천천히 이루어질 때 사용됩니다.
변경이 필요한 로직을 추상화 기법(abstraction class, interface)을 통해 파샤드를 구축하고
변경이 필요한 클라이언트 코드에서 파샤드를 참조한 후 일차적으로 적용, 추후 전체 로직
을 변경할때 모든 클라이언트 코드를 파샤드로 변경합니다.

* [🔗 branch by abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)

feature flags는 application, service에서 로직을 동적으로 필요에 따라 변경합니다.
목적에 따라 구현방법이 다양함으로 해당 문서에서는 feature간에 versioning을 위한 
목적에 초점을 맞춥니다. 예시로 같은 소스를 사용하는 다른 목적의 서버를 구성할 때.
서버 실행 매개변수로 로직을 다르게하거나 아직 지원하면 안되는 코드를 실험하기 위해
특정 플래그값으로 bean을 생성하거나 할수 있습니다.

* [🔗 feature toggles](https://martinfowler.com/articles/feature-toggles.html)
* [🔗 spring boot condition](https://reflectoring.io/spring-boot-conditionals)

위와 같은 방법들이 필요한 이유는 release 브랜치를 별도로 두지 않고 공유 branch를 바로 
release하면서 release 순서를 제어할수 있는 시점이 필요해졌기 때문입니다.
</details>


## 참고
* [🔗 TBD fundmental](https://trunkbaseddevelopment.com/)
* [🔗 Git flow vs Trunk](https://www.toptal.com/software/trunk-based-development-git-flow)

