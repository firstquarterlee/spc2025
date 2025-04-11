function sum_to_num(number) {
  // 주어진 숫자까지의 합산을 for 문으로 구현하시오.
  let sum = 0;
  for (let count = 1; count <= number; count++) {
    sum = sum + count;
  }
  console.log(`${number} 까지의 합산은: ${sum}`);
}

sum_to_num(10);
sum_to_num(12221);
sum_to_num(15);
// 주어진 숫자의 합산의 구하시오
