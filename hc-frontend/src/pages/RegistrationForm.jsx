/* eslint-disable */
import React, { useState } from 'react';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      zip: ''
    }
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      zip: ''
    }
  });

  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const [addressField] = name.split('.');
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Validate the form fields
  const validate = () => {
    let tempErrors = { fullName: '', email: '', password: '', confirmPassword: '', phone: '', address: { street: '', city: '', zip: '' }};
    let isValid = true;

    // Full Name validation
    if (!formData.fullName) {
      tempErrors.fullName = 'Full name is required';
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

    // Address validations
    if (!formData.address.street) {
      tempErrors.address.street = 'Street address is required';
      isValid = false;
    }

    if (!formData.address.city) {
      tempErrors.address.city = 'City is required';
      isValid = false;
    }

    if (!formData.address.zip || formData.address.zip.length !== 5) {
      tempErrors.address.zip = 'Zip code must be 5 digits';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setIsSubmitting(true);

    if (validate()) {
        setTimeout(() => {
        alert('Registration successful!');
        setIsSubmitting(false);
       }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='registration-container'>
      <h2>Register</h2>
      <form className='registration-form' onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          {/* <label htmlFor='fullName'>Full Name:</label> */}
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            className='input-field'
            placeholder='Enter your full name'
          />
          {errors.fullName && <p className='error-message'>{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          {/* <label htmlFor='email'>Email:</label> */}
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='input-field'
            placeholder='Enter your email'
          />
          {errors.email && <p className='error-message'>{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          {/* <label htmlFor='password'>Password:</label> */}
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='input-field'
            placeholder='Enter your password'
          />
          {errors.password && <p className='error-message'>{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          {/* <label htmlFor='confirmPassword'>Confirm Password:</label> */}
          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            className='input-field'
            placeholder='Confirm your password'
          />
          {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
        </div>

        {/* Phone Number */}
        <div>
          {/* <label htmlFor='phone'>Phone Number:</label> */}
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='input-field'
            placeholder='Enter your phone number'
          />
          {errors.phone && <p className='error-message'>{errors.phone}</p>}
        </div>

        {/* Address (Nested Fields) */}
        <div>
          {/* <label htmlFor='address.street'>Street Address:</label> */}
          <input
            type='text'
            name='address.street'
            value={formData.address.street}
            onChange={handleChange}
            className='input-field'
            placeholder='Enter your street address'
          />
          {errors.address?.street && <p className='error-message'>{errors.address.street}</p>}
        </div>

        <div>
          {/* <label htmlFor='address.city'>City:</label> */}
          <input
            type='text'
            name='address.city'
            value={formData.address.city}
            onChange={handleChange}
            className='input-field'
            placeholder='Enter your city'
          />
          {errors.address?.city && <p className='error-message'>{errors.address.city}</p>}
        </div>

        <div>
          {/* <label htmlFor='address.zip'>Zip Code:</label> */}
          <input
            type='text'
            name='address.zip'
            value={formData.address.zip}
            onChange={handleChange}
            className='input-field'
            placeholder='Enter your zip code'
          />
          {errors.address?.zip && <p className='error-message'>{errors.address.zip}</p>}
        </div>

        {serverError && <p className='server-error'>{serverError}</p>}

        <button type='submit' className='submit-button' disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
