import { useState, useEffect } from 'react';
import './App.css';

let task_id = 0;

function Task({ name, id, callback }) {
  return (
    <div className="task">
      <div className="task_leftside">
        <input className="check_task" type="checkbox" value="HTML" />
        <p className="task_text">{name}</p>
      </div>
      <div className="delete_task" onClick={() => {callback(id)}}><b>X</b></div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let task = {name: e.target.elements[0].value, id: task_id++};
    if (task) {
      setTasks([...tasks, task]);
      e.target.elements[0].value = '';
    }
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input className="textfield" placeholder='Enter task...' />
        <input className="button" type="submit" value="Add task" />
      </form>

      <ul className='task_list'>
        {tasks.map(e => <li key={e.id}><Task name={e.name} id={e.id} callback={(id) => {
          let arr = [...tasks];
          arr.splice(id, 1);
          for (let i = id; i < arr.length; i++) arr[i].id--;
          task_id = arr.length ? arr[arr.length - 1].id : 0;
          setTasks([...arr]);
        }} /></li>)}
      </ul>
    </div>
  );
}

export default App;
