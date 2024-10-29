import LoginForm from "../../Forms/LoginForm/LoginForm";

function Login() {
  return (
    <div className="login">
      <div className="login__logo-container"><img src="./images/Logo.svg" alt="" className="logo"/></div>
      <div className="login__form-container">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
