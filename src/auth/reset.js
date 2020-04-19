import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reset = function (props) {

    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Change password');

    const handleChange = cb => e => cb(e.target.value);

    const position = {
        position: toast.POSITION.BOTTOM_RIGHT
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonText('Please wait...')
        try {
            await axios.put(
                `${process.env.REACT_APP_URL}/reset-password`,
                {
                    resetToken: props.match.params.token, 
                    newpassword: password
                }
            )
            toast.success('You can now sign in with your new password', position)
            props.history.push('/signin');
        } catch (err) {
            toast.error(`error : ${err.response.data.errors[0].msg
                }`, position)
        }
        setButtonText('Change password')
    }

    return (
        <form className='update-form'>
            <h4 style={{
                textAlign: 'center',
                marginBottom: 40
            }}>
                Enter your new password
            </h4>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-3 col-form-label">
                    New password
                </label>
                <div className="col-sm-6">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange(setPassword)}
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

export default Reset;