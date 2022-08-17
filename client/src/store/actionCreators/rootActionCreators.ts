import * as UserActionCreators from './userActionCreator'
import * as UsersActionCreators from './usersActionCreator'

export default {
    ...UserActionCreators,
    ...UsersActionCreators
}