export { };

declare global {
    namespace Express {
        interface Request {
            user: {
                UserName: string,
                Name: string,
                iat: number,
                exp: number,
            }
        }
    }
}
