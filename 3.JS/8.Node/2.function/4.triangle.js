const ROWS = 5; // 총 출력할 줄 수

function leftTriangle() {
  let currentRow = 1;
  while (currentRow <= ROWS) {
    // While 이든 For 등 상관없음.
    let stars = "";
    let starCount = 1;
    while (starCount <= currentRow) {
      stars += "*";
      starCount++;
    }
    console.log(stars);
    currentRow++;
  }
}
leftTriangle();
