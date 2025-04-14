const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "index.html"); // 절대경로 (absolute path, full path)
  // console.log(htmlFilePath);
  res.sendFile(htmlFilePath);
});

app.listen(port, () => {
  console.log("서버 레디");
});

// 고양이 사진이 왜 깨지는지 네트워크를 보고 살펴보기.
