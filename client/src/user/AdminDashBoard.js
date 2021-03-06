/** @format */

import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className='card'>
        <h4 className='card-header text-white bg-dark text-wrap'>Admin Navigation</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/admin/create/category' className='nav-link text-info'>
              Create Categories
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/categories' className='nav-link text-info'>
              Manage Categories
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/create/product' className='nav-link text-info'>
              Create Products
            </Link>
          </li>

          <li className='list-group-item'>
            <Link to='/admin/products' className='nav-link text-info'>
              Manage Products
            </Link>
          </li>

          {/* <li className='list-group-item'>
            <Link to='/admin/orders' className='nav-link text-info'>
              Manage Orders
            </Link>
          </li> */}
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className='card mb-4'>
        <h1 className='card-header'>Admin Information</h1>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span className='badge badge-success mr-4'>Name:</span>
            {name}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2'>Email:</span>
            {email}
          </li>

          <li className='list-group-item text-center'>
            <span className='badge badge-info mr-2'>Admin Panel</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title='Welcome to admin area'
      description='Manage all your products here'
      className='container bg-info rounded p-4'>
      <div className='row '>
        <div className='col-sm-4 py-3 py-sm-0 mb-2'>{adminLeftSide()}</div>
        <div className='col-sm-8 py-3 py-sm-0 mb-2'>{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
