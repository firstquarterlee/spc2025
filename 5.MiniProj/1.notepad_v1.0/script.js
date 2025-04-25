// CRUD 중 CR
// 저장 버튼
const saveButton = document.querySelector(".save-button"); // 저장버튼가져옴
const noteList = document.getElementById("note-pad-list");
// 전역변수 추가 어떤 메모 수정 중인지 저장용
let editingLi = null;
// 저장버튼에 클릭이벤트 삽입
saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  // 제목입력, 내용입력 돔 가져옴
  const titleInput = document.querySelector(".input-first");
  const contentInput = document.querySelector(".input-second");

  // input에 적은 텍스트 가져오기
  const title = titleInput.value;
  const content = contentInput.value;

  if (editingLi) {
    const newTitle = editingLi.querySelector(".edit-title").value;
    const newContent = editingLi.querySelector(".edit-content").value;

    editingLi.querySelector(
      ".edit-title"
    ).outerHTML = `<strong>${newTitle}</strong>`;
    editingLi.querySelector(".edit-content").outerHTML = `<p>${newContent}</p>`;

    // 버튼 원상복구
    const completeBtn = editingLi.querySelector(".complete-btn");
    completeBtn.classList.remove("complete-btn");
    completeBtn.classList.add("edit-btn");
    completeBtn.textContent = "수정";

    editingLi = null;
  } else {
    const newNote = document.createElement("li");

    newNote.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 15px; margin: 10px; border-radius: 8px;">
        <strong>${title}</strong>
        <p>${content}</p>
        <button class="edit-btn">수정</button>
        <button class="delete-btn">삭제</button>
      </div>
    `;
    noteList.appendChild(newNote);
  }

  titleInput.value = "";
  contentInput.value = "";

  // li 태그 하나 새로 만들기위해 만듬
});

// CRUD 중 D
// 삭제 버튼 관련 코드
noteList.addEventListener("click", (e) => {
  e.preventDefault();
  const li = e.target.closest("li");

  if (e.target.classList.contains("delete-btn")) {
    li.remove();
  } else if (e.target.classList.contains("edit-btn")) {
    const title = li.querySelector("strong").innerText;
    const content = li.querySelector("p").innerText;

    li.querySelector(
      "strong"
    ).outerHTML = `<input class="edit-title" type="text" value="${title}">`;
    li.querySelector(
      "p"
    ).outerHTML = `<input class="edit-content" type="text" value="${content}">`;

    // 수정 버튼을 완료 버튼으로 변경
    e.target.classList.remove("edit-btn");
    e.target.classList.add("complete-btn");
    e.target.textContent = "완료";

    editingLi = li;
  } else if (e.target.classList.contains("complete-btn")) {
    // 완료 버튼 클릭 시 처리
    const newTitle = li.querySelector(".edit-title").value;
    const newContent = li.querySelector(".edit-content").value;

    li.querySelector(".edit-title").outerHTML = `<strong>${newTitle}</strong>`;
    li.querySelector(".edit-content").outerHTML = `<p>${newContent}</p>`;

    // 완료 버튼을 다시 수정 버튼으로 변경
    e.target.classList.remove("complete-btn");
    e.target.classList.add("edit-btn");
    e.target.textContent = "수정";

    editingLi = null;
  }
});
