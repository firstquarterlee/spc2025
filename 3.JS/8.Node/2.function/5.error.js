//const result = someVariableName * 2;
//console.log(result);

try {
  const result = someVariableName * 2;
} catch (error) {
  // 발생하는 모든 오류를 퉁~ 쳐서 접은 것...
  console.error("오루가 발생했음: ", error.message);
}

console.log("계속 진행중...");

// 참조 오류 예시
try {
  const result = someVariableName * 2;
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log("참조 오류 발생: ", error.message);
  } else {
    console.log("그 외 다른 오류 발생", error.message);
  }
}

// 문법 오류 예시

// 범위 에러 예시
