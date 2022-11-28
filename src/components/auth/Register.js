import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import BackButton from '../UI/BackButton.js';
import { register } from '../../actions/auth.js'
import { connect } from 'react-redux'

function Register({register}) {

    const history = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpsw: ""
    });
    const { name, email, password, confirmpsw } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // const sendRequest = async () => {
    //     const res = axios.post('/api/users', {
    //         name: name,
    //         email: email,
    //         password: password
    //     }).catch(err => { console.log(err) });
    //     const data = await res.data;
    //     return data;
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        password !== confirmpsw ? console.log('Password must match') : register({ name, email, password });
        return history('/login')
    }

  return (
    <div>
        <BackButton />
    <div className='auth_container'>
        <h1>Register</h1>
        <p>Specify your account info</p>
        <Form onSubmit={ e => onSubmit(e)}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name" 
                    onChange={e => onChange(e)} 
                    placeholder="Name" 
                    value={name}
                    required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email" 
                    onChange={e => onChange(e)} 
                    placeholder="Email" 
                    value={email}
                    required />
            </Form.Group>
            <div>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    onChange={e => onChange(e)} 
                    placeholder="Password" 
                    value={password}
                    required />
            </div>
            <div>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control 
                    type="password" 
                    name="confirmpsw" 
                    onChange={e => onChange(e)} 
                    placeholder="Confirm password" 
                    value={confirmpsw}
                    required />
            </div>
            <Button className='mt-1' variant='primary' type="submit" value="Register">Submit</Button>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
        </Form>
    </div>
    </div>
  )
}

export default connect(null, {register}) (Register);