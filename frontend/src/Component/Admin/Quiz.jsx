import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../Api'
import { AuthContext } from '../Context/AuthContext'
import {  useNavigate } from 'react-router-dom'

const Quiz = () => {
    const [Question, setQuestion] = useState([])
    const { state } = useContext(AuthContext)
    const route = useNavigate();

    useEffect(() => {
        async function get_Question() {
            try {
                const response = await api.get('/all_question')
                if (response.data.success) {
                    setQuestion(response?.data?.allquestion)
                } else {
                    toast.error(response.data.message)
                }
            }
            catch (error) {
                toast.error(error)
            }
        }
        get_Question();
    }, [])

    
    
    useEffect(() => {
        if (!state?.user?.name) {
            route("/login")
        }
    }, [state])
    return (
        <div>
            <h1>All Question</h1>
            {Question?.length ? (
                <div style={{width:'90%',margin:'auto',border:'1px solid gray',borderRadius:'10px'}}>
                    {Question.map((ques) => (
                        <div style={{ width: '80%', margin: 'auto',marginTop:'20px', marginBottom: '20px', border:'1px solid gray',borderRadius:'10px' }}>
                            <div>
                                <h1>Q :-{ques.question}</h1>
                            </div>
                           
                                <div style={{ width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin: 'auto' }}>
                                    <input type='radio' name='ans1' /><h2>Answer 1 :</h2><h3>{ques.ans1}</h3>
                                    <input type='radio' name='ans2' /><h2>Answer 2 :</h2><h4>{ques.ans2}</h4>
                                </div>
                                <div style={{ width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin: 'auto' }}>
                                    <input type='radio' name='ans3' /><h2>Answer 3 :</h2><h4>{ques.ans3}</h4>
                                    <input type='radio' name='ans4' /><h2>Answer 4 :</h2><h4>{ques.ans4}</h4>
                                </div>


                                {state?.user?.role == 'Admin' ? <><h2>Answer  :</h2><h4>{ques.finalans}</h4></> : <><input type='submit' value='submit' /></>}
                           


                        </div>))}
                </div>

            ) : null}
        </div>
    )
}

export default Quiz