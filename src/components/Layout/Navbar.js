import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'

function Nav() {
  return (
    <Navbar className='bg-info p-3 w-100'>
        <Navbar.Brand>
            <Link to="/">Task 4</Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end gap-2">
          <Button>
          <NavLink className='link' to="/register">Register</NavLink>
          </Button>
          <Button variant='danger'>
          <NavLink className='link' to="/login">Sign in</NavLink>
          </Button>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav