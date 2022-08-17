import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { Link, NavLink } from 'react-router-dom';
import { routes } from '../../consts';
import s from './usersPage.module.scss'

const UsersPage = () => {
    const { users, loading, error } = useTypedSelector(state => state.users)
    const currentUserLogin = useTypedSelector(state => state.user.login)
    const { fetchUsers, unsetUser } = useActions()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('slave')

    useEffect(() => {
        fetchUsers()
    }, [])

    const userDelete = async (lgn: string) => {
        await delete_user(lgn).then(data => alert(data.message))
        try {
            // await delete_user(lgn)
            fetchUsers()
        } catch (e: any) {
            alert(e.response.data.message)
        }

    }

    console.log(users)

    return (
        <div className={s.container}>
            USERS PAGE
            <NavLink to='/registration'>
                <div className={s.tempLinkBtn}>
                    Registration
                </div>
            </NavLink>

            <table>
                <thead>
                    <tr>
                        <th>Логин</th>
                        <th>Роль</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => <tr key={u.login}>
                        <td data-th="Логин">{u.login}</td>
                        <td data-th="Роль">{u.role}</td>
                        <td data-th="Удалить">
                            {
                                u.login !== 'admin' && u.login !== currentUserLogin &&
                                <div onClick={userDelete.bind(this, u.login)} > Удалить </div>
                            }</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;