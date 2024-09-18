import { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localStorage.getItem('username')) {
            localStorage.setItem('username', username);
            socket.emit('newUser', { username, socketID: socket.id });
            navigate('/chat');
        }
        else {
            alert('You have alreay Signed in');
        }
    }
    
    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign in to open the Chat</h2>
            <label htmlFor='username'>Username</label>
            <input 
                type="text" 
                minLength={6} 
                name='username' 
                id='username' 
                className='username__input' 
                value={username} onChange={(e) => setUsername(e.target.value)} 
            />
            <button className='home__cta' >SIGN IN</button>
        </form>
    );
}

export default Home;