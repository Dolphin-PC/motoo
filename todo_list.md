- TODO api Secret 암호화/복호화
- TODO user-token, password 제외하기

- TODO stock_info 테이블 데이터 미리 넣어두기 (스크래핑 불가, 주식종목 조회API 연동하느니, preset데이터 추가가 나음)

- API
  - TODO next-swagger 보완하기 /api/ 하위폴더
  - TODO API의 next-auth middleware적용하기

TODO: 토큰만료 응답시, 토큰 재발급 후 재요청

- 배포까지 할 일

  - ~~주식 체결내역 API~~
  - 주식 매수/매도 직후, 실시간체결통보로 snackbar 띄우고, 주식체결내역으로 이동
  - 주식 취소정정 API
  - stock_info 테이블 데이터 미리 넣어두기
  - ~~배포하기 (vercel)~~

- 배포이후, 운영하면서 추가할 것
  - 모의투자 기간 종료 이후, 투자수익율 보고서
