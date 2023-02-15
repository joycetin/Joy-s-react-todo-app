import React, { useState } from 'react'
import './todoApp.css';

const App = () => {
  //Here we are using the useState fuction to set a state to our variables
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [EditId, setEditId] = useState(0);
  //Define the handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (EditId){
      const editTodo = todos.find((i) => i.id === EditId);
      const updateTodos = todos.map((m) =>
      m.id === editTodo.id
        ?(m = { id: m.id, todo })
        :{ id: m.id, todo: m.todo}
        );
        settodos(updateTodos);
        setEditId(0);
        settodo("");
        return;
    }

    if (todo !== "") {
      settodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      settodo('');
    }
    
  }

  //define the handleDelete
  const handleDelete = (id) => {
    const delTodo =todos.filter((to) => to.id !== id);
    //setting the state, we also use the spread operators(...)
    settodos([...delTodo]);
  }

  //Define the handlerEdit
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    settodo(editTodo.todo);
    setEditId(id);
  };
  //creating an array
  // const names = ['Jo','Joy','Joyce','JoyceTina'];
  return (
    <div className='App'>
      {
        <div className='container'>
          <h1>JOY'S REACT TODO APP</h1>
          <form className="todoform" onSubmit={handleSubmit}>
            <input
             type="Text"
             value={todo} 
             onChange={(e) => settodo(e.target.value)} />
            <button type='submit'>{EditId ? "Edit" : "Go"}</button>
          </form>
          <ul className='alltodos'>
            {
              todos.map(
                (m) => (
                  <li className='singletodo'>
                    <span className='todotext' key={m.id}>{m.todo}</span>
                    <button onClick={() => handleEdit(m.id)}>Edit</button>
                    <button onClick={() => handleDelete(m.id)}>Delete</button>
                  </li>
                )
              )
            }

          </ul>
        </div>
      }

    </div>
  )
  // return <div className='App'>{names.filter((girls) => (girls!=='Joyce') ,)}</div>
}

export default App