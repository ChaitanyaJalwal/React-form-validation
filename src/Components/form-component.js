import React, { useState, useEffect } from 'react';
import '../styles.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate the form on every change in formData or errors
    setIsFormValid(validate());
  }, [formData, errors]);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number';
      }
    }

    if (!formData.phoneNo) {
      newErrors.phoneNo = 'Phone number is required';
    } else {
      const phoneRegex = /^\+\d{1,3}\d{10}$/; // Assuming country code is 1-3 digits long
      if (!phoneRegex.test(formData.phoneNo)) {
        newErrors.phoneNo = 'Phone number must include country code and be in the format +1234567890, with exactly 10 digits after the country code';
      }
    }

    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNo) newErrors.panNo = 'Pan No. is required';

    if (!formData.aadharNo) {
      newErrors.aadharNo = 'Aadhar No. is required';
    } else {
      const aadharRegex = /^\d{12}$/;
      if (!aadharRegex.test(formData.aadharNo)) {
        newErrors.aadharNo = 'Aadhar No. must be exactly 12 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate the field
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="success-container">
          <h1>Form Submitted Successfully</h1>
          <ul>
            {Object.keys(formData).map((key) => (
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {formData[key]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label className="label">First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input" />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label className="label">Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input" />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label className="label">Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="input" />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label className="label">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label className="label">Password:</label>
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="input" 
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="password-toggle">
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label className="label">Phone No.:</label>
            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} className="input" />
            {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
          </div>
          <div className="form-group">
            <label className="label">Country:</label>
            <select name="country" value={formData.country} onChange={handleChange} className="select">
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              {/* More options may be added according to demand */}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
          <div className="form-group">
            <label className="label">City:</label>
            <select name="city" value={formData.city} onChange={handleChange} className="select">
              <option value="">Select City</option>
              <option value="Mumbai">Mumbai</option>
              <option value="New York">New York</option>
              {/* More options may be added according to demand */}
            </select>
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
          <div className="form-group">
            <label className="label">PAN No.:</label>
            <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} className="input" />
            {errors.panNo && <span className="error">{errors.panNo}</span>}
          </div>
          <div className="form-group">
            <label className="label">Aadhar No.:</label>
            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} className="input" />
            {errors.aadharNo && <span className="error">{errors.aadharNo}</span>}
          </div>
          <button type="submit" className="button" disabled={!isFormValid}>Submit</button>
        </form>
      )}
    </div>
  );
};


export default FormComponent;