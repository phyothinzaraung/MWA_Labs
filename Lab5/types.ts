export interface IToken {
    _id: string,
    fullname: string,
    email: string
}

export interface BodyWithToken{
    token_data: IToken;
}

export interface IResponse<T = unknown> {
    success : boolean,
    data: T
}

export class ErrorResponse extends Error{
    status?: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.status = statusCode;
    }
}