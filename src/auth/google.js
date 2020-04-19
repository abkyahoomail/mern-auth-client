import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authenticate, isAuth } from './helpers';

const GoogleLoginButton = function ({ history }) {

    const [signedIn, setSignedIn] = useState(false);

    const position = {
        position: toast.POSITION.BOTTOM_RIGHT
    }

    const responseGoogle = async (response) => {
        console.log(response);
        try {
            const request = await axios.post(
                `${process.env.REACT_APP_URL}/google-login`,
                {
                    googleTokenId: response.tokenId
                }
            );
            authenticate(request, () => {
                toast.success('successful signin', position)
            })
            setSignedIn(true)
        } catch (err) {
            setSignedIn(false)
            toast.error(`google login error : ${err.response.data.errors[0].msg
                }`, position)
        }
    }

    if (signedIn) {
        let checkAuthUser = isAuth()
        if (checkAuthUser) {
            checkAuthUser = JSON.parse(checkAuthUser);
            if (checkAuthUser.role === 'admin') {
                history.push('/admin')
            } else {
                history.push('/protected')
            }
            return null;
        }
    }


    return (
        <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleLoginButton;