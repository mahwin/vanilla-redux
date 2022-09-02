import { configureStore } from "@reduxjs/toolkit";

const ADD = "ADD";
const DELETE = "DELETE";

const addTodo = (text) => {
  return { type: ADD, text };
};

const deleteTodo = (id) => {
  return { type: DELETE, id };
};

const reducers = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

export const actionCreators = {
  addTodo,
  deleteTodo,
};

const store = configureStore({ reducer: reducers });

export default store;
