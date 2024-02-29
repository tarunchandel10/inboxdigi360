import { useState, useEffect } from 'react';
import LoginCss from '../styles/login.module.css'
import Image from 'next/image';
import { login } from '../pages/api/loginApi';
import { saveUserData, redirectToDashboard } from '@/common/commonFunction'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successfulMsg, setsuccessfulMsg] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/advertiser/dashboard';
        }
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            saveUserData(data);
            redirectToDashboard(data.data.user_detail.user_type);
            setsuccessfulMsg("Login successful");
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Login failed");
        }
    };


    return (
        <>
            <div className={`${LoginCss.login_page}`}>
                <div className={`${LoginCss.login_box}`}>
                    <div className={`${LoginCss.login_hdng}`}>
                        <Image
                            src="/images/ad-logo.png"
                            width={128}
                            height={79}
                            alt="Logo"
                            style={{ width: "128px", height: "79px" }}
                        />
                        <h2>Sign in</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className={`${LoginCss.form_group}`}>
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className={`${LoginCss.form_group}`}>
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className={`${LoginCss.form_check}`}>
                            <input type="checkbox" className="form-check-input" id="save" />
                            <label htmlFor="save" className="cr"> Save Credentials</label>
                        </div>
                        <div className={`${LoginCss.form_btn}`}>
                            <button type="submit">Sign In</button>
                        </div>
                        {successfulMsg ? <p className='text-success mb-0'>{successfulMsg}</p> : ""}
                        {errorMessage ? <p className='text-danger mb-0'>{errorMessage}</p> : ""}
                    </form>
                </div>
            </div>

        </>
    )
}
