console.log("자스 잘 연결됨.");
// 메모 데이터를 저장할 배열
let memos = JSON.parse(localStorage.getItem("memos")) || [];

// DOM 요소
const memoForm = document.getElementById("memo-form");
const memoTitle = document.getElementById("memo-title");
const memoContent = document.getElementById("memo-content");
const memoFile = document.getElementById("memo-file");
const filePreview = document.getElementById("file-preview");
const memoContainer = document.getElementById("memo-container");

// 수정할 메모의 ID를 저장할 변수
let editingMemoId = null;

// 페이지 로드 시 저장된 메모 표시
document.addEventListener("DOMContentLoaded", () => {
  renderMemos();

  // 파일 선택 시 미리보기
  memoFile.addEventListener("change", previewFile);
});

// 파일 미리보기 함수
function previewFile() {
  filePreview.innerHTML = "";
  const file = memoFile.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      filePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

// 메모 추가 이벤트
memoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // 파일 처리
  const file = memoFile.files[0];
  let fileDataUrl = null;

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      fileDataUrl = e.target.result;
      saveOrUpdateMemo(fileDataUrl);
    };
    reader.readAsDataURL(file);
  } else {
    // 수정 시 기존 이미지 유지
    if (editingMemoId) {
      const memo = memos.find((memo) => memo.id === editingMemoId);
      fileDataUrl = memo ? memo.image : null;
    }
    saveOrUpdateMemo(fileDataUrl);
  }
});

// 메모 저장 또는 업데이트 함수
function saveOrUpdateMemo(fileDataUrl) {
  if (editingMemoId) {
    // 메모 업데이트
    const index = memos.findIndex((memo) => memo.id === editingMemoId);
    if (index !== -1) {
      memos[index] = {
        ...memos[index],
        title: memoTitle.value,
        content: memoContent.value,
        image: fileDataUrl,
        updatedAt: new Date().toLocaleString(),
      };
    }
    // 수정 완료 후 상태 초기화
    editingMemoId = null;
  } else {
    // 새 메모 추가
    const newMemo = {
      id: Date.now(),
      title: memoTitle.value,
      content: memoContent.value,
      image: fileDataUrl,
      createdAt: new Date().toLocaleString(),
    };
    memos.unshift(newMemo);
  }

  saveMemos();
  renderMemos();
  memoForm.reset();
  filePreview.innerHTML = "";
}

// 메모 삭제 함수
function deleteMemo(id) {
  if (confirm("메모를 삭제하시겠습니까?")) {
    memos = memos.filter((memo) => memo.id !== id);
    saveMemos();
    renderMemos();
  }
}

// 메모 수정 함수
function editMemo(id) {
  const memo = memos.find((memo) => memo.id === id);

  if (memo) {
    memoTitle.value = memo.title;
    memoContent.value = memo.content;

    if (memo.image) {
      filePreview.innerHTML = `<img src="${memo.image}">`;
    }

    // 수정할 메모의 ID 저장
    editingMemoId = id;

    // 폼으로 스크롤
    memoForm.scrollIntoView({ behavior: "smooth" });
  }
}

// 로컬 스토리지에 메모 저장
function saveMemos() {
  localStorage.setItem("memos", JSON.stringify(memos));
}

// 메모 렌더링 함수
function renderMemos() {
  memoContainer.innerHTML = "";

  memos.forEach((memo) => {
    const memoCard = document.createElement("div");
    memoCard.className = "col-md-4";
    memoCard.innerHTML = `
            <div class="card memo-card">
                ${
                  memo.image
                    ? `<img src="${memo.image}" class="card-img-top memo-image" alt="메모 이미지">`
                    : ""
                }
                <div class="card-body">
                    <h5 class="card-title">${memo.title}</h5>
                    <p class="card-text">${memo.content}</p>
                    <p class="card-text"><small class="text-muted">${
                      memo.createdAt
                    }</small></p>
                    <div class="memo-actions">
                        <button class="btn btn-info btn-sm edit-btn">수정</button>
                        <button class="btn btn-danger btn-sm delete-btn">삭제</button>
                    </div>
                </div>
            </div>
        `;

    memoContainer.appendChild(memoCard);

    // 이벤트 리스너 추가
    memoCard.querySelector(".edit-btn").addEventListener("click", (e) => {
      // 현재 카드의 제목과 내용 요소 가져오기
      const cardBody = e.target.closest(".card-body");
      const titleElement = cardBody.querySelector(".card-title");
      const contentElement = cardBody.querySelector(".card-text:first-of-type");

      // 현재 텍스트 값 가져오기
      const currentTitle = titleElement.textContent;
      const currentContent = contentElement.textContent;

      // 제목과 내용을 입력 필드로 변경
      titleElement.innerHTML = `<input type="text" class="form-control edit-title" value="${currentTitle}">`;
      contentElement.innerHTML = `<textarea class="form-control edit-content" rows="3">${currentContent}</textarea>`;

      // 수정 버튼을 완료 버튼으로 변경
      e.target.textContent = "완료";
      e.target.classList.remove("edit-btn");
      e.target.classList.add("complete-btn");
    });

    // 완료 버튼 이벤트 처리
    memoCard.addEventListener("click", (e) => {
      if (e.target.classList.contains("complete-btn")) {
        const cardBody = e.target.closest(".card-body");
        const titleInput = cardBody.querySelector(".edit-title");
        const contentInput = cardBody.querySelector(".edit-content");
        const titleElement = cardBody.querySelector(".card-title");
        const contentElement = cardBody.querySelector(
          ".card-text:first-of-type"
        );

        // 새 값 가져오기
        const newTitle = titleInput.value;
        const newContent = contentInput.value;

        // 메모 객체에서 현재 메모 찾기
        const memoId = parseInt(memoCard.getAttribute("data-id"));
        const index = memos.findIndex((memo) => memo.id === memoId);

        if (index !== -1) {
          // 메모 업데이트
          memos[index].title = newTitle;
          memos[index].content = newContent;
          memos[index].updatedAt = new Date().toLocaleString();

          // 저장
          saveMemos();

          // UI 업데이트
          titleElement.innerHTML = newTitle;
          contentElement.innerHTML = newContent;

          // 버튼 원래대로
          e.target.textContent = "수정";
          e.target.classList.remove("complete-btn");
          e.target.classList.add("edit-btn");
        }
      }
    });

    // 메모 ID 저장
    memoCard.setAttribute("data-id", memo.id);

    // 삭제 버튼 이벤트
    memoCard
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteMemo(memo.id));
  });
}
