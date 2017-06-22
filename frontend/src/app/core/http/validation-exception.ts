export enum MessageLevel {
    ERROR, WARNING, INFO
}

export class ValidationException {
    title: string
    message: string
    messageLevel: MessageLevel
    status: number
    cause: any
}
