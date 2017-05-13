export interface HttpError {
    cause: any,
    localizedMessage: string,
    message: string,
    messageLevel: string,
    stackTrace: Array<any>,
    suppressed: Array<any>,
    title: string
}
