import { configureStore } from "@reduxjs/toolkit";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return { type: ADD_TODO, text };
};
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

// state is read-only!
// Never Mutate State, only change through action!
// state를 직접 변경하지 말고 새로운 state를 리턴해라!
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const toDoStore = configureStore({ reducer: reducer });

const createToDo = (toDo) => {
  const li = document.createElement("li");
  li.innerText = toDo;
  ul.appendChild(li);
};

const paintToDos = () => {
  const toDos = toDoStore.getState();
  ul.innerHTML = "";
  console.log(toDos);
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

toDoStore.subscribe(paintToDos);

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  toDoStore.dispatch(deleteToDo(id));
};

const dispatchAddToDo = (text) => {
  toDoStore.dispatch(addToDo(text));
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
