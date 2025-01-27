/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from '../redux/slices/registrationSlice';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
    age:'',
    gender:''
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
    age:'',
    gender:''
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
    let tempErrors = { firstname: '', lastname:'', age:'', email: '', password: '', confirmPassword: '', phone: '', address: { street: '', city: '', zip: '' } };
    let isValid = true;

    // Full Name validation
    if (!formData.firstname) {
      tempErrors.firstname = 'Full name is required';
      isValid = false;
    }    
    if (!formData.lastname) {
      tempErrors.lastname = 'Last name is required';
      isValid = false;
    }
    if (!formData.username) {
      tempErrors.username = 'userName is required';
      isValid = false;
    }    
    if (!formData.age) {
      tempErrors.age = 'Age is required';
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
    if (!formData.gender) {
      tempErrors.gender = 'Gender is required';
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
              <span className="details">First Name</span>
              <input type="text" placeholder="Enter your first name" name="firstname" value={formData.firstname} onChange={handleChange} />
              {errors.firstname && <p className='error-message'>{errors.firstname}</p>}
            </div>
            <div className="input-box">
              <span className="details">Last Name</span>
              <input name="lastname" type="text" placeholder="Enter your last name" value={formData.lastname} onChange={handleChange} />
              {errors.lastname && <p className='error-message'>{errors.lastname}</p>}
            </div>

            <div className="input-box">
              <span className="details">Username</span>
              <input type="text" placeholder="Enter your username" onChange={handleChange} />
              {errors.username && <p className='error-message'>{errors.username}</p>}
            </div>

            <div className="input-box">
              <span className="details">Age</span>
              <input type="text" placeholder="Enter your Age" onChange={handleChange} />
              {errors.age && <p className='error-message'>{errors.age}</p>}
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

            <input type="radio" name="gender" id="dot-1" onChange={handleChange}/>
            <input type="radio" name="gender" id="dot-2" onChange={handleChange}/>
            <input type="radio" name="gender" id="dot-3" onChange={handleChange} />
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
              <div>
              {errors.gender && <p className='error-message'>{errors.gender}</p>}
              </div>
              
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
