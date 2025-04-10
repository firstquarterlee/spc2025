const GAME_SPEED = 200; // ms(화면 갱신 주기)
const BLOCK_SIZE = 20;
let snake = {
  x: 0,
  y: 0,
};

// 돔과 각종 필요한 여러 컴포넌트 로딩이 끝난 이후 이거 실행해라.
window.onload = initialize;

function initialize() {
  canvas = document.getElementById("snakeCanvas");
  context = canvas.getContext("2d");

  // 키 이벤트 리스너 추가
  setupEventListeners();

  // 게임 시작 루프 호출
  setInterval(gameLoop, GAME_SPEED);

  // 여기는 키보드 인터럽트(이벤트) 핸들러
  function setupEventListeners() {
    //document.addEventListener("keydown", ...)
  }

  function gameLoop() {
    console.log("게임 진행중....");
  }

  // 이제 로직 짜기
  function gameLoop() {
    // 뱀 이동
    moveSnake();

    // 화면 렌더링
    draw();
  }
}

// 뱀의 위치를 이동한다.
function moveSnake() {
  snake.x += BLOCK_SIZE;
  //snake.y = 20;
}

// 화면의 뱀을 그린다.
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "blue";
  context.fillRect(snake.x, snake.y, BLOCK_SIZE, BLOCK_SIZE);

  context.fillStyle = "red";
  context.fillRect(100, 100, BLOCK_SIZE, BLOCK_SIZE);
}

// 숙제1.
// 뱀 게임 화살표 방향 이동
// 숙제2.
// 화면을 벗어나지 않는 랜덤 위치에 빨간 사과(먹이)를 만든다.
// 숙제3.(옵셔널)
// 이 사과를 먹는걸 구현
// 빨간 박스(사과)와 나의 머리 위치가 같으면, 다시 2번을 재실행(랜덤위치에 먹이배치)
// 숙제4.
// 3번에 대해서 사과를 먹은이후 몸길이를 늘려서 이 길이가 나를 따라오게 만든다. 힌트: 나의 몸의 길이를 배열에 넣는다.
