import { Token } from "../schema/refreshToken-schema";
import { IToken } from "../../../models/mongo-model";

export const createRefreshToken: Function = async (token: string): Promise<Boolean> => {
    const refreshToken = new Token({ Token: token });
    if (!refreshToken)
        return false;
    const res: Boolean = await refreshToken.save().then(() => true).catch((err) => false);
    return res;
}

export const isRefreshTokenIn: Function = async (token: string):Promise<Boolean> => {
    return await Token.findOne({ Token: token }).clone().then((res => {
        if (!res)
            return false;
        return true;
    })).catch(err => false );
}

export const deleteRefreshToken: Function = async (token: string):Promise<Boolean> => {
    return await Token.findOneAndDelete({ Token: token }).clone().then(res => {
        if (!res)
            return false;
        return true;
    }).catch(err => false);
}