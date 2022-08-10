import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { routes } from '../../consts';
import { loginf, registration } from '../../http/userAPI';

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('slave')
    const { setUser } = useActions()

    const auth = async () => {
        try {
            let data: any
            data = await loginf(login, password)
            setUser(data.login, data.role)
            console.log(data)
            if (data.role === 'admin') navigate(routes.ADMIN_ROUTE)
            if (data.role === 'slave') navigate(routes.SLAVE_ROUTE)
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <input type="text" placeholder="login" value={login} onChange={e => setLogin(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={auth}>Войти</button>
        </div>
    );
};

export default LoginPage;