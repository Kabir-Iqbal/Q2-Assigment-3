import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [shownfinshed, setshowfinshed] = useState()

  
  const toglefinshed = (e) => {
    setshowfinshed(!shownfinshed)
  }

///stored data from local storage 
  useEffect(() => {
    let todostring = JSON.parse(localStorage.getItem("todos"))
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    } []
  })




  // function for stored data in using local storage
  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

//handle update
  const handleEdit = (e, id) => {
    const updatedTodo = prompt("Edit your todo:"); // Prompt user to enter the new todo value
    if (updatedTodo) {
      const updatedTodos = todos.map(item =>
        item.id === id ? { ...item, todo: updatedTodo } : item
      );
      settodos(updatedTodos);
    }
    savetols()


  }
// handle delete
  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id! == id
    });
    settodos(newtodos)
    savetols()


  }
  // hanndle add
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")

    savetols()
  }
  //handle change
  const handlechange = (e) => {
    settodo(e.target.value)

  }
 ///handle checkbox
  const hanldecheckbox = (e) => {
    let id = e.target.name
    console.log(id);

    let index = todos.findIndex(item => {
      return item.id === id
    })
    console.log(index);

    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    console.log(newtodos);
    savetols()

  }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-5 rounded-2xl bg-gray-200 min-h-[80vh] md:w-1/2">
        <h1 className="text-center font-serif font-bold text-lg">TaskMaster: Conquer Your Day</h1>
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold my-2">Add Todo</h2>
          <div className="flex flex-col">
            <input onChange={handlechange} value={todo} type="text" className="w-full rounded-xl px-5 p-1" />
            <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-violet-600 hover:bg-violet-900  font-bold text-white p-2 py-1 my-3 rounded-xl"> Save</button>
          </div>
          <input type="checkbox" onChange={toglefinshed} checked={shownfinshed} name="" id="" /> Show finshed
          <div className="bg-gray-400 h-[1px] w-3/4 mx-auto my-3"></div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5">No todos display</div>}
            {todos.map(item => {

              return (shownfinshed || !item.isCompleted) && <div className="todo flex justify-between  my-3" key={item.id}>
                <div className="flex gap-5 items-center">
                  <input name={item.id} onChange={hanldecheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="button flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-600 hover:bg-violet-900 font-bold text-white  p-2 py-1 mx-1 rounded-xl " >Edit</button>
                  <button onClick={handleDelete} className="bg-violet-600 hover:bg-violet-900 font-bold text-white p-2 py-1 mx-1 rounded-xl">Delete</button>
                </div>
              </div>
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App

