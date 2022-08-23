import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './adminPage.module.scss'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AdminPage = () => {

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const { unsetUser, fetchClients } = useActions()

    const logOut = () => {
        unsetUser()
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <div className={s.container}>
            <div>
                ADMIN PAGE
                <NavLink to='/users'>
                    <div className={s.tempLinkBtn + ' usersBtnPos'}>
                        Users
                    </div>
                </NavLink>
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
                        <td className={s.tableTd + ' w-[150px]'} data-th="AnyDesk">{c.anydesk}</td>
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

            <NavLink to='/login' className='btn w-[124px] h-[30px] backBtnPos' onClick={logOut}>
                ← back to login
            </NavLink>
        </div>
    );
};

export default AdminPage;