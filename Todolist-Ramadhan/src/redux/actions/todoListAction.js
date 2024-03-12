export const ADD_TODO_LIST = "ADD_TODO_LIST";
export const REMOVE_TODO_LIST = "REMOVE_TODO_LIST";
export const EDIT_TODO_LIST = "EDIT_TODO_LIST";
export const TOGGLE_TODO_LIST = "TOGGLE_TODO_LIST";
export const FILTER_TODO_LIST = "FILTER_TODO_LIST";

export const addTodoList = (todos) => {
  return {
    type: ADD_TODO_LIST,
    payload: todos,
  };
};

export const removeTodoList = (id) => {
  return {
    type: REMOVE_TODO_LIST,
    payload: {
      id,
    },
  };
};
export const editTodoList = (todo) => {
  return {
    type: EDIT_TODO_LIST,
    payload: todo,
  };
};

export const toggleTodoList = (todo) => {
  return {
    type: "TOGGLE_TODO_LIST",
    payload: todo,
  };
};
export const filterTodoList = (filter) => {
  return {
    type: "FILTER_TODO_LIST",
    payload: filter,
  };
};
