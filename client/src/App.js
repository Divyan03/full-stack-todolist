import { useState, useEffect } from "react";
const url = "http://localhost:3001";
function App() {
  const [todo, setTodo] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newObj, setNewObj] = useState("");

  useEffect(() => {
    getObj();

    console.log(todo)
  }, [])

  const getObj = () => {
    fetch (url +"/getObj").then(res => res.json()).then(data => setTodo(data)).catch(err => console.error("Error: ", err));
  }
  
  const deleteTodo = async id =>{
    const data = await fetch(url + "/obj/delete/" + id, {method: "DELETE"}).then(res => res.json());

    setTodo(todo => todo.filter(obj => obj._id != data._id))
     
  }

  const addObj = async () =>{
    if (newObj.trim() === "") {
      // Prevent adding empty tasks
      return;
    }
    const data = await fetch(url + "/obj/new", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newObj
      })
    }).then(res => res.json());
    console.log(data)
    setTodo([... todo, data])
    setPopupActive(false);
    setNewObj("")
  }

  return (
    <div className="App">
      <h1>Your To-Do List</h1>
      <div className="todoList">
        {todo.map(obj => (
          <div className="obj" key={obj._id}>
            <div className="text">{obj.text}</div>
            <div className="delete" onClick={() => deleteTodo(obj._id)}>x</div>
          </div>
        ))}
      </div>
      <div className="add-button" onClick={() => setPopupActive(true)}>+</div>
      
      {popupActive ? (
        <div className="popUp">
          <div className="close" onClick={() => setPopupActive(false)}>x</div>
          <div className="content">
            <h3>Add a Task</h3>
            <input type="text" className="addInput" onChange={e => setNewObj(e.target.value)} value={newObj}/>
            <div className="button" onClick={addObj} disabled={''}>Create Task</div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default App;
