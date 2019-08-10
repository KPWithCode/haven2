import React, { useState, useEffect } from 'react';
import { json, SetAccessToken, User } from '../utils/api';
import { Redirect, RouteComponentProps } from 'react-router';

export interface ILoginProps extends RouteComponentProps {}

const Login = (props:ILoginProps) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('')
    const [loginStatus, setLoginStatus] = useState<boolean>(false)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    // Component did mount 
    const getUser = async () => {
        if (User && User.role === 'guest') {
            props.history.push('/message')
        }

    }
    useEffect(() => {
        getUser();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email });
        if (loginStatus) return;

        try {
            setLoginStatus(true)
            let result = await json('/auth/login', 'POST', {
                email, password
            })
            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                if (result.role === 'guest') {
                    props.history.push('/message')
                } else {
                    props.history.push('/');
                }
            } else {
                setLoginStatus(loginStatus)
            }
        } catch (e) {
            setLoginStatus(false)
            throw e;
        } finally {
            setLoginStatus(false)
        }
    }




    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <h1 className="" style={{ color: '#659999', fontFamily: 'Baloo Bhai', font: 'cursive', fontSize: '70px' }}>SAFEHAVEN</h1>
            <h5 className="float-right" style={{ color: '#f4791f', fontFamily: 'Baloo Bhai', fontSize: '25px' }}>A Safe Space to Discuss Agriculture</h5>
            <div style={{ height: '10%' }}>
                <img
                    style={{ width: '100%' }}
                    src="https://images.unsplash.com/photo-1535048637252-3a8c40fa2172?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1790&q=80"
                    alt="Farm trucks on open field"
                />
            </div>
            <div className="container"
                style={{ backgroundColor: '#f4791f', width: '700', marginTop: '20em',position:'relative' }}>
                <div className=" d-flex justify-content-center">
                    <div>
                        <h2 style={{ color: '#659999', fontFamily: 'Baloo Bhai', fontSize: '50px' }}
                            className="d-flex justify-content-center">LOGIN</h2>
                        <div>

                            <form
                                onSubmit={e => handleSubmit(e)}
                                className="rounded p-3 shadow-lg">
                                <input
                                    value={email}
                                    type="email"
                                    placeholder="Email"
                                    required
                                    onChange={handleEmailChange}
                                />
                                <input
                                    className="text-dark  ml-3"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                                <input
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={handlePasswordChange}
                                />
                                <button className="btn btn-primary btn-block shadow">Login</button>
                            </form>
                            {/* <div className="d-flex justify-content-center">
                                <button style={{ backgroundColor: '#f4791f' }} className=" btn btn-warning m-1 ">Join The Convo</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Login;