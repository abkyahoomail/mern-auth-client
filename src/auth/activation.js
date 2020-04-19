import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';

function Activation(props) {

    const [button, setButton] = useState('Activate')

    const token = props.match.params.token || '';

    const { name, email } = JSON.parse(atob(token.split('.')[1]));

    const position = {
        position: toast.POSITION.BOTTOM_RIGHT
    }

    const handleActivation =async (e) => {
        e.preventDefault();
        setButton('Activating...')
        try {
            await axios.post(
                `${process.env.REACT_APP_URL}/activate`,
                {
                   token
                }
            )
            toast.success('Activation successful', position)     
            props.history.push('/signin');      
        } catch (err) {
            toast.error(`Activation failed: ${err}`, position)
            setButton('Activate')
        }
    }

    return (
        <div className='activation'>
            <div className="card">
                <h5 className="card-header">Account activation for {email}</h5>
                <div className="card-body">
                    <h5 className="card-title">Hey {name}</h5>
                    <p className="card-text">Click on the button below to activate your account</p>
                    <button 
                        className="btn btn-primary" 
                        type="submit"
                        onClick ={handleActivation}
                    >{button}</button>
                </div>
            </div>
        </div>
    )
}

export default Activation;