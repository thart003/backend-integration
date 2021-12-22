import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../store/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = useAuth();

  React.useEffect(() => {
    if (auth.token !== null) {
      history.push("/dashboard");
    }
  }, [auth.token]);

  return (
    <div>
      <h1>Login</h1>
      {auth.loginError && (
        <div className="alert alert-danger">{auth.loginError.message}</div>
      )}
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        ></input>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          auth.loginUser(email, password);
        }}
      >
        Submit
      </button>
    </div>
  );
}
