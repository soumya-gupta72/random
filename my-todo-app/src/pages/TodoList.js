import React, {useReducer, useState} from "react";

const ACTIONS = {
    ADD: 'add',
    DELETE: 'delete',
    TOGGLE: 'toggle',
}
const reducer = (todo, action) => {
    console.log('action', action)
  switch(action.type) {
    case ACTIONS.ADD:
        return [...todo, newTodo(action.payload.name)];
    case ACTIONS.DELETE:
        return todo.filter(item => item.id != action.payload.id);
    
    default:
        return todo;
  }
};

const newTodo = name => {
  return {
    id: Date.now(),
    task: name,
    complete: 'incomplete',
  };
};

const TodoList = () => {
  const [todo, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  const submitTodo = () => {
    dispatch({
      type: ACTIONS.ADD,
      payload: {name},
    });
    setName('')
  }
  console.log('task', todo)
  return (
    <>
        <h1> Todo List</h1>
        <div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter a todo"
          />
          <button onClick={submitTodo}> Add </button>
        </div>
        <ul>
        {todo.map(item => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span
              onClick={() =>
                dispatch({ type: ACTIONS.TOGGLE, payload: { id: item.id } })
              }
              className={`cursor-pointer ${
                item.complete ? 'line-through text-gray-500' : ''
              }`}
            >
              {item.task}
            </span>
            <button
              onClick={() =>
                dispatch({ type: ACTIONS.DELETE, payload: { id: item.id } })
              }
              className="ml-2 text-red-500"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  )
};

export default TodoList;