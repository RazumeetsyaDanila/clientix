import React from 'react';
import {routes} from './consts'
import AdminPage from './pages/admin/AdminPage'
import RegistrationPage from './pages/registration/RegistrationPage';
import SlavePage from './pages/slave/SlavePage';
import LoginPage from './pages/login/LoginPage';
import UsersPage from './pages/users/UsersPage';
import OrgAddPage from './pages/orgAdd/OrgAddPage';
import TagsPage from './pages/tags/TagsPage';
import TagAddPage from './pages/tagAdd/TagAddPage';
import OrgPage from './pages/org/OrgPage';
import Reauth from './pages/reauth/Reauth';

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
    },
    {
        path: routes.TAGS_ROUTE,
        Component: TagsPage
    },
    {
        path: routes.TAGS_ADD_ROUTE,
        Component: TagAddPage
    },
    {
        path: routes.ORG_ROUTE,
        Component: OrgPage
    },
]

export const slaveRoutes: IRoutes[] = [
    {
        path: routes.SLAVE_ROUTE,
        Component: SlavePage 
    },
    {
        path: routes.ORG_ADD_ROUTE,
        Component: OrgAddPage
    },
    {
        path: routes.TAGS_ROUTE,
        Component: TagsPage
    }
]

export const publicRoutes: IRoutes[] = [
    {
        path: routes.LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: routes.REAUTH_ROUTE,
        Component: Reauth
    }
]