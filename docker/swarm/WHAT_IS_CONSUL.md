#Consul이란


1. 핵심 기능

    * Service discovery
        * HTTP, DNS 등을 통해 서비스를 탐색한다.
    * Health checking
        * memory 사용량, 요청 성공 횟수를 기반으로 서비스 모니터링
    * Key/Value store
        * http api를 통한 키/벨류 저장 및 사용
    * Multi Datacenter
        * 다양한 데이터센터를 지원함.

2. 기본 개념

    * `consul agent`를 통해 노드들은 consul에 서비스를 제공한다.
    * agent는 consul서버에 서비스에 대한 정보를 알리고 서버는 정보를 저장한다.


3. 용어 해설

    * agent
        * `consul agent`명령을 통행 실행되며 모든 노드들에서 실행된다.
        * agent는 클라이언트와 서버 모드로 진행된다.
    * client
        * 모든 클라이언트들은 서버를 향해 RPC를 수행한다.
    * server
        * Raft quorum, 클러스터 상태 관리, RPC 응답, WAN gossip pool 교환, 리더 서버로의 질의 전달 등 많은 일들을 수행하는 agent
    * datacenter
        * 의미가 명료하지 않으며 간략히 하나의 사설 네트워크 혹은 지역화된 네트워크 영역을 의미한다.
    * consensus
        * 서버들 중에 리더를 선출하는 과정이다.
    * gossip
        * Serf의 가쉽 프로토콜을 이용한 기능, 멤버쉽, 실패 탐색, 브로드 캐스팅에 사용된다.
    * lan gossip
        * 로컬 네트워크 상에 모든 노드들에 대한 참조
    * wan gossip
        * 데이터 센터를 대표하는 서버에 대한 참조


4. 결론
    
    * 사설과 공인 네트워크를 통합하여 서비스의 군집을 이루는 기능



        

    
        
        
