import { useState} from 'react';
import s from './registrationPage.module.scss'
import { useNavigate, NavLink } from 'react-router-dom';
import { routes } from '../../consts';
import { registration } from '../../http/userAPI';

const RegistrationPage = () => {
    const navigate = useNavigate()    
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('slave')

    const reg = async () => {
        try {
            await registration(login, password, role)
            navigate(routes.USERS_ROUTE)
        } catch (e: any) {
            // setErrorText(e.response.data.message)
            // setErrorModal(true)
            // errorSound()
            alert(e.response.data.message)
        }
    }

    return (
        <div className='centerContainer h-screen'>
            <p className='mb-[10px] text-2xl'>Добавление пользователя</p>
            <input className='authInput' type="text" placeholder="login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className='authInput' type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className='authButton' onClick={reg} >Добавить</button>

            <NavLink to='/users' className='btn w-[124px] h-[30px] backBtnPos'>
                ← back to users
            </NavLink>
        </div>
    );
};

export default RegistrationPage;