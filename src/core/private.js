import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie } from '../auth/helpers';
import { toast } from 'react-toastify';

const Private = function () {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Update profile');

    const handleChange = cb => e => cb(e.target.value)

    let checkAuth = isAuth();
    if (checkAuth) {
        checkAuth = JSON.parse(checkAuth)
    }

    const position = {
        position: toast.POSITION.BOTTOM_RIGHT
    }

    async function fetchData() {
        try {
            const userId = checkAuth.id;
            const token = getCookie('token');
            const response = await axios.get(
                `${process.env.REACT_APP_URL}/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = response.data;
            const {
                email,
                name,
                role
            } = data;
            setEmail(email);
            setRole(role)
            setName(name)
        } catch (err) {
            toast.error(`error while fetching: ${err.response.statusText}`, position)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonText('Updating profile...')
        try {
            const token = getCookie('token');
            await axios.put(
                `${process.env.REACT_APP_URL}/user/update`,
                {
                    name,
                    password
                },
                {                     
                    headers: {
                        Authorization: `Bearer ${token}`
                    },                    
                }
            )
            toast.success('successfully updated user profile', position)
        } catch (err) {
            toast.error(`error while updating: ${err.response.data.errors[0].msg
            }`, position)
        }
        setButtonText('Update profile')
    }

    return (
        <form className='update-form'>
            <h2 style={{ textAlign: 'center' }}>Private</h2>
            <h4 style={{ textAlign: 'center' }}>Profile update</h4>
            <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-8">
                    <input
                        readOnly
                        type="text"
                        className="form-control-plaintext"
                        id="staticEmail"
                        value={email}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="staticRole" className="col-sm-2 col-form-label">Role</label>
                <div className="col-sm-8">
                    <input
                        readOnly
                        type="text"
                        className="form-control-plaintext"
                        id="staticRole"
                        value={role}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="User name"
                        value={name}
                        onChange={handleChange(setName)}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-8">
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
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

export default Private;