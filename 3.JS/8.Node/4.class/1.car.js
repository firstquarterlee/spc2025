class Car {
  // let make = '';
  // let model = '';

  constructor(make, model) {
    // 초기화 함수
    this.make = make; // 객체의 내부 변수(속성 = property) 에 저장
    this.model = model;
  }

  drive() {
    return `${this.make} ${this.model} is Driving...`;
  }

  doorOpen() {
    return `${this.make} ${this.model} 의 문이 열립니다.`;
  }

  doorClose() {
    return `${this.make} ${this.model} 의 문이 닫힙니다.`;
  }
}

const myCar = new Car("현대", "K5");
console.log(myCar.drive());
console.log(myCar.doorOpen());
console.log(myCar.doorClose());
const myNewCar = new Car("테슬라", "모델S");
console.log(myNewCar.drive());
console.log(myNewCar.doorOpen());
console.log(myNewCar.doorClose());

console.log(typeof myCar); // object
console.log(myCar instanceof Error); // false
console.log(myCar instanceof Car); // true

//let make = "";
//let model = "";  // this하면 내부적으로 model 이렇게 생겨난다.

//컨스트럭트(짓는거, 만드는거 건설하는 거) // 클래스 만들때 필수로 들어가야하는 것들

/*
console.log(myCar instanceof Error); //Error로부터 myCar가 만들어졌냐? False
console.log(myCar instanceof Car); //Car로부터 만들어졌냐? true
*/
