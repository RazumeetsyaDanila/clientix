import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './adminPage.module.scss'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useClipboard } from 'use-clipboard-copy';
import CopiedText from './../../components/UI/copiedText/CopiedText';

const AdminPage = () => {

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const { isAuth } = useTypedSelector(state => state.user)
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

    
    if (!isAuth) return <div className='centerContainer h-screen'>
        <h1 className='text-[26px] mb-[10px]'>Время авторизации закончилось</h1>
        <NavLink to='/login' className='btn w-[420px] h-[40px]'>Вернуться на страницу авторизации</NavLink>
    </div>

    if (error) {
        return <h1>{error}<NavLink to='/login' className='btn w-[420px] h-[40px]'>Вернуться на страницу авторизации</NavLink></h1>
    }
    return (
        <div className={s.container}>

            <p className='text-[20px]'>Добро пожаловать, {currentUserLogin}!</p>
            <div className='headerContainer w-[600px]'>
                <NavLink to='/login' className='btn w-[90px] h-[30px]' onClick={logOut}>← Выйти</NavLink>
                <div className='flex justify-between w-[430px]'>
                    <NavLink className='linkBtn w-[200px]' to='/org_add'>Добавить организацию</NavLink>
                    <NavLink className='linkBtn w-[80px]' to='/tags'>Теги</NavLink>
                    <NavLink className='linkBtn w-[120px]' to='/users'>Пользователи</NavLink>
                </div>
            </div>

            <table className='w-[600px]'>
                <thead>
                    <tr>
                        <th className={s.tableTd + ' w-[300px]'}>Название организации</th>
                        <th className={s.tableTd + ' w-[300px]'}>Удаленный доступ</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(c => <tr key={c.org_id}>
                        <td className={s.tableTd + ' w-[300px]'} data-th="Название организации"> <NavLink to={'/org/' + c.org_id}>{c.org_name}</NavLink></td>
                        <td className={s.tableTd + ' w-[300px]'} data-th="Удаленный доступ">{c.remote_access}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            <NavLink to='/files/cert_export_CA.sokolmed.itl-service.ru.p12' target="_blank" download> скачать сертификат соколмед</NavLink>
            <NavLink to='/files/cert_export_CA.sokolmed.itl-service.ru.p12' target="_blank"> скачать сертификат соколмед</NavLink>
            <p>test</p>



        </div>
    );
};

export default AdminPage;