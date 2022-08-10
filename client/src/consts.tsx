// export const REACT_APP_API_URL: string = 'http://vps.razumeetsya.ru:5000/'
export const REACT_APP_API_URL: string = 'http://192.168.1.107:5000/'
// export const REACT_APP_URL: string = 'http://vps.razumeetsya.ru:3000/'
// export const REACT_APP_URL: string = 'http://192.168.1.107:3000/'
export const REACT_APP_URL: string = 'http://localhost:3000/'

export enum routes{
    ADMIN_ROUTE = '/admin',
    SLAVE_ROUTE = '/slave',
    LOGIN_ROUTE = '/login',
    REGISTRATION_ROUTE = '/registration'
}

export const correct_routes: string[] = ['admin', 'slave', 'login', 'registration']