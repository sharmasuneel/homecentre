/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from '../redux/slices/registrationSlice';
import { Link } from 'react-router';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
    age: '',
    gender: '',
    dob: '01/01/2000',
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
    age: '',
    gender: '',
    dob: '',
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, serverError, user, success} = useSelector((state) => state.registration);

  console.log(user);
  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");

    if (subField) {
      setFormData({
        ...formData,
        [field]: { ...formData[field], [subField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate the form fields
  const validate = () => {
    let tempErrors = { firstname: '', lastname: '', age: '', email: '', password: '', confirmPassword: '', phone: '', address: { street: '', city: '', zip: '' } };
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
    if (!formData.dob) {
      tempErrors.dob = 'dob  is required';
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
    // Nested Address validation
    const address = formData.address;


    if (!address.street) {
      if (!address.street.trim()) {
        tempErrors.address = tempErrors.address || {};
        tempErrors.address.street = "Street address is required.";
        isValid = false;
      }
    }

    if (!address.city) {
      if (!address.city.trim()) {
        tempErrors.address = tempErrors.address || {};
        tempErrors.address.city = "City is required.";
        isValid = false;
      }
    }

    if (!address.postalCode) {
      const postalCodeRegex = /^[0-9]{5}$/; // Simple postal code validation (5 digits)
      if (!address.postalCode.trim()) {
        tempErrors.address = tempErrors.address || {};
        tempErrors.address.postalCode = "Postal code is required.";
        isValid = false;
      } else if (!postalCodeRegex.test(address.postalCode)) {
        tempErrors.address = tempErrors.address || {};
        tempErrors.address.postalCode = "Invalid postal code format (5 digits).";
        isValid = false;
      }
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
  <>

    {!success ?   <div className='container'> <div className="title">Registration</div>
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
              <input type="text" placeholder="Enter your username" name="username" onChange={handleChange} />
              {errors.username && <p className='error-message'>{errors.username}</p>}
            </div>

            <div className="input-box">
              <span className="details">Age</span>
              <input type="number" placeholder="Enter your Age" onChange={handleChange} name="age" />
              {errors.age && <p className='error-message'>{errors.age}</p>}
            </div>

            <div className="input-box">
              <span className="details">Email</span>
              <input name="email" type="text" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className='error-message'>{errors.email}</p>}
            </div>

            <div className="input-box">
              <span className="details">Phone Number</span>
              <input name="phone" type="text" placeholder="Enter your number" value={formData.phone} onChange={handleChange} />
              {errors.phone && <p className='error-message'>{errors.phone}</p>}
            </div>
            <div className="input-box">
              <span className="details">DOB</span>
              <input name="dob" type="date" placeholder="Enter your Dob" value={formData.dob}  />
              {errors.dob && <p className='error-message'>{errors.dob}</p>}
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input name="password" type="text" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className='error-message'>{errors.password}</p>}
            </div>

            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input name="confirmPassword" type="text" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
            </div>
            <div className="input-box">
              <h3>Address</h3>
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.postalCode"
                placeholder="Postal Code"
                value={formData.address.postalCode}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.country"
                placeholder="Country"
                value={formData.address.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="gender-details">

            <input type="radio" name="gender" id="dot-1" onChange={handleChange} />
            <input type="radio" name="gender" id="dot-2" onChange={handleChange} />
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
       </div> </div>: <div><p>user.message</p><Link to='/login' className='submit-button'>Login</Link></div>
       }
    </>
  );
};

export default RegistrationForm;
