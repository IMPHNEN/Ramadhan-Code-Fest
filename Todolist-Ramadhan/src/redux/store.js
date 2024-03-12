import { createStore } from "redux";
import todoListReducer from "./reducers/todoListReducer";

const storedList = JSON.parse(localStorage.getItem("list")) || [];

const store = createStore(todoListReducer, {
     todos: storedList,
     filter: "ALL",
});

// store.subscribe(() => {
//   const { todos } = store.getState();
//   if (todos && todos.length > 0) {
//     localStorage.setItem("list", JSON.stringify(todos));
//   }
// });

export default store;
