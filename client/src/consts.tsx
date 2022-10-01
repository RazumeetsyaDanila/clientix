// для сервера api
// export const REACT_APP_API_URL: string = 'http://vps.razumeetsya.ru:5000/'

// для локального домашнего
export const REACT_APP_API_URL: string = 'http://192.168.1.107:5000/'

// для локального рабочего
// export const REACT_APP_API_URL: string = 'http://192.168.0.31:5000/'

// для сервера react-app
// export const REACT_APP_URL: string = 'http://vps.razumeetsya.ru:3000/'
// export const REACT_APP_URL: string = 'http://192.168.1.107:3000/'
export const REACT_APP_URL: string = 'http://localhost:3000/'

export enum routes{
    ADMIN_ROUTE = '/admin',
    SLAVE_ROUTE = '/slave',
    LOGIN_ROUTE = '/login',
    REGISTRATION_ROUTE = '/registration',
    USERS_ROUTE = '/users',
    ORG_ADD_ROUTE = '/org_add',
    TAGS_ROUTE = '/tags',
    TAGS_ADD_ROUTE = '/tag_add',
    ORG_ROUTE = '/org/:id'
}

export const correct_routes: string[] = ['admin', 'slave', 'login', 'users', 'registration', 'org_add', 'tags', 'tag_add', 'org']