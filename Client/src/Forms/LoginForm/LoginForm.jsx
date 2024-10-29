import styles from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome back!</h1>
      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="example@email.com"
          required
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="Enter Your Password (6 characters)"
            required
          />
          <span aria-hidden="true" className={styles.passwordIcon}></span>
        </div>

        <a href="#" className={styles.forgotPassword}>
          Forgot Password?
        </a>

        <button type="submit" className={styles.submitButton}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
