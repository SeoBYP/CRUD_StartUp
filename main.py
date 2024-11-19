from fastapi  import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
  id: int
  content:str

memos = []

app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
  memos.append(memo)
  return "값을 성공적으로 업데이트 했습니다."

@app.get("/memos")
def read_memo():
  return memos

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
  for memo in memos:
    if memo.id == req_memo.id:
      memo.content = req_memo.content
      return "성공적으로 값을 변경했습니다."
  return req_memo.id + "에 해당하는 메모가 없습니다."

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id:int):
  for index, memo in enumerate(memos):
    if memo.id == memo_id:
      memos.pop(index)
      return "성공적으로 값을 삭제했습니다."
  return memo_id + "에 해당하는 메모가 없습니다."


app.mount("/",StaticFiles(directory="static",html=True),name="static")