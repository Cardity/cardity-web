export default interface SocketCallback {
    (data: { [key: string]: any }): void
}
