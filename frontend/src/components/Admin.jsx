import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Admin() {
  return (
   <div className='container vh-100'>
       <div className='d-flex h-100 justify-content-center align-items-center'>
        <div className='w-25 h-100 d-flex flex-column justify-content-evenly align-items-center border-end border-4 border-success-subtle'>
            <Link to="/admin/category" className='text-decoration-none text-dark border-bottom border-2 fs-4'> Category Add</Link>
            <Link to="/admin/navbar" className='text-decoration-none text-dark border-bottom border-2 fs-4'> Navbar Add </Link>
            <Link to="/admin/product" className='text-decoration-none text-dark border-bottom border-2 fs-4'>Product Add</Link>
        </div>
        <div className='w-75'>
            <Outlet />
        </div>
       </div>


    </div>
  )
}

export default Admin