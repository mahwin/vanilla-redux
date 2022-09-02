import { configureStore } from "@reduxjs/toolkit";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const span = document.querySelector("span");

//Data modifier Fn

const Add = "Add";
const Minus = "Minus";

const modifier = (state = 0, action) => {
  switch (action.type) {
    case Add:
      return ++state;
    case Minus:
      return --state;
    default:
      return state;
  }
};
//{reducer: modifier Fn, middleware: [...middlewares]}
const countStore = configureStore({ reducer: modifier });

//action => modifier에게 특정 행동을 지시
//action은 dispatch로 지시
// countStore.dispatch({ type: "Minus" });

// getState()로 상태 값 얻기 가능!
// console.log(countStore.getState());

// 아래처럼 모디파이어 함수 안에다가 직접 변경 넣기 보다는
// span.innerText = state;

const onChange = () => {
  span.innerText = countStore.getState();
};

countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({ type: Add }));
minus.addEventListener("click", () => countStore.dispatch({ type: Minus }));
