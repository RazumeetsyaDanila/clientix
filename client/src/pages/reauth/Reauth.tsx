import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Reauth = () => {
    const { isAuth, role } = useTypedSelector(state => state.user)

    return (
        <div className='centerContainer h-screen'>
            <h1 className='text-[26px] mb-[10px]'>Время авторизации закончилось</h1>
            <NavLink to='/login' className='btn w-[420px] h-[40px]'>Вернуться на страницу авторизации</NavLink>
        </div>
    );
};

export default Reauth;