// let sum = 0;
// for (let i = 0; i < 8; i++) {
//   sum += 0.1;
// }

// console.log(sum);

// 0.1을 10번 더하면 얼마인가요?
// 0.1 + 0.1 ....
// 답은 0.899999999999
// 왜 그럴까? 왜 1이 안나올까? 찾아보기.

sum_to_num(10);
sum_to_num(100);
sum_to_num(1_000);
sum_to_num(10_000);
sum_to_num(1_000_000);
sum_to_num(1000_000_000);

function sum_gauss_num(number) {
  //sum = (number * (number + 1)) / 2;
  return (number * (number + 1)) / 2;
}

console.log("가우스 공식을 활용한 합산", sum_gauss_num(10));
console.log("가우스 공식을 활용한 합산", sum_gauss_num(100));
console.log("가우스 공식을 활용한 합산", sum_gauss_num(1_000));
console.log("가우스 공식을 활용한 합산", sum_gauss_num(10_000));
console.log("가우스 공식을 활용한 합산", sum_gauss_num(1_000_000));
console.log("가우스 공식을 활용한 합산", sum_gauss_num(1000_000_000));

