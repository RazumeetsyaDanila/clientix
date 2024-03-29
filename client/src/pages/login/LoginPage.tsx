import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { routes } from '../../consts';
import { loginf } from '../../http/userAPI';
import s from './loginPage.module.scss'
import stickYourFingerInMyAss from '../../sounds/stick-your-finger-in-my-ass.mp3';
import ohShitIamSorry from '../../sounds/oh-shit-iam-sorry.mp3';
import fistingIs300 from '../../sounds/fisting-is-300.mp3';
import Modal from '../../components/UI/modal/Modal';

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorModal, setErrorModal] = useState(false)
    const [errorText, setErrorText] = useState('')
    const { setUser } = useActions()

    const auth = async () => {
        try {
            let data: any
            data = await loginf(login, password)
            setUser(data.login, data.role)
            console.log(data)
            if (data.role === 'admin') navigate(routes.ADMIN_ROUTE)
            if (data.role === 'slave') {
                if (login === 'slave') loginSound()
                navigate(routes.SLAVE_ROUTE)
            }
        } catch (e: any) {
            setErrorText(e.response.data.message)
            setErrorModal(true)
            errorSound()
            // alert(e.response.data.message)
        }
    }

    const loginSound = () => {
        let audio = new Audio()
        audio.src = stickYourFingerInMyAss
        audio.autoplay = true
    }

    const errorSound = () => {
        let audio = new Audio()
        audio.src = ohShitIamSorry
        audio.autoplay = true
    }

    return (
        <div className={s.container}>
            <div className='mb-3 text-3xl'>Авторизация</div>
            <input className='authInput' type="text" placeholder="login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className='authInput' type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className='authButton' onClick={auth}>Войти</button>

            <Modal visible={errorModal} setVisible={setErrorModal}>
                <div className={s.errorContainer}>
                    <p className='w-[250px] text-center'>{errorText}</p>
                    <button onClick={() => setErrorModal(false)}>OK</button>
                </div>
            </Modal>
        </div>
    );
};

export default LoginPage;