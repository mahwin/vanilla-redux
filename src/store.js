import { configureStore } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

const reducers = (state = [], action) => {
  switch (action.type) {
    case addTodo.type:
      console.log(action);
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteTodo.type:
      return state.filter((todo) => todo.id !== action.payload);
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
