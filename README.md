# 주식 모의투자 서비스

🌐 https://motoo-a.vercel.app/

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FDolphin-PC%2Fmotoo&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<img src="assets/logo.png" />

## 📈 Motoo 모의투자 서비스

> '우리 모두 투자하자', 모의투자 경험을 통해 증권시장에 대한 이해를 돕기 위한 서비스입니다.

- 1인 개발 (Front+Back end)
- 구축기간 : 2024.03 ~2024.06 (3개월)
- 운영기간 : 2024.06 ~
- 접속 계정
  - ID : test@gmail.com
  - PW : qwerqwer

## 📌 사용기술

- ⚙️ 프레임워크 : `Next(v14, App router)`
- 💾 DB : Postgresql(Vercel Storage), Prisma
- 🔑 인증 : next-auth(token방식)
- 🔮 스타일링 : tailwind, mui
- ✅ 상태관리 : recoil
- 🌐 배포 : Vercel
- 📕 etc : chart.js, react-hook-form

## 💡 주요기능

> ([한국투자증권의 API](https://apiportal.koreainvestment.com/apiservice/oauth2#L_5c87ba63-740a-4166-93ac-803510bb9c02)와 연동하여 개발을 진행했습니다.)

- ### 실시간 호가/현재가/체결통보
  - WebSocket통신을 활용하여 `한국투자증권` 실시간 데이터를 통해 호가차트, 현재가, 체결통보를 구현했습니다.
    <img src="https://file.notion.so/f/f/231a861b-88a7-4a1d-bfa3-082686e82101/be0ee3a3-c04a-4711-ab3d-5c6dfbe09837/Untitled.gif?id=b26a4211-5d00-4a9b-8615-b746b27c0f60&table=block&spaceId=231a861b-88a7-4a1d-bfa3-082686e82101&expirationTimestamp=1719136800000&signature=zwN9Qhc34VJZ40_vWI5DKIU9SvttZef0OnnHF78IPUs" height="300px"/>
- ### 매수 기능
  - 주식가격에 따른 호가단위를 적용하여 `지정가`매수방식을 구현했습니다.
    <img src="https://file.notion.so/f/f/231a861b-88a7-4a1d-bfa3-082686e82101/5c860c2f-862e-4db3-9daf-0e34560539b0/Untitled.gif?id=268fd9f8-3026-4b35-95dd-a28c469ee33c&table=block&spaceId=231a861b-88a7-4a1d-bfa3-082686e82101&expirationTimestamp=1719136800000&signature=ME7yEvYDNoPv1LS0O6NdhLe5uHrPFeJI8MiL0i-MYOg" height="300px"/>
- ### 주문 내역 조회
  - 주문, 체결 목록과 상세내역을 조회합니다.
    <img src="https://file.notion.so/f/f/231a861b-88a7-4a1d-bfa3-082686e82101/95e185e5-adaf-4589-b516-a0739b5559e4/Untitled.gif?id=e1437d26-bc7c-418b-8439-a33892a5167d&table=block&spaceId=231a861b-88a7-4a1d-bfa3-082686e82101&expirationTimestamp=1719136800000&signature=TiGom11fil1A8fm27CqtRx1tRB6CyhBUFMSC5VIejO8" height="300px"/>
- ### 보유 잔고 조회
  - 메인화면 도달 시마다 잔고조회API를 통해 사용자의 보유잔고를 동기화합니다.
    <img src="https://file.notion.so/f/f/231a861b-88a7-4a1d-bfa3-082686e82101/67a977c3-8b12-4332-b1c9-fc0bd6ab3585/Untitled.gif?id=b1ba8e60-2929-496e-a571-5a4e75f133d0&table=block&spaceId=231a861b-88a7-4a1d-bfa3-082686e82101&expirationTimestamp=1719136800000&signature=B5RaiI42c6q_uJBE2l0YWHsVTZjlMxTVOihsoT5gdpg" height="300px"/>

## 💥 트러블슈팅

### [1. BottomMenubar, svg아이콘 동적 import 🔗](https://www.notion.so/dolphin-pc/BottomMenubar-svg-import-ff5506255905426b8db46275cec5a4a4)

- Bottom메뉴바의 icon을 svg로 dynamic import 했으나 페이지 이동시마다 깜빡임 현상 발생

### [2. 호가차트 :: 웹소켓 연동 🔗](https://www.notion.so/dolphin-pc/25325b8bde574b3793afdf9b04422061)

- 실시간 호가데이터를 위한 웹소켓 연동과정

### [3. 멀티 웹소켓 연동과정 🔗](https://www.notion.so/dolphin-pc/1c89afd76717436399ec798740f87fd5)

- 호가데이터, 현재가, 체결통보의 실시간 정보를 하나의 웹소켓으로 연동하는 과정

### [4. 로컬환경에서의 https적용 🔗](https://www.notion.so/dolphin-pc/Local-https-cc14522fa1b241e9966f4ba48f821b88)

- https ↔️ ws 통신 오류를 디버깅하기 위해 local에 https를 적용하는 과정

## 🤔 KPT

### 👍 Keep

#### 1. Custom Hooks를 통한 비즈니스로직과 UI로직 분리

- custom hook으로 비즈니스 로직을 분리하여, 소스코드의 가독성 향상
- useWebSocket, useTabScroll과 같이 특정 기술/컴포넌트에 의존하는 hooks를 통해, 컴포넌트의 기능로직 재사용 증가

#### 2. 관심사에 따른 폴더구조

- 특정 컴포넌트와 관련된 atom, hooks는 동일 선상의 폴더에 위치하여, 관심사를 기준으로 파일을 모아두었습니다.<br/>
  ![image](https://github.com/Dolphin-PC/motoo/assets/43159931/151d06fb-8f04-4a3f-bd19-5d33c0fd286a)

#### 3. 비즈니스 로직 Controller-Service-Model ➡️ Domain Driven Design 패턴 적용

- 💥 기존에는 Service Layer에 모든 비즈니스 로직이 포함되어 길어진 코드로 인해 `가독성`이 떨어지는 문제가 발생
- ➡️ Domain(DB Table)과 관련된 로직은 Model Layer안에 작성하여, 동일한 관심사로직을 모아둠으로써 관심사 집중이 가능했음
- ✅ 여러 도메인의 합성으로 절차지향적으로 작성해야 하는 경우에만 Service Layer에 비즈니스 코드 작성

#### 4. jest를 통한 Domain로직 단위 테스트 진행

- 도메인로직의 단위 테스트를 위해 jest 테스트 파일 작성<br/>
  ![image](https://github.com/Dolphin-PC/motoo/assets/43159931/ea289e22-a273-43a2-a974-da758248904d)

#### 5. next-auth를 활용한 인증 프로세스 위임

- JWT 토큰의 발급과 인증과정을 next-auth와 next-auth middleware를 통해 구현

#### 6. 한국투자증권 요청/응답 API 타입 정의 및 정적 타이핑

- 매우 귀찮은 작업이었지만, `자동완성기능`, `nullable체크` 등을 통해 오히려 개발의 생산성이 높아질 수 있었음

### ❗️Problem

#### 1. 컴포넌트 폴더의 depth증가

- UI가 복잡한 화면의 경우, 코드의 가독성 or 렌더링 최적화를 위해 leaf파일로 분리해주어야 하는데, 이때 폴더의 depth가 깊어지는 문제 발생
- v/stock/[stockId]화면 ➡️ ClientComponent > Footer > Sheet
- ![image](https://github.com/Dolphin-PC/motoo/assets/43159931/adeab19d-8e36-40dd-9aa2-21ffcc90803d)

#### 2. Prisma DB migrate

- 개발 중간에 Database의 구조 변경이 필요한 경우, `prisma db push`로 변경사항을 적용하는데, 이떄 모든 데이터가 삭제되는 불편함 발생

### 💬 Try

#### 1. StoryBook을 통한 컴포넌트 테스트 및 유지보수

- 재사용되는 컴포넌트의 수정이 필요한 경우, 각 활용되는 경우를 모두 테스트해야 하는 상황이 발생하는데, 이를 Storybook으로 테스트했다면 직관적인 테스트가 가능했을 것으로 생각됨

## 프로젝트 시작

1. .env파일 작성

   ```
   NEXT_PUBLIC_BASE_URL=
   <!-- next-auth설정 -->
   NEXTAUTH_URL=
   NEXTAUTH_SECRET

   <!-- prisma -->
   POSTGRES_PRISMA_URL=

   <!-- 한국투자증권 base URL -->
   NEXT_PUBLIC_VTS_URL=https://openapivts.koreainvestment.com:29443
   NEXT_PUBLIC_VTS_SOCKET_URL=ws://ops.koreainvestment.com:31000
   ```

2. 의존성 설치

   ```
   yarn version : `4.2.2`
   yarn install
   ```

3. prisma 초기화

   ```
   npx prisma db push
   ```

4. 프로젝트 실행
   ```
   yarn dev
   ```
