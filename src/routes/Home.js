import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../component/ToDo";

function Home({ toDos, addTodo }) {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

// return 하는 값이 Home props에 추가되어서 들어감!
//redux의 state를 Connect된 Componenet의 props를 전달 하겠다
function mapStateToProps(state) {
  return { toDos: state };
}

//return 하는 값이 똑같이 prorps에 추가되어서 들어감
// redux의 값을 변경하는 dispatch를 props로 전달하겠다.
function mapDispatchToProps(dispatch) {
  return {
    addTodo: (text) => dispatch(actionCreators.addTodo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
