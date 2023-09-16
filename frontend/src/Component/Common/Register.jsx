import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import '../Common/Register.css'
import api from '../../Api';
import { AuthContext } from '../Context/AuthContext';

const Register = () => {
    const [regData, setRegData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'User' })
    const route = useNavigate()
    const {state}=useContext(AuthContext)

    const handleChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (regData.name && regData.email && regData.password && regData.confirmPassword && regData.role) {
            if (regData.password === regData.confirmPassword) {
                try {
                    const response = await api.post('/register', { regData })
                    if (response.data.success) {
                        setRegData({ name: '', email: '', password: '', confirmPassword: '', role: 'User' })
                        route('/login')
                        toast.success(response.data.message)
                    }
                    else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                toast.error('Password Does Not Match...')
            }
        } else {
            toast.error('All Fileds Are Required')
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
                    <h1>Register</h1>
                </div>
                <div>
                    <div className='fields'>
                        <label>Name</label><br />
                        <input
                            type='text'
                            name='name'
                            onChange={handleChange}
                            // placeholder='Enter Name'
                        />
                    </div>
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
                    <div className='fields'>
                        <label>Confirm Password</label><br />
                        <input
                            type='password'
                            name='confirmPassword'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='fields'>
                        <select name='role' onChange={handleChange}>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div id='btn'>
                        <input type='submit' value="Register" />
                    </div>
                    <p onClick={()=>route('/login')}>Alredy Have An Account?</p>
                </div>
            </form>
        </div>
    )
}

export default Register