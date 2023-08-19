export interface IUser {
    UserName: string,
    Name: string,
    Password: string,
    Picture: string,
    Admin?:Boolean,

}

export interface IToken{
    Token:string,
}