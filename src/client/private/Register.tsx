import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { SetAccessToken, json, User } from '../utils/api';
import { Redirect } from 'react-router';


export interface IRegisterProps extends RouteComponentProps { }


const Register: React.SFC<IRegisterProps> = (props) => {

    // Safely typed
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // When submitted console log info to see if it passes info correctly
    // e: { preventDefault: () => void; }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ username, email })
        if (username && email && password ) {
            let data = {
                username,email,password
            };

            e.preventDefault();
            try {
                await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            } catch (e) {
                console.log(e);
            }
            props.history.push('/message')
        }
    }


   
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }


    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    // Component did mount 
    const getUser = async () => {
        if (User && User.role === 'admin') {
            props.history.push('/message')
        }

    }

    useEffect(() => {
        getUser();
    }, [])

    const getForm = async () => {
        try {
            let result = await json('/auth/register', 'POST', {
                username,
                email,
                password
            });
            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                if (result.role === 'admin') {
                    <Redirect to='/message' />
                } else {
                    <Redirect to="/register" />
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    // const clickLogo = (e) => {
    //     props.history.push('/')
    // }

    useEffect(() => {
        getForm()
    }, [])

    return (
        <div
        className="sunrise" 
        style={{ width: '100%', height: '100vh' }}>
            <h1 
            // onClick={clickLogo}
            className="text-dark"
            style={{ color: '#659999', fontFamily: 'Baloo Bhai', font: 'cursive', fontSize: '70px' }}>SAFEHAVEN</h1>
            <h5 className="float-right text-dark" style={{ color: '#f4791f', fontFamily: 'Baloo Bhai', fontSize: '25px' }}>A Safe Space to Discuss Agriculture</h5>
            <div style={{ height: '10%' }}>
                <img
                    style={{ width: '100%' }}
                    src="https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    alt="sunset"
                />
            </div>
            <div className="container border border-success"
                style={{ width: '700', marginTop: '20em' }}>
                <div className="m-2 d-flex justify-content-center">

                    <div>
                        <h2 style={{ color: '#659999', fontFamily: 'Baloo Bhai', fontSize: '50px' }}
                            className="d-flex justify-content-center text-dark">REGISTER</h2>
                        <div>
                            <form className="form-group border border-success rounded  p-2 font-weight-bold mb-5 bg-warning text-dark "
                                // style={{ backgroundColor: '#659999' }}
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className="text-dark"
                                    style={{
                                        justifyContent: 'center',
                                        background: 'none',
                                        fontFamily: 'Baloo Bhai',
                                        color: 'inherit',
                                        outline: 'none',
                                        border: 'none',
                                    }}
                                    type="text"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                                <input
                                    className="text-dark"
                                    style={{
                                        justifyContent: 'center',
                                        background: 'none',
                                        fontFamily: 'Baloo Bhai',
                                        color: 'inherit',
                                        outline: 'none',
                                        border: 'none',
                                    }}
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                <input
                                    style={{
                                        justifyContent: 'center',
                                        background: 'none',
                                        fontFamily: 'Baloo Bhai',
                                        color: 'inherit',
                                        outline: 'none',
                                        border: 'none',
                                    }}
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </form>
                            <div className="d-flex justify-content-center text-dark">
                                <button className=" btn btn-warning m-1 ">Join The Convo</button>
                                {/* Dont need onClick={handleSubmit} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Register