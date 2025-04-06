import { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './Auth.module.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password too short';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
          <h1>Join Our Food Community</h1>
          <p>Sign up to get exclusive deals and personalized recommendations</p>
        </div>
      </div>

      <div className={styles.authRight}>
        <div className={styles.authFormContainer}>
          <h2 className={styles.authFormTitle}>Create Account</h2>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? styles.errorInput : ''}
                />
              </div>
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>

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

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? styles.errorInput : ''}
                />
              </div>
              {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className={styles.authSwitch}>
            Already have an account? <a href="/login">Log in</a>
          </div>
        </div>
      </div>

      {success && (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h3>Account Created!</h3>
          <p>Welcome to our food community!</p>
          <button onClick={() => setSuccess(false)} className={styles.closeButton}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUp;