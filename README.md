# 주식 모의투자 서비스

🌐 https://motoo-a.vercel.app/

<!-- [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FDolphin-PC%2Fmotoo&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com) -->

<img src="assets/logo.png" />

## 📈 Motoo 모의투자 서비스

> '우리 모두 투자하자', 모의투자 경험을 통해 증권시장에 대한 이해를 돕기 위한 서비스입니다.

- 1인 개발 (Front+Back end)
- 구축기간 : 2024.03 ~2024.06 (3개월)
- 운영기간 : 2024.06 ~

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

- ### 실시간 호가/현재가
  - WebSocket통신을 활용한 `한국투자증권` 실시간 데이터 연동
- ### 매수 기능
  - 주식가격에 따른 호가단위를 적용하여 `지정가`매수방식을 구현했습니다.
- ### 주문 내역 조회
  - 주식일변주문체결조회 API를 통해 주문내역을 조회합니다.
- ### 보유 잔고 조회
  - 주식잔고조회 API를 통해 사용자가 보유한 주식정보를 조회합니다.

## 💥 트러블슈팅

### [1. BottomMenubar, svg아이콘 동적 import 🔗](https://www.notion.so/dolphin-pc/d9bd6db3e1064daa8ec68cbc99bb8a30?v=de02d27a5f0649d2972108a188217717&p=ff5506255905426b8db46275cec5a4a4&pm=s)

- Bottom메뉴바의 icon을 svg로 dynamic import 했으나 페이지 이동시마다 깜빡임 현상 발생

### [2. 호가차트 :: 웹소켓 연동 🔗](https://www.notion.so/dolphin-pc/d9bd6db3e1064daa8ec68cbc99bb8a30?v=de02d27a5f0649d2972108a188217717&p=25325b8bde574b3793afdf9b04422061&pm=s)

- 실시간 호가데이터를 위한 웹소켓 연동과정

### [3. 멀티 웹소켓 연동과정 🔗](https://www.notion.so/dolphin-pc/d9bd6db3e1064daa8ec68cbc99bb8a30?v=de02d27a5f0649d2972108a188217717&p=1c89afd76717436399ec798740f87fd5&pm=s)

- 호가데이터, 현재가, 체결통보의 실시간 정보를 하나의 웹소켓으로 연동하는 과정

### [4. 로컬환경에서의 https적용 🔗](https://www.notion.so/dolphin-pc/d9bd6db3e1064daa8ec68cbc99bb8a30?v=de02d27a5f0649d2972108a188217717&p=cc14522fa1b241e9966f4ba48f821b88&pm=s)

- https ↔️ ws 통신 오류를 디버깅하기 위해 local에 https를 적용하는 과정

## 🤔 KPT

## 프로젝트 시작

1. .env파일 작성

   ```
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
