import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../Api'
import { useNavigate } from 'react-router-dom'
import '../Common/Register.css'

const Add_question = () => {
    const [questionData, setQuestionData] = useState({ question: '', ans1: '', ans2: '', ans3: '', ans4: '', finalans: '' })
    const route = useNavigate();

    const handleChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (questionData.question && questionData.ans1 && questionData.ans2 && questionData.ans3 && questionData.ans4 && questionData.finalans) {
            try {
                const token = JSON.parse(localStorage.getItem('UserToken'))
                const response = await api.post('/add_question', { questionData, token })
                if (response.data.success) {
                    setQuestionData({ question: '', ans1: '', ans2: '', ans3: '', ans4: '', finalans: '' })
                    toast.success(response.data.message)
                    route('/quiz')
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error(error)
            }
        } else {
            toast.error('All Fields are Required')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>ADD Question</h1>
                </div>
                <div>
                    <div className='fields'>
                        <label>Question</label><br />
                        <input
                            type='text'
                            name='question'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='fields'>
                        <label>Answer 1</label><br />
                        <input
                            type='text'
                            name='ans1'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='fields'>
                        <label>Answer 2</label><br />
                        <input
                            type='text'
                            name='ans2'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='fields'>
                        <label>Answer 3</label><br />
                        <input
                            type='text'
                            name='ans3'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='fields'>
                        <label>Answer 4</label><br />
                        <input
                            type='text'
                            name='ans4'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='fields'>
                        <label>Final Answer</label><br />
                        <input
                            type='text'
                            name='finalans'
                            onChange={handleChange}
                        />
                    </div>

                    <div id='btn'>
                        <input type='submit' value="Add" />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Add_question