import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const Login = props => {

  const [ login, setLogin ] = useState({
    username:'',
    password:''
  })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const changeHandler = e => {
    e.persist();

    let value = e.target.value

    setLogin({
      ...login,
      [e.target.name] : value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(login)
    axiosWithAuth()
      .post('/login', login)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.payload);
        props.history.push('/bubblepage')
      })
      .catch(err => console.log(err))

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="login"
          onChange={changeHandler}
          value={login.username}
        />
        <input 
          name="password"
          type="password"
          placeholder="password"
          onChange={changeHandler}
          value={login.password}
        />
        <button>
          submit
        </button>
      </form>
    </>
  );
};

export default Login;
