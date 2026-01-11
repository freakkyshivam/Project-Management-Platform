
export interface ApiResponseI<T> {
        statusCode : number,
        success: string;
        data ? : T
}