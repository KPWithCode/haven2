import React from 'react'
import { Link } from 'react-router-dom'



const Home = () => {



    return (
        <div style={{ height: '100vh', width: '100vw', fontFamily: 'Baloo Bhai' }}>
            <img src="https://images.unsplash.com/photo-1444689815864-5dc37c1bdb9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
                alt="orange sky"
                style={{ width: '100%', height: '100%', position: 'absolute', }}
            />
            <div className="container d-flex justify-content-center" style={{ position: 'relative' }}>
                <div className="jumbotron d-flex justify-content-center text-dark text-center sunrise">
                    <h1 style={{ fontSize: '70px' }}>WELCOME TO SAFE HAVEN</h1>
                </div>
            </div>
            <h2 className="text-dark text-center"
                style={{ width: '100%', position: 'absolute', marginTop: '25%', fontSize: '70px' }}>
                <Link
                    style={{ textDecorationLine: 'none', fontFamily: 'Baloo Bhai' }}
                    className="text-dark text-center" to="/Register">CHAT NOW</Link>
            </h2>
        </div>
    )
}

export default Home