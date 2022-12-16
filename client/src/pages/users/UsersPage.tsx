import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { Link, NavLink } from 'react-router-dom';
import { routes } from '../../consts';
import s from './usersPage.module.scss'
import { delete_user } from '../../http/usersAPI';
import ErrorModal from '../../components/UI/modal/Modal';
import backBtnImg from '../../img/previous.png'


const UsersPage = () => {
    const { users, loading, error } = useTypedSelector(state => state.users)
    const currentUserLogin = useTypedSelector(state => state.user.login)
    const { fetchUsers, unsetUser } = useActions()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('slave')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteUser, setDeleteUser] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const startDeleteUser = (lgn: string) => {
        setDeleteUser(lgn)
        setDeleteModal(true)
    }

    const userDelete = async (lgn: string) => {
        // await delete_user(lgn).then(data => alert(data.message))
        try {
            await delete_user(lgn)
            fetchUsers()
            setDeleteModal(false)
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }

    if (loading) {
        return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className={s.container}>
            <div className='select-none text-xl'>
                Пользователи:
            </div>           

            <table className='w-[400px] mt-[10px]'>
                <thead>
                    <tr>
                        <th>Логин</th>
                        <th>Роль</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => <tr key={u.login}>
                        <td className={s.tableTd} data-th="Логин">{u.login}</td>
                        <td className={s.tableTd} data-th="Роль">{u.role}</td>
                        <td className={s.tableTd} data-th="Удалить">
                            {
                                u.login !== 'admin' && u.login !== 'slave' && u.login !== currentUserLogin &&
                                <div onClick={startDeleteUser.bind(this, u.login)} className='hover:cursor-pointer hover:text-[#ff1919]'> Удалить </div>
                            }
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>

            <NavLink to='/registration'>
                <div className={s.tempLinkBtn}>
                    Добавить
                </div>
            </NavLink>

            <NavLink to='/admin' className='bigLeftBackBtnContainer'>
                <img src={backBtnImg} alt="" />
            </NavLink>

            <ErrorModal visible={deleteModal} setVisible={setDeleteModal}>
                <p className='mb-[10px]'>Удалить <span className='underline'>{deleteUser}</span>?</p>
                <div className='flex justify-between w-[150px]'>
                    <div className='btn w-[50px] cursor-pointer' onClick={() => userDelete(deleteUser)}>Да</div>
                    <div className='btn w-[50px] cursor-pointer' onClick={() => setDeleteModal(false)}>Нет</div>
                </div>
            </ErrorModal>
        </div>
    );
};

export default UsersPage;