document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const userTable = document.getElementById("userTable");
  const messageDiv = document.getElementById("message");

  // 최초 페이지가 호출될때, 백엔드에 데이터 요청.
  updateTable();

  // 메시지 표시 함수
  function showMessage(message, isError = false) {
    messageDiv.textContent = message;
    messageDiv.className = isError ? "error-msg" : "success-msg";
    setTimeout(() => {
      messageDiv.textContent = "";
      messageDiv.className = "";
    }, 3000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = username.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    if (!name) {
      showMessage("이름은 필수 입력항목입니다.", true);
      return;
    }

    console.log("생성할 사용자: ", {
      name,
      email: emailValue,
      phone: phoneValue,
    });

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: emailValue,
        phone: phoneValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        showMessage(data.message);

        // 폼 초기화
        username.value = "";
        email.value = "";
        phone.value = "";

        // 테이블 업데이트
        updateTable();
      })
      .catch((error) => {
        console.error("사용자 생성 오류:", error);
        showMessage("사용자 생성 중 오류가 발생했습니다.", true);
      });
  });

  // 버튼을 만들고, 콜백함수 등록하는 함수를 만드는중...
  function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }

  function updateTable() {
    userTable.innerHTML = ""; // 이전 내용 삭제

    fetch("/users")
      .then((res) => res.json())
      .then((users) => {
        if (Object.keys(users).length === 0) {
          const emptyMessage = document.createElement("p");
          emptyMessage.textContent = "등록된 사용자가 없습니다.";
          userTable.appendChild(emptyMessage);
          return;
        }

        // 사용자 목록 표시
        for (const userId in users) {
          const user = users[userId];

          // 사용자 데이터 표시 방식 결정 (이전 버전과 호환)
          const userData = typeof user === "object" ? user : { name: user };

          const row = document.createElement("div");
          row.className = "user-row";

          const userInfo = document.createElement("div");
          userInfo.innerHTML = `
            <strong>ID:</strong> ${userId}<br>
            <strong>이름:</strong> ${userData.name || "이름 없음"}<br>
            ${
              userData.email
                ? `<strong>이메일:</strong> ${userData.email}<br>`
                : ""
            }
            ${
              userData.phone
                ? `<strong>연락처:</strong> ${userData.phone}<br>`
                : ""
            }
            ${
              userData.createdAt
                ? `<strong>생성일:</strong> ${new Date(
                    userData.createdAt
                  ).toLocaleString()}<br>`
                : ""
            }
            ${
              userData.updatedAt
                ? `<strong>수정일:</strong> ${new Date(
                    userData.updatedAt
                  ).toLocaleString()}`
                : ""
            }
          `;

          row.appendChild(userInfo);

          // 버튼 영역
          const buttonDiv = document.createElement("div");
          buttonDiv.style.marginTop = "10px";

          // 버튼 만들기 함수 호출
          buttonDiv.appendChild(createButton("수정", () => editUser(userId)));
          buttonDiv.appendChild(createButton("삭제", () => deleteUser(userId)));

          row.appendChild(buttonDiv);
          userTable.appendChild(row);
        }
      })
      .catch((error) => {
        console.error("사용자 목록 조회 오류:", error);
        showMessage("사용자 목록을 불러오는 중 오류가 발생했습니다.", true);
      });
  }

  function editUser(userId) {
    // 현재 사용자 데이터 가져오기
    fetch(`/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("사용자 정보를 가져올 수 없습니다.");
        return res.json();
      })
      .then((userData) => {
        // 사용자 데이터 추출
        const user = userData[userId];
        const userData2 = typeof user === "object" ? user : { name: user };

        // 수정할 이름 입력 받기
        const newName = prompt("수정할 이름을 입력하세요.", userData2.name);
        if (newName === null) return; // 취소 버튼 클릭 시

        // 수정할 이메일 입력 받기
        const newEmail = prompt(
          "수정할 이메일을 입력하세요.",
          userData2.email || ""
        );
        if (newEmail === null) return; // 취소 버튼 클릭 시

        // 수정할 전화번호 입력 받기
        const newPhone = prompt(
          "수정할 전화번호를 입력하세요.",
          userData2.phone || ""
        );
        if (newPhone === null) return; // 취소 버튼 클릭 시

        // 서버에 수정 요청 보내기
        fetch(`/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newName.trim(),
            email: newEmail.trim(),
            phone: newPhone.trim(),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            showMessage(data.message);
            updateTable();
          })
          .catch((error) => {
            console.error("수정 중 오류 발생: ", error);
            showMessage("수정 중 오류가 발생했습니다.", true);
          });
      })
      .catch((error) => {
        console.error("사용자 정보 조회 오류:", error);
        showMessage("사용자 정보를 불러오는 중 오류가 발생했습니다.", true);
      });
  }

  function deleteUser(userId) {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      fetch(`/users/${userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          showMessage(data.message);
          updateTable();
        })
        .catch((error) => {
          console.error("삭제 중 오류 발생: ", error);
          showMessage("삭제 중 오류가 발생했습니다.", true);
        });
    }
  }

  // 미션1. 입력이 끝났으면, 입력칸 클리어 하기
  // 미션2. 입력이 끝났으면, 서버에 정보를 요청해서 화면에 표시하기

  // 미션3. 사용자 목록에 "수정", "삭제" 버튼 추가하기

  // 미션4. "삭제" 기능 구현
  // 미션5. "수정" 기능 구현
});
