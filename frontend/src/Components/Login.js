import { useState } from 'react';

const Login = () => {

    const [userCreds, setUserCreds] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        let user = userCreds;
        const response = await fetch(
            'http://localhost:5050/users/login',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.reload();
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
                <label>Password</label>
                <input 
                    type='password'
                    className='form-control'
                    name='password' 
                    value={userCreds.password}
                    onChange={e=>handleChange(e)}
                ></input>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    )
}

export default Login;