import { User } from '../../models/user'
export const setUserAction = (user:User) => {
    type: 'SET_USER'
    user
}
