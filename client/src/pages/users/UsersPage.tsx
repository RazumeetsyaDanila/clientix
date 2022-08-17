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

    return (
        <div className={s.container}>
            USERS PAGE
            <NavLink to='/registration'>
                <div className={s.tempLinkBtn}>
                    Registration
                </div>
            </NavLink>
        </div>
    );
};

export default UsersPage;