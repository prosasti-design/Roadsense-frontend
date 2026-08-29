import { useLanguage } from "../context/LanguageContext";

function Login() {
  const { t } = useLanguage();

  return (
    <div className="login-page">
      <h1>{t.loginTitle}</h1>

      <div className="login-field">
        <label>{t.role}</label>
        <select>
          <option>{t.citizen}</option>
          <option>{t.government}</option>
        </select>
      </div>

      <div className="login-field">
        <label>{t.email}</label>
        <input type="email" placeholder={t.email} />
      </div>

      <div className="login-field">
        <label>{t.password}</label>
        <input type="password" placeholder={t.password} />
      </div>

      <button className="login-submit">{t.loginButton}</button>
    </div>
  );
}

export default Login;