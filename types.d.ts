export interface Message {
    message: string;
}
export interface MessageWithDateId extends Message {
    id: string;
    date: string;
}