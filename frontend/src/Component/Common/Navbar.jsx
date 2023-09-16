import React, { useContext } from 'react'
import '../Common/Navbar.css'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { state, Logout } = useContext(AuthContext)
    const route = useNavigate();

    const logout = () => {
        Logout()
        route('/')
    }
    return (
        <div>
            <div id='navbar'>
                <div id='inner_nav'>
                    <div id='logo'>
                        <h1>Quiz</h1>
                    </div>
                    <div id='profile'>

                        <span>
                            <h4 onClick={() => route('/quiz')}>Show Question</h4>
                            {state?.user?.role == 'Admin' && <h4 onClick={() => route('/add_question')}>Add Question</h4>}
                            {!state?.user?.name ? <p onClick={() => route('/login')}>SignUP/SignIn</p> : <h4>{state?.user?.name}</h4>}
                            {state?.user?.name && <p onClick={logout}>Logout</p>}
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar