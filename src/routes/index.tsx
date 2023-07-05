import { Route, Routes } from "react-router-dom"
import TodoUI from "../pages/TodoUI"
import TodoTable from "../pages/TodoTable"

const index = () => {
  return (
    <div>
        <Routes>
            <Route path="/create-todo/:id?" element={<TodoUI/>}/>
            <Route path="/" element={<TodoTable/>}/>
        </Routes>
    </div>
  )
}

export default index