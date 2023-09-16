import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from './../../Api/index.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext.jsx'
import '../Common/Register.css'

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const { state, Login } = useContext(AuthContext)
    const route = useNavigate()
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loginData.email && loginData.password) {
            try {
                const response = await api.post('/login', { loginData })
                if (response.data.success) {
                    const token = response.data.token;
                    const userData = response.data.userData;
                    await Login(userData, token)
                    setLoginData({ email: '', password: '' })
                    route('/')
                    toast.success(response.data.messge)
                } else {
                    toast.error(response.data.message)
                }

            } catch (error) {
                toast.error(error)
            }
        }
    }
    useEffect(() => {
        if (state?.user?.name) {
            route("/")
        }
    }, [state,route])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Login</h1>
                </div>
                <div>
                    <div className='fields'>
                        <label>Email</label><br />
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='fields'>
                        <label>Password</label><br />
                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                        />
                    </div>
                    <div id='btn'>
                        <input type='submit' value="Login" />
                    </div>
                    <p onClick={() => route('/register')}>New User</p>
                </div>
            </form>
        </div>
    )
}

export default Login