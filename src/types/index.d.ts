export { };

declare global {
    namespace Express {
        interface Request {
            user: {
                UserName: string,
                Name: string,
                Admin:Boolean,
                iat: number,
                exp: number,
            }
        }
    }
}
