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