# Trunk Based Development

## 개요
일종의 source-control branching model로써 trunk라 불리는 하나의 branch를 통해 코드 개발이 
이루어지는 방법론입니다. 이 방식은 git flow와 비교되는데, 가장 큰 차이점은 공유 branch의 
역할입니다. git flow에서 공유 branch를 통해 release하려면 release branch에 공유 branch를
merge한 후 release tag를 통해 이루어집니다. 반면 tbd에서는 공유 branch를 바로 release합니다.
단순히 한단계가 축약되었지만 이로인해 소스코드 관리에 새로운 개념들이 추가됩니다.


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
tbd에서 release까지의 절차는 git flow보다 짧기 때문에 short-lived branch 모델과 좋은
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

feature flags는 application, service에 로직을 동적으로 필요에 따라 변경합니다.
목적에 따라 구현방법이 다양합니다. 해당 문서에서는 feature간에 versioning을 위한 
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

