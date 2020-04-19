import React from 'react'
import { Link } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';


const Layout = function (props) {

    const active = path => props.location.pathname === path ? { background: 'black' } : {}


    let checkAuth = isAuth();
    if (checkAuth) {
        checkAuth = JSON.parse(checkAuth)
    }

    const handleSignout = () => signout(() => props.history.push('/signin'))

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link
                        to='/'
                        className='nav-item nav-link home'
                        style={active('/')}
                    >
                        Home
                    </Link>
                    {
                        checkAuth && (
                            <Link
                                to={checkAuth.role === "admin" ? '/admin' : '/protected'}
                                className='nav-item nav-link home'
                                style={checkAuth.role === "admin" ? active('/admin') : active('/protected')}
                            >
                                Welcome {checkAuth.name}
                            </Link>
                        )
                    }
                    {
                        !checkAuth ? (
                            <div className='link-container'>
                                <Link
                                    to='/signin'
                                    className='nav-item nav-link'
                                >
                                    <button className="btn btn-sm btn-outline-success" type="button">Signin</button>
                                </Link>
                                <Link
                                    to='/signup'
                                    className='nav-item nav-link'
                                >
                                    <button className="btn btn-sm btn-outline-success" type="button">Signup</button>
                                </Link>
                            </div>
                        ) : (
                                <div className='link-container'>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        type="button"
                                        onClick={handleSignout}
                                    >
                                        Signout
                                    </button>
                                </div>
                            )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Layout;