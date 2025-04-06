import { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './Auth.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authLeft}>
        <div className={styles.authLeftContent}>
          <h1>Welcome Back!</h1>
          <p>Login to continue your food journey with us</p>
        </div>
      </div>

      <div className={styles.authRight}>
        <div className={styles.authFormContainer}>
          <h2 className={styles.authFormTitle}>Login to Your Account</h2>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.errorInput : ''}
                />
              </div>
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? styles.errorInput : ''}
                />
                <span className={styles.passwordToggle} onClick={togglePassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
            </div>

            <div className={styles.forgotPassword}>
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>
          </form>

          <div className={styles.authSwitch}>
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>

      {success && (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h3>Login Successful!</h3>
          <p>Redirecting to your dashboard...</p>
          <button onClick={() => setSuccess(false)} className={styles.closeButton}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;