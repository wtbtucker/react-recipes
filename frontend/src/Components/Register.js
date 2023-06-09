import { useState } from 'react';
import { postData } from '../helpers';

const Register = () => {

    const [userCreds, setUserCreds] = useState({
        username: '',
        email: '',
        password: '',
        confirm: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        let user = userCreds;
        postData('http://localhost:5050/users/', user)
    }

    const handleChange = event => {
        setUserCreds(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='form-label'>Username</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name='username' 
                    value={userCreds.username}
                    onChange={e=>handleChange(e)}
                ></input>
            </div>
            <div className='form-group'>
                <label className='form-label'>Email</label>
                <input 
                    type='text' 
                    className='form-control' 
                    name='email' 
                    value={userCreds.email}
                    onChange={e=>handleChange(e)}
                ></input>
            </div>
            <div className='form-group'>
                <label className='form-label'>Password</label>
                <input 
                    type='password'
                    className='form-control'
                    name='password' 
                    value={userCreds.password}
                    onChange={e=>handleChange(e)}
                ></input>
            </div>
            <div className='form-group'>
                <label className='form-label'>Confirm Password</label>
                <input 
                    type='password'
                    className='form-control'
                    name='confirm' 
                    value={userCreds.confirm}
                    onChange={e=>handleChange(e)}
                ></input>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    )
}

export default Register;