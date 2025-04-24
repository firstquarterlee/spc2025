const express = require("express");
const session = require("express-session");
// 사용자의 로그인 상태 같은 걸 서버에서 유지할 수 있게 해주는 기능.
// 쿠키와 함께 작동해서 사용자를 구분할 수 있다.
const morgan = require("morgan");
const sqlite = require("sqlite3");
const path = require("path");

// 변수 선언
const app = express();
const port = 3000;
const db = new sqlite.Database("shopping.db", (err) => {
  if (!err) console.log("DB연결 성공");
});

// 미들웨어 등록하기
app.use(morgan("dev")); // 요청 로깅 morgan 사용하려면 이렇게 적어야됨. 예쁘게 로그 남겨줌.
app.use(express.json()); // JSON 파싱
// 클라이언트가 application/json 형식으로 데이터를 보냈을 때, 그걸 자동으로 js 객체로 변환해서 req.body에 담아줌.
// req.body.username = "daniel" 이런식으로~

app.use(express.static("public")); // 정적 파일 제공
// public 폴더 안의 파일들을 URL로 바로 접근할 수 있게 해줌.
// public/home.html -. home.

// 세션관련 미들웨어
app.use(
  session({
    secret: "password1234", // 세션 암호화용 비밀키
    resave: false,
    saveUninitialized: false,
  })
);

// 라우트 설정
app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cart.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "products.html"));
});

// 로그인 api 구현
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username=? AND password=?";

  db.get(query, [username, password], (err, row) => {
    if (err) console.log("오류");
    if (row) {
      req.session.user = { id: row.id, username: row.username };
      res.json({ message: "로그인 성공", username: row.username });
    } else {
      res.status(401).json({ message: "로그인 실패" });
    }
  });
});

// 로그인 상태 확인 API
app.get("/api/check-login", (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({ message: "Welcome back", username: user.username });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// 상품 목록 API 구현하기
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.all(query, [], (err, rows) => {
    res.json(rows);
  });
});

// 장바구니 추가 API 구현하기
app.post("/api/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  const cart = req.session.cart || [];

  // 상품 조회
  const query = "SELECT * FROM products WHERE id=?";
  db.get(query, [productId], (err, product) => {
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    // 장바구니에 상품 추가
    cart.push({ ...product, quantity: 1 });
    req.session.cart = cart;
    res.json({ message: "상품 추가 완료" });
  });
});

// 장바구니 조회 API
app.get("/api/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.json({ cart });
});

app.listen(port, () => {
  console.log("3000번 포트에서 서버 실행 완료");
});
