import { useState } from "react";
import { useTodoStore } from "./state";

export const AddToDo = () => {
  const [title, setTitle] = useState("");
  const addTodo = useTodoStore(state => state.addTodo);

  return (
    <>
      <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
      <button onClick={() => addTodo(title)}>Add</button>
    </>
  );
};
