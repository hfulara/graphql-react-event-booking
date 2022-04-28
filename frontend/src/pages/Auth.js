import React, { useRef, useState } from "react";
import "./Auth.css";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

function Auth() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }     
        }      
      `,
      variables: {
        email: email,
        password: password,
      },
    };

    if (!isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!){
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }            
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      };
    }

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          const user = {
            token: resData.data.login.token,
            userId: resData.data.login.userId,
            tokenExpiration: resData.data.login.tokenExpiration,
          };
          auth.login(user);
          navigate("/events", { replace: true });
        }
        //console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModeHandler}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </form>
  );
}

export default Auth;
