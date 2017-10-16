# Docker Swarm 설계

1. 보안
    * 도메인 생성
    
        CA 인증에 사용될 도메인을 설정한다.[swarm1.example.com]
    
    * 도메인의 사설키와 인증키를 생성
    * 각 노드의 사설키와 인증키를 생성(도메인 인증키와 사설키는 부모 키가 된다.)

    *상세한 구축 과정은 manage_cert.sh 내용을 참고*
    
2. 사전 준비
    * 포트 접근 설정
        * Swarm manager
            * Inbound 80/tcp, docker pull 명령을 위함
            * Inbound 2375/tcp, docker 명령들을 직접 전달하는 포트, TLS 사용시 2376 만 개방
            * Inbound 3375/tcp, swarm manager 의 명령을 전달하는 포트, TLS 사용시 3376 만 개방
        * Service Discovery
            * Inbound 80/tcp
            * Inbound Discovery port. 노드의 탐색을 위한 포트. 탐색 서비스별로 포트가 상이하다.
        * Swarm nodes
            * Inbound 80/tcp
            * Inbound 2375, 2376/tcp
        * cross-host container network
            * Inbound 7946/tcp 다른 컨테이너의 탐색을 위함
            * Inbound 7946/udp
            * Inbound /tcp 탐색 서비스를 위한 키 밸류 접근 포트
            * 4789/udp 컨테이너의 네트워크 추상화를 위함

3. 구축
    * 인스턴스 생성

    | 노드 설명 | 노드 명 |
    |:---------:|:-------:|
    | Swarm manager | swarm-node |
    | normal node | admin-node |
    |  | worker0-node |
    | Discovery backend | consul-node |

    * Discovery backend 설정
        * swarm-node, consul-node 에 탐색 서비스 컨테이너를 실행시킨다.

        `docker run -d -p 8500:8500 --name=consul progrium/consul -server -bootstrap`
        
    * 클러스터 생성
        * swarm-node 에서 매니져를 실행시킨다.

            `docker run -d -p 3376:3376 swarm manage -H swarm:3376 --replication --advertise <swarm-node_ip>:3376 consul://<consul-node_ip>:8500`

        * conser-node 에서 두번째 매니져를 실행시킨다.

        * 노드를 실행시킨다.
            
            `docker run -d swarm join --advertise=admin-node:2376 consul://<consul-node_ip>:8500`
    *상세한 설정 참고는 docker-compose.yml 참고*
        
