/* eslint-disable */
import React, { useState } from 'react';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formData.email && formData.password && (!errors.email && !errors.password)) {
      setIsSubmitting(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validate()) {
      setServerError('');

      setTimeout(() => {
        alert('Login successful!');
        setIsSubmitting(false);
      }, 1000);

 
    }else{
      setIsSubmitting(false);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor='email'>Email:</label> */}
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your Email'
          />
          {errors.email && <p className='error-message'>{errors.email}</p>}
        </div>

        <div>
          {/* <label htmlFor='password'>Password:</label> */}
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
          />
          {errors.password && <p className='error-message'>{errors.password}</p>}
        </div>

        {serverError && <p className='server-error'>{serverError}</p>}

        <button type='submit' disabled={isSubmitting} >Login</button>
      </form>
    </div>
  );
};

export default Login;
