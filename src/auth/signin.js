import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';
import { authenticate, isAuth } from './helpers';
import GoogleLoginButton from './google';

function Signin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Sign in');

    const position = {
        position: toast.POSITION.BOTTOM_RIGHT
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonText('Signing In...')
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL}/signin`,
                {
                    email,
                    password
                }
            )
            authenticate(response, () => {
                toast.success('successful signin', position)
            })
        } catch (err) {
            toast.error(`error while signing up: ${err}`, position)
        }
        setEmail('')
        setPassword('')
        setButtonText('Sign in')
    }

    const handleChange = cb => e => cb(e.target.value)

    let checkAuthUser = isAuth()
    if (checkAuthUser) {
        checkAuthUser = JSON.parse(checkAuthUser);
        if (checkAuthUser.role === 'admin') {
            props.history.push('/admin')
        } else {
            props.history.push('/protected')
        }
        return null;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                        <div className="card-img-left d-none d-md-flex">
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin" onSubmit={handleSubmit}>
                                <div className="form-label-group">
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        value={email}
                                        onChange={handleChange(setEmail)}
                                    />
                                    <label for="inputEmail">Email address</label>
                                </div>
                                <div className="form-label-group">
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        className="form-control"
                                        value={password}
                                        onChange={handleChange(setPassword)}
                                    />
                                    <label for="inputPassword">Password</label>
                                </div>
                                <button
                                    className="btn btn-lg btn-primary btn-block"
                                    type="submit"
                                >
                                    {buttonText}
                                </button>
                                <Link
                                    to='/auth/password/forgot'
                                    style={{
                                        display: 'inline-block',
                                        margin: '18px 0 0 140px'
                                    }}
                                >
                                    Forgot password
                                </Link>
                                <hr className="my-4" />
                                <div 
                                    className="form-label-group"
                                    style= {{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <GoogleLoginButton history ={props.history} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;