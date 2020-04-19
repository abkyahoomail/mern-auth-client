import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie } from '../auth/helpers';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Forgot = function () {

    const [email, setEmail] = useState('');
    const [buttonText, setButtonText] = useState('Generate reset password link');

    const handleChange = cb => e => cb(e.target.value);

    const position = {
        position: toast.POSITION.BOTTOM_RIGHT
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonText('Please wait...')
        try {
            await axios.put(
                `${process.env.REACT_APP_URL}/forgot-password`,
                {
                    email
                }
            )
            toast.success('Password rest link sent to registered mail Id', position)
        } catch (err) {
            toast.error(`error : ${err.response.data.errors[0].msg
                }`, position)
        }
        setButtonText('Generate reset password link')
    }

    return (
        <form className='update-form'>
            <h4 style={{
                textAlign: 'center',
                marginBottom: 40
            }}>
                Enter valid email to reset your password
            </h4>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                    Email
                </label>
                <div className="col-sm-8">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="User email"
                        value={email}
                        onChange={handleChange(setEmail)}
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10 update-btn">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Forgot;