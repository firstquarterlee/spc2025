const inputTitle = document.getElementById("input-title");
const inputText = document.getElementById("input-text");
const noteList = document.getElementById("note-pad-list");

// 사용자가 "저장하기" 버튼을 눌렀을 때 실행되는 함수
function uploadPost() {
  // 입력창(input)에서 유저가 쓴 텍스트 값을 가져옴
  const title = inputTitle.value;
  // .value는 인풋 안의 글자를 가져오는 속성이다.
  const content = inputText.value;

  // <div>태그를 새로 만ㄷ르고 newNote라는 변수에 담는다.
  const newNote = document.createElement("div");
  // 메모 내용과 버튼들을 div안에 넣어줌, innerHTML은 해당 요소 안에 HTML을 직접 넣는 방식.
  newNote.innerHTML = `
    <strong class="note-title">${title}</strong>
    <p class="note-content">${content}</p>
    <button class="edit-btn">수정</button>  
    <button class="delete-btn">삭제</button>  
  `;

  alert("저장완료!");

  // 위에 만든 newNote를 메모 리스트에 추가함. .appendChild()는 "자식 요소로 붙인다"라는 뜻.
  noteList.appendChild(newNote);
  // 새로운 메모가 생겼으니 수정/삭제 이벤트도 연결하자! 그걸 담당하는 함수가 setupNoteEvents()다.
  setupNoteEvents(newNote);

  inputTitle.value = "";
  inputText.value = "";
}

// setupNoteEvents() 메모 하나를 받아서 그 안에 있는 버튼들에 이벤트를 붙이는 함수.
function setupNoteEvents(noteElement) {
  // 메모 안에서 수정, 삭제 버튼을 찾는 코드들(변수 editBtn, deleteBtn)
  const editBtn = noteElement.querySelector(".edit-btn");
  const deleteBtn = noteElement.querySelector(".delete-btn");

  // editBtn -> "수정" 버튼을 눌렀을 때 실행할 코드.
  editBtn.addEventListener("click", () => {
    //현재 보여지고 있는 제목과 내용을 꺼내는 코드. textContent는 HTML 태그 안의 텍스트만 가져옴.
    const currentTitle = noteElement.querySelector(".note-title").textContent;
    const currentContent =
      noteElement.querySelector(".note-content").textContent;

    noteElement.innerHTML = `
      <input class="edit-title" value="${currentTitle}" />
      <textarea class="edit-content">${currentContent}</textarea>
      <button class="save-edit-btn">저장</button>
      <button class="delete-btn">삭제</button>
    `;

    const saveBtn = noteElement.querySelector(".save-edit-btn");
    const deleteBtn = noteElement.querySelector(".delete-btn");

    saveBtn.addEventListener("click", () => {
      const newTitle = noteElement.querySelector(".edit-title").value;
      const newContent = noteElement.querySelector(".edit-content").value;

      noteElement.innerHTML = `
        <strong class="note-title">${newTitle}</strong>
        <p class="note-content">${newContent}</p>
        <button class="edit-btn">수정</button>  
        <button class="delete-btn">삭제</button>  
      `;

      setupNoteEvents(noteElement);
      alert("수정완료!");
    });

    deleteBtn.addEventListener("click", () => {
      noteElement.remove();
      alert("삭제 완료!");
    });
  });

  deleteBtn.addEventListener("click", () => {
    noteElement.remove();
    alert("삭제 완료!");
  });
}
