// 덧셈 함수
function add(a, b) {
  return a + b;
}

// 뺄셈 함수 //다음에는 작명 sub로 할 것.
function minus(a, b) {
  return a - b;
}

// 곱셈 함수
function multiplication(a, b) {
  return a * b;
}

// 나눗셈 함수
function division(a, b) {
  if (b === 0) return "0으로 나눌 수 없습니다.";
  return a / b;
}

// 출력 함수
function printScreen(text) {
  console.log(text);
}

// 다음 출력을 푸시오 (함수를 호출해서 화면에 결과를 출력)
// 1. 2 + 3 = ?
printScreen(`이건 더하기: ${add(2, 3)}`);

// 2. 2 - 3 = ?
printScreen(`이건 빼기: ${minus(2, 3)}`);

// 3. 2 * 3 = ?
printScreen(`이건 곱셈: ${multiplication(2, 3)}`);

// 4. 2 / 3 = ?
printScreen(`이건 나누기: ${division(2, 3)}`);

// 여기까지 하고 잠시 생각해본후 아래...
// 5. 2 * 0 = ?
printScreen(`이것도 곱셈: ${multiplication(2, 0)}`);

// 6. 2 / 0 = ?
printScreen(`이것도 나누기: ${division(2, 0)}`);

// 7. 6번의 오류를 해결하시오
printScreen(division(2, 0));
