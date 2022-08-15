import React from 'react';
import s from './adminPage.module.scss'

const AdminPage = () => {
    return (
        <div className={s.container}>
            <div>
                ADMIN PAGE
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
                        <td>123123123</td>
                        <td>skdjbcksjdbck sdkh cksjd skjdh cksjdh</td>
                        <td>Q12werty</td>
                        <td>7776</td>
                        <td>* * *</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;