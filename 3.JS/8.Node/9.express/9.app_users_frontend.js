const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const users = {};
let nextId = 1;
// const user_list = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // payload를 (즉 data영역을) 파싱해서, req.body 에 담아줘라...

app.get("/", (req, res) => {
  console.log("메인홈");
  res.sendFile(path.join(__dirname, "public", "users.html"));
});

app.use(express.static("public"));

// 사용자 조회 라우트 및 함수
app.get("/users", (req, res) => {
  console.log("사용자 조회");
  res.send(users); // text/html; charset=utf-8  <-- 문자열.. 이게 기본값
  // res.json(users); // application/json
});

// 단일 사용자 조회 라우트 및 함수
app.get("/users/:id", (req, res) => {
  console.log("단일 사용자 조회");
  const id = req.params.id;

  if (!users[id]) {
    return res
      .status(404)
      .json({ success: false, message: "사용자를 찾을 수 없습니다" });
  }

  const result = {};
  result[id] = users[id];

  res.json(result);
});

// 사용자 생성 라우트 및 함수
app.post("/users", (req, res) => {
  console.log("사용자 생성: ", req.body);

  const { name, email, phone } = req.body;

  users[nextId] = {
    name,
    email: email || "",
    phone: phone || "",
    createdAt: new Date().toISOString(),
  };

  nextId++;

  res.json({ success: true, message: "사용자 생성 완료" });
});

// 사용자 수정 라우트 및 함수
app.put("/users/:id", (req, res) => {
  console.log("사용자 수정");
  const id = req.params.id;

  if (!users[id]) {
    return res
      .status(404)
      .json({ success: false, message: "사용자를 찾을 수 없습니다" });
  }

  const { name, email, phone } = req.body;

  users[id] = {
    ...users[id],
    name: name || users[id].name,
    email: email || users[id].email,
    phone: phone || users[id].phone,
    updatedAt: new Date().toISOString(),
  };

  res.json({ success: true, message: "사용자 수정 완료" });
});

// 사용자 삭제 라우트 및 함수
app.delete("/users/:id", (req, res) => {
  console.log("사용자 삭제, ", req.params.id);

  const id = req.params.id;

  if (!users[id]) {
    return res
      .status(404)
      .json({ success: false, message: "사용자를 찾을 수 없습니다" });
  }

  delete users[id];

  res.json({ success: true, message: "사용자 삭제 완료" });
});

app.listen(port, () => {
  console.log(`서버 레디 on ${port}`);
});
