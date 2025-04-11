function gugudan() {
  for (let dan = 2; dan <= 9; dan++) {
    console.log(`!!!======= ${dan}단 ======!!!`);
    for (let i = 1; i <= 9; i++) {
      console.log(`${dan} x ${i} = ${dan * i}`);
    }
  }
}

gugudan();

// 구구단 1분만에 짜는 연습하기.
