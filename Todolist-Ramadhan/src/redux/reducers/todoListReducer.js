import {
  ADD_TODO_LIST,
  REMOVE_TODO_LIST,
  EDIT_TODO_LIST,
  TOGGLE_TODO_LIST,
  FILTER_TODO_LIST,
} from "../actions/todoListAction";

const initialState = {
  todos: [],
  filter: "ALL",
};

export const todoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_LIST:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case REMOVE_TODO_LIST:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case EDIT_TODO_LIST:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }
          return todo;
        }),
      };
    case TOGGLE_TODO_LIST:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case FILTER_TODO_LIST:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default todoListReducer;
