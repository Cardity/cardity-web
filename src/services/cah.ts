import WebsocketClient from "./socket/websocketClient";

export default class CAH {
    static socket: WebsocketClient;

    public static getClient() {
        if (CAH.socket == null) {
            CAH.socket = new WebsocketClient();
        }
        return CAH.socket;
    }
}