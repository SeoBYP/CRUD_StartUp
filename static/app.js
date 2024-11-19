async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`,{
    method: "DELETE",
  });// Post
  const resJson = await res.json();
  readMemo();
  console.log(resJson);
}

async function editMemo(event){
  const id = event.target.dataset.id;
  const editInput = prompt('수정할 값을 입력하세요');
  const res = await fetch(`/memos/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });// Post
  const resJson = await res.json();
  readMemo();
  console.log(resJson);
}

function displayMemo(memo){
  const ul = document.querySelector("#memo-ul");
  
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click",editMemo);
  editBtn.dataset.id = memo.id;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click",deleteMemo);
  deleteBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
}

async function readMemo(){
  const res = await fetch('/memos'); // Get
  const jsonRes = await res.json();
  //console.log(jsonRes);
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";

  jsonRes.forEach(displayMemo);
}

readMemo();

async function createMemo(input){
  const res = await fetch("/memos",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: input,
    }),
  });// Post
  const jsonRes = await res.json();
  readMemo();
  console.log(jsonRes);
}

function handleSubmit(event){
  event.preventDefault();
  const input = document.querySelector("#memo-input")
  createMemo(input.value);
  input.value = "";
}

const form  = document.querySelector('#memo-form');
form.addEventListener("submit",handleSubmit);