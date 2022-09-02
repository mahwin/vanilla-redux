import { configureStore } from "@reduxjs/toolkit";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

// createReducer를 사용하면  state를 mutate가능.
// redux toolkit이 immer 아래에서 돌아가기 때문.
// mutate하듯이 코드를 짜도 알아서 새로운 state을 리턴해줌.

const reducers = createReducer([], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    })
    .addCase(deleteTodo, (state, action) =>
      state.filter((todo) => todo.id !== action.payload)
    );
});

export const actionCreators = {
  addTodo,
  deleteTodo,
};

const store = configureStore({ reducer: reducers });

export default store;
