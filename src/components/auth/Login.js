import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import BackButton from '../UI/BackButton.js';
import { login } from '../../actions/auth.js'

function Login({login, isAuthenticated}) {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
        localStorage.setItem('email', email)
    };
    if(isAuthenticated) {
        return <Navigate to="/users" />
    }
  return (
    <div>
        <BackButton />
        <div className='auth_container'>
        <h1>Login</h1>
        <Form className='p-1' onSubmit={ e => onSubmit(e)}>
            <Form.Group className='p-1'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email" 
                    name="email" 
                    onChange={e => onChange(e)} 
                    placeholder="Email" 
                    value={email}
                    required />
            </Form.Group>
            <Form.Group className='p-1'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password" 
                    name="password" 
                    onChange={e => onChange(e)} 
                    placeholder="Password" 
                    value={password}
                    required />
            </Form.Group>
            <Button className='m-1' type="submit" variant='primary'>Login</Button>{' '}
            <p>Dont have an account yet? <Link to="/register">Register</Link></p>
        </Form>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login);