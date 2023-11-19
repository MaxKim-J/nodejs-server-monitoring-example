# nodejs 서버 모니터링 예제

## 실행하기 전에

- `yarn install`
- [prometheus를 설치해주세요.](https://prometheus.io/docs/prometheus/latest/installation/)

## 기본 설정

express 서버에서 [prom-client](https://github.com/siimon/prom-client)로 기본 매트릭을 추출하고, ELU, Request와 관련된 매트릭은 만들어서 제공합니다.

## scripts

- `yarn start:node` : 8080번 포트에서 node 서버 구동을 시작합니다.
- `yarn start:prom`: 9090번 포트에서 prometheus 서버 구동을 시작합니다. 기본적으로 10초에 한번씩 노드 서버의 `/metrics` 엔드포인트를 통해 매트릭을 수집합니다.
- `yarn start`: 위 두 커맨드를 같이 실행합니다.
