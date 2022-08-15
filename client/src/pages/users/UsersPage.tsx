import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { Link } from 'react-router-dom';
import { routes } from '../../consts';

const UsersPage = () => {
    const { users, loading, error } = useTypedSelector(state => state.users)
    const currentUserLogin = useTypedSelector(state => state.user.login)
    // const { fetchUsers, unsetUser } = useActions()

    return (
        <div>
            USERS PAGE
        </div>
    );
};

export default UsersPage;