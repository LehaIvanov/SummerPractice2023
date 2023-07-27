import { memo } from "react";
import { useTodoStore } from "./state";

type ToDoProps = {
  id: string;
};

export const ToDo = memo(({ id }: ToDoProps) => {
  const todo = useTodoStore(state => state.todos[id]);
  const toggleTodo = useTodoStore(state => state.toggleTodo);

  return (
    <p>
      <input type="checkbox" id={id} name={id} checked={todo.done} onChange={() => toggleTodo(id)} />
      <label htmlFor={id}>{todo.title}</label>
    </p>
  );
});
