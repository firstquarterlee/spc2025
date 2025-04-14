window.onload = () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const BLOCK_SIZE = 20;
  let x = 0;
  let y = 0;

  // 일정한 간격으로 실행 (200ms 마다)
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    // 뱀 이동(오른쪽으로)
    x += BLOCK_SIZE;

    // 화면 끝 도달하면 다시 왼쪽으로
    if (x >= canvas.width) {
      x = 0;
    }

    // 뱀 그리기
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
  }, 200);

  // 파란 사각형 만듬
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 20, 20);
};
