/** @format */
// eslint-disable-next-line
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { signup } from '../auth/helper/index';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 0,
    error: '',
    success: false,
  });

  const { name, email, password, error, success, role } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  // const handleRole = (name) => (event) => {
  //   setValues({ ...values, error: false, [name]: event.target.value });
  // };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, role })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            role: 0,
            error: '',
            success: true,
          });
        }
      })
      .catch(console.log('Error in signup'));
  };

  const signupForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Name</label>
              <input
                onChange={handleChange('name')}
                type='text'
                className='form-control'
                value={name}
              />
            </div>

            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                type='email'
                onChange={handleChange('email')}
                className='form-control'
                value={email}
              />
            </div>

            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                type='password'
                onChange={handleChange('password')}
                className='form-control'
                value={password}
              />
            </div>

            <div className='form-group'>
              <label className='text-light'>User Type</label>
              <select onChange={handleChange('role')} className='form-control'>
                <option value={0}>User</option>
                <option value={1}>Admin</option>
              </select>
            </div>

            <button onClick={onSubmit} className='btn btn-block rounded btn-info mt-4'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
            Account created successfully. Please <Link to='/signin'>Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title='SIGNUP' description='A page for user to signup'>
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      {/* <p className='text-white text-center'>{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
