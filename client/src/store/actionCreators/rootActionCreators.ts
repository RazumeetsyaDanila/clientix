import * as UserActionCreator from './userActionCreator'
import * as UsersActionCreator from './usersActionCreator'
import * as ClientsActionCreator from './clientsActionCreator'

export default {
    ...UserActionCreator,
    ...UsersActionCreator,
    ...ClientsActionCreator
}