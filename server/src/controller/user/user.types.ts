

export interface User {
    fullName : string
    email : string
    role : string
    createdAt : Date
    password : string
    govId : string

}

export interface PublicUserInfo {
    fullName : string
    email : string
    role : string
    createdAt : Date
    govId : string
}

export interface ChangePasswordI {
    oldPassword: string
    newPassword: string
    user : PublicUserInfo
}