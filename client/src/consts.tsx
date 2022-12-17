// для сервера api
// export const REACT_APP_API_URL: string = 'http://vps.razumeetsya.ru:5000/'

// для локального домашнего
export const REACT_APP_API_URL: string = 'http://192.168.1.107:5000/'

// для локального рабочего
// export const REACT_APP_API_URL: string = 'http://192.168.0.31:5000/'

// для рабочего сервера
// export const REACT_APP_API_URL: string = 'http://192.168.0.56:5000/'

// для сервера react-app
// export const REACT_APP_URL: string = 'http://vps.razumeetsya.ru:3000/'
// export const REACT_APP_URL: string = 'http://192.168.1.107:3000/'
export const REACT_APP_URL: string = 'http://localhost:3000/'
// для рабочего сервера
// export const REACT_APP_URL: string = 'http://sm-serv01:322/'
// export const REACT_APP_URL: string = 'http://clientix.local:322/'

export enum routes{
    ADMIN_ROUTE = '/admin',
    SLAVE_ROUTE = '/slave',
    LOGIN_ROUTE = '/login',
    REAUTH_ROUTE = '/reauth',
    REGISTRATION_ROUTE = '/registration',
    USERS_ROUTE = '/users',
    ORG_ADD_ROUTE = '/org_add',
    TAGS_ROUTE = '/tags',
    TAGS_ADD_ROUTE = '/tag_add',
    ORG_ROUTE = '/org/:id',
    FILES_ROUTE = '/file'
}

export const correct_routes: string[] = ['admin', 'slave', 'login', 'users', 'registration', 'org_add', 'tags', 'tag_add', 'file', 'org', 'reauth']