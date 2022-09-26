import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './adminPage.module.scss'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useClipboard } from 'use-clipboard-copy';
import CopiedText from './../../components/UI/copiedText/CopiedText';

const AdminPage = () => {

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const currentUserLogin = useTypedSelector(state => state.user.login)
    const { unsetUser, fetchClients,fetchTags } = useActions()
    const clipboard = useClipboard()

    const logOut = () => {
        unsetUser()
    }

    const copy = (text: string, targetSetState: any) => {
        clipboard.copy(text)
        targetSetState(true)
        setTimeout(() => { targetSetState(false) }, 1000)
    }

    useEffect(() => {
        fetchClients()
        fetchTags()
    }, [])

    if (loading) {
        return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }
    return (
        <div className={s.container}>

            <p className='text-[20px]'>Добро пожаловать, {currentUserLogin}!</p>
            <div className='headerContainer w-[75vw]'>
                <NavLink to='/login' className='btn w-[90px] h-[30px]' onClick={logOut}>← Выйти</NavLink>
                <div className='flex justify-between w-[430px]'>
                    <NavLink className='linkBtn w-[200px]' to='/org_add'>Добавить организацию</NavLink>
                    <NavLink className='linkBtn w-[80px]' to='/tags'>Теги</NavLink>
                    <NavLink className='linkBtn w-[120px]' to='/users'>Пользователи</NavLink>
                </div>
            </div>

            <table className='w-[75vw]'>
                <thead>
                    <tr>
                        <th>Название организации</th>
                        <th>AnyDesk</th>
                        <th>RDP</th>
                        <th>Пароль sa</th>
                        <th>Пароль в Симеде</th>
                        <th>Кнопки управления</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(c => <tr key={c.org_id}>
                        <td className={s.tableTd + ' w-[280px]'} data-th="Название организации">{c.org_name}</td>
                        <td className={s.tableTd + ' w-[150px]'} data-th="AnyDesk" ><CopiedText text={c.anydesk}/></td>
                        <td className={s.tableTd} data-th="RDP">{c.rdp}</td>
                        <td className={s.tableTd + ' w-[180px]'} data-th="Пароль sa">{c.sa_password}</td>
                        <td className={s.tableTd + ' w-[180px]'} data-th="Пароль в Симеде">{c.simed_admin_pass}</td>
                        <td className={s.tableTd + ' w-[180px]'} data-th="Удалить">
                            {/* {
                                u.login !== 'admin' && u.login !== 'slave' && u.login !== currentUserLogin &&
                                <div onClick={startDeleteUser.bind(this, u.login)} className='hover:cursor-pointer hover:text-[#ff1919]'> Удалить </div>
                            } */}
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>




        </div>
    );
};

export default AdminPage;