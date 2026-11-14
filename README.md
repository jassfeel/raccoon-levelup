# 라쿤 레벨업

할 일을 끝낼 때마다 라쿤이 레벨업하는 투두 웹앱이에요.

- 앱 주소: https://jassfeel.github.io/raccoon-levelup/
- 아이폰: Safari로 열고 공유 버튼 → "홈 화면에 추가"
- 기록은 기기 안(localStorage)에만 저장돼요. 기록 탭의 백업 코드로 옮길 수 있어요.

## 수정하기
`src/app.html`을 고친 뒤 `node src/build.js`를 실행하면 루트의 `index.html`과 아이콘이 다시 만들어져요 (Playwright 필요).

## 아빠의 응원 메시지 (cheers.json)
레벨업할 때 `cheers.json`의 메시지가 축하 화면에 함께 떠요.
- `byLevel`: 특정 레벨에 보여줄 메시지. 예: `"10": "벌써 10레벨!"`
- `anytime`: 해당 레벨 메시지가 없을 때 아직 안 보여준 것 중에서 하나씩 골라 보여줘요.
이 저장소는 공개라서 메시지도 누구나 볼 수 있어요.
