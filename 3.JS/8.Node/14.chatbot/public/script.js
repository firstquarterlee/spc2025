// 미션1-1. 저 영역을 클리해서 창이 나오게 한다.
// 미션1-2. X박스를 눌러서 다시 창이 닫히게 한다.

// 미션3. Send 버튼을 통해서... 백엔드로 사용자가 입력한 대화 내용을 전송한다.
// 미션3-2. 엔터로도 입력되게...
// 미션4. 받아온 응답(에코 메세지)을 대화창에 출력한다.
// 미션4-2. 내가 입력한 메세지도 대화창에 출력하기... (가 있는게, 더 채팅창이 보기가 좋음)
const chatbotIcon = document.getElementById("chatbotIcon");
const chatbotWindow = document.getElementById("chatbotWindow");
const closeChatbot = document.getElementById("closeChatbot");
const sendMessage = document.getElementById("sendMessage");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotMessages = document.getElementById("chatbotMessage");

chatbotIcon.addEventListener("click", () => {
  chatbotIcon.style.display = "none";
  chatbotWindow.style.display = "flex";
});

closeChatbot.addEventListener("click", () => {
  chatbotIcon.style.display = "flex";
  chatbotWindow.style.display = "none";
});

// 그래서.... 이 아래 함수를 잘게 나누기.... TODO
async function getInputFromYourAndClearInputScreenAndSendMessageToServerAndWriteAnswer() {
  const question = chatbotInput.value;

  // 메세지 지우기
  chatbotInput.value = "";

  // 화면에 내 메세지 추가한다.
  const myMessage = document.createElement("div");
  myMessage.innerHTML = "나:" + question;
  chatbotMessages.appendChild(myMessage);

  // 서버로 보낸다

  // .then (fetch 체이닝 (Promise 체이닝))
  // fetch('/api/chat', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ question }),
  // })
  //     .then(resp => resp.json())
  //     .then(resp => console.log(resp));

  // await 방식
  const resp = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const result = await resp.json();
  // console.log(result);

  const answer = document.createElement("div");
  answer.innerHTML = result.question;

  chatbotMessages.appendChild(answer);
}

sendMessage.addEventListener("click", () => {
  getInputFromYourAndClearInputScreenAndSendMessageToServerAndWriteAnswer();
});

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // console.log('엔터키눌렸으니, 서버로 보내는 코드 짜기 TODO');
    getInputFromYourAndClearInputScreenAndSendMessageToServerAndWriteAnswer();
  }
});
