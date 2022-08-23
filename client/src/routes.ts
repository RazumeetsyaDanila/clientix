import React from 'react';
import {routes} from './consts'
import AdminPage from './pages/admin/AdminPage'
import RegistrationPage from './pages/registration/RegistrationPage';
import SlavePage from './pages/slave/SlavePage';
import LoginPage from './pages/login/LoginPage';
import UsersPage from './pages/users/UsersPage';
import OrgAddPage from './pages/orgAdd/OrgAddPage';

interface IRoutes{
    path: string,
    Component: React.FC
}

export const adminRoutes: IRoutes[] = [
    {
        path: routes.ADMIN_ROUTE,
        Component: AdminPage 
    },
    {
        path: routes.REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
    {
        path: routes.USERS_ROUTE,
        Component: UsersPage
    },
    {
        path: routes.ORG_ADD_ROUTE,
        Component: OrgAddPage
    }
]

export const slaveRoutes: IRoutes[] = [
    {
        path: routes.SLAVE_ROUTE,
        Component: SlavePage 
    },
    {
        path: routes.ORG_ADD_ROUTE,
        Component: OrgAddPage
    }
]

export const publicRoutes: IRoutes[] = [
    {
        path: routes.LOGIN_ROUTE,
        Component: LoginPage
    }
]