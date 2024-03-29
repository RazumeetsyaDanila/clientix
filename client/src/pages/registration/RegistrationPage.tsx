import { useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { routes } from '../../consts';
import { registration } from '../../http/userAPI';
import backBtnImg from '../../img/previous.png'

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
            alert(e.response.data.message)
        }
    }

    return (
        <div className='centerContainer h-screen'>
            <p className='mb-[10px] text-2xl'>Добавление пользователя</p>
            <input className='authInput' type="text" placeholder="login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className='authInput' type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className='authButton' onClick={reg} >Добавить</button>

            <NavLink to='/users' className='bigLeftBackBtnContainer'>
                <img src={backBtnImg} alt="" />
            </NavLink>
        </div>
    );
};

export default RegistrationPage;