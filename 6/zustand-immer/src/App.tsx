import { AddToDo } from "./AddToDo";
import { ToDo } from "./ToDo";
import { useTodoStore } from "./state";

const ContentContainer = () => {
  const todos = useTodoStore(state => state.todos);

  return (
    <>
      {Object.keys(todos).map(key => (
        <ToDo key={key} id={key}></ToDo>
      ))}
    </>
  );
};

const App = () => (
  <div className="container">
    <h5>TodoList </h5>
    <AddToDo />
    <ContentContainer />
  </div>
);

export default App;
