import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Sign up');

    const position = {
        position: toast.POSITION.BOTTOM_RIGHT
    }

    const handleChange = cb => e => cb(e.target.value)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonText('Signing Up...')
        try {
            await axios.post(
                `${process.env.REACT_APP_URL}/signup`,
                {
                    name,
                    email,
                    password
                }
            )

            toast.success('successful signup', position)
            setName('')
            setEmail('')
            setPassword('')
            setButtonText('Sign up')
        } catch (err) {
            toast.error(`error while signing up: ${err}`, position)
            setName('')
            setEmail('')
            setPassword('')
            setButtonText('Sign up')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                        <div className="card-img-left d-none d-md-flex">
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign Up</h5>
                            <form className="form-signin" onSubmit={handleSubmit}>
                                <div className="form-label-group">
                                    <input
                                        type="text"
                                        id="inputUserame"
                                        value={name}
                                        className="form-control"
                                        placeholder="Name"
                                        onChange={handleChange(setName)}
                                    />
                                    <label for="inputUserame">Name</label>
                                </div>

                                <div class="form-label-group">
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        value={email}
                                        className="form-control"
                                        placeholder="Email address"
                                        onChange={handleChange(setEmail)}
                                    />
                                    <label for="inputEmail">Email address</label>
                                </div>
                                <div class="form-label-group">
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        className="form-control"
                                        value={password}
                                        placeholder="Password"
                                        onChange={handleChange(setPassword)}
                                    />
                                    <label for="inputPassword">Password</label>
                                </div>
                                <br />
                                <button
                                    class="btn btn-lg btn-primary btn-block"
                                    type="submit"
                                >{buttonText}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;