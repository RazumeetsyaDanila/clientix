import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './adminPage.module.scss'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AdminPage = () => {
    return (
        <div className={s.container}>
            <div>
                ADMIN PAGE
                <NavLink to='/users'>
                    <div className={s.tempLinkBtn}>
                        Users
                    </div>
                </NavLink>
            </div>

            <table>
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
                    <tr>
                        <td className={s.td1}>Меркуримед</td>
                        <td className={s.tableTd}>123123123</td>
                        <td className={s.tableTd}>skdjbcksjdbck sdkh cksjd skjdh cksjdh</td>
                        <td className={s.tableTd}>Q12werty</td>
                        <td className={s.tableTd}>7776</td>
                        <td className={s.tableTd}>* * *</td>
                    </tr>
                </tbody>
            </table>

            <NavLink to='/login' className='btn w-[124px] h-[30px] backBtnPos'>
                ← back to login
            </NavLink>
        </div>
    );
};

export default AdminPage;