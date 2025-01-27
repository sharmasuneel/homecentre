/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from '../redux/slices/registrationSlice';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, serverError } = useSelector((state) => state.registration);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form fields
  const validate = () => {
    let tempErrors = { fullName: '', email: '', password: '', confirmPassword: '', phone: '', address: { street: '', city: '', zip: '' } };
    let isValid = true;

    // Full Name validation
    if (!formData.fullName) {
      tempErrors.fullName = 'Full name is required';
      isValid = false;
    }
    if (!formData.userName) {
      tempErrors.userName = 'userName is required';
      isValid = false;
    }
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    }
    if (!formData.password) {
      tempErrors.password = 'password is required';
      isValid = false;
    }
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'confirm Password is required';
      isValid = false;
    }

    // Email validation (using regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      tempErrors.email = 'A valid email is required';
      isValid = false;
    }

    // Password validation
    if (!formData.password || formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Phone validation (using regex for 10-digit number)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError(formData);
    setIsSubmitting(true);

    if (validate()) {
      setTimeout(() => {
        dispatch(registerUser(formData));
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container'>

      <div className="title">Registration</div>
      {serverError && <p className='server-error'>{serverError}</p>}
      <div className="content">
        <form onSubmit={handleSubmit} >
          <div className="user-details">

            <div className="input-box">
              <span className="details">Full Name</span>
              <input type="text" placeholder="Enter your name" value={formData.fullName} onChange={handleChange} />
              {errors.fullName && <p className='error-message'>{errors.fullName}</p>}
            </div>

            <div className="input-box">
              <span className="details">Username</span>
              <input type="text" placeholder="Enter your username" onChange={handleChange} />
              {errors.userName && <p className='error-message'>{errors.userName}</p>}
            </div>

            <div className="input-box">
              <span className="details">Email</span>
              <input type="text" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className='error-message'>{errors.email}</p>}
            </div>

            <div className="input-box">
              <span className="details">Phone Number</span>
              <input type="text" placeholder="Enter your number" value={formData.phone} onChange={handleChange} />
              {errors.phone && <p className='error-message'>{errors.phone}</p>}
            </div>

            <div className="input-box">
              <span className="details">Password</span>
              <input type="text" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className='error-message'>{errors.password}</p>}
            </div>

            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input type="text" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
            </div>
          </div>
          <div className="gender-details">

            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span className="gender-title">Gender</span>
            <div className="category">

              <label for="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>

              <label for="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>

              <label for="dot-3">
                <span className="dot three"></span>
                <span className="gender">Prefer not to say</span>
              </label>
            </div>
          </div>


          <button type='submit' className='submit-button' disabled={isSubmitting}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
