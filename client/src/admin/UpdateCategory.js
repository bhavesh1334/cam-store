/** @format */

import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getCategory, updateCategory } from './helper/adminapicall';

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        console.log(data.name);
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, [match]);

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    //backend request fired
    updateCategory(match.params.categoryId, user._id, token).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
        setName(data.name);
      }
    });
  };

  // const successMessage = () => {
  //   if (success) {
  //     return <h4 className='text-success'>Category is Updated successfully</h4>;
  //   }
  // };

  // const warningMessage = () => {
  //   if (error) {
  //     return <h4 className='text-warning'>Failed to Update category</h4>;
  //   }
  // };

  const goBackButton = () => {
    return (
      <div className='mt-5'>
        <Link className='btn btn-sm btn-success mb-3' to='/admin/dashboard'>
          Admin Home
        </Link>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form action=''>
        <div className='form-group '>
          <p className='lead'>Enter Category</p>
          <input
            type='text'
            className='form-control my-3'
            onChange={handleChange}
            value={name}
            placeholder='Ex. Summer'
            autoFocus
            required
          />
          <button onClick={onSubmit} className='btn btn-outline-info'>
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title='Update Category Here'
      description='This is the place to Update category'
      className='container bg-info p-4'>
      <div className='row bg-white rounded '>
        <div className='col-md-8 offest-md-2'>
          {myCategoryForm()}
          {goBackButton()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
