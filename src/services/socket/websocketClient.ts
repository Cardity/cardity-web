import CAH from "../cah";
import SocketCallback from "../callback/socketCallback";

export default class WebsocketClient {
    protected socket: WebSocket;

    protected lastHeartbeat: number = 0;

    public createGameCallback: SocketCallback | null = null;
    public joinGameCallback: SocketCallback | null = null;

    constructor() {
        // TODO: Adresse in Config auslagern
        this.socket = new WebSocket("wss://cah.testsrv.de:8448/");
        this.socket.onopen = this.onopen.bind(this);
        this.socket.onmessage = this.onmessage.bind(this);
        this.socket.onclose = this.onclose.bind(this);
        this.socket.onerror = this.onerror.bind(this);
    }

    public send(type: string | null, data: { [key: string]: any } | null, operation: number = 5) {
        let requestData: { [key: string]: any } = {
            "o": operation
        }
        if (type != null && type && type.length > 0) {
            requestData["t"] = type;
        }
        if (data != null) {
            requestData["d"] = data;
        }
        if (this.socket.readyState != WebSocket.OPEN) {
            return;
        }
        this.socket.send(JSON.stringify(requestData));
    }

    protected onopen(event: Event) {
        console.log("socket opened");

        this.send(null, null, 1);
        setTimeout(this.checkHeartbeat.bind(this), 50000);
    }

    protected onclose(event: CloseEvent) {
        // TODO: Fehlermeldung anzeigen bei close
        console.log("server closed connection");
    }

    protected onerror(event: Event) {
        console.log("Fehler: ");
        console.log(event);
    }

    protected onmessage(event: any) {
        var data = JSON.parse(event.data);
        console.log(data);
        switch (data.o) {
            case 2:
                this.heartbeat();
                break;
            case 4:
                this.handleHeartbeatAck();
                break;
            case 6:
                this.handleResponse(data.t, data.d);
                break;
        }
    }

    protected heartbeat() {
        this.lastHeartbeat = Math.floor(Date.now() / 1000);
        setTimeout(this.sendHeartbeat.bind(this), 40000);
    }

    protected sendHeartbeat() {
        if (this.socket.readyState != WebSocket.OPEN) {
            return;
        }
        console.log("send heartbeat1 " + Math.floor(Date.now() / 1000));
        this.send(null, null, 3);
    }

    protected handleHeartbeatAck() {
        this.lastHeartbeat = Math.floor(Date.now() / 1000);
        console.log("got heartbeat ack " + this.lastHeartbeat);
        setTimeout(this.sendHeartbeat.bind(this), 40000);
    }

    protected checkHeartbeat() {
        if (this.lastHeartbeat + 50 < Math.floor(Date.now() / 1000)) {
            console.log("close because of heartbeat");
            console.log(this.lastHeartbeat);
            console.log(Math.floor(Date.now() / 1000));
            this.socket.close();
            return;
        }

        setTimeout(this.checkHeartbeat.bind(this), 50000);
    }

    protected handleResponse(type: string, data: { [key: string]: any }) {
        switch (type) {
            case "CREATE_GAME": {
                if (this.createGameCallback != null) {
                    this.createGameCallback(data);
                }
                break;
            }
            case "JOIN_GAME": {
                if (this.joinGameCallback != null) {
                    this.joinGameCallback(data);
                }
                break;
            }
            case "CHANGE_PLAYER": {
                this.changePlayer(data);
                break;
            }
            case "CHANGE_GAME": {
                this.changeGame(data);
                break;
            }
        }
    }

    protected changePlayer(data: { [key: string]: any }) {
        for(let key in data) {
            switch (key) {
                case "key": {
                    CAH.getPlayer().key = data[key];
                    break;
                }
                case "name": {
                    CAH.getPlayer().name = data[key];
                    break;
                }
            }
        }
    }

    protected changeGame(data: { [key: string]: any }) {
        // TODO: implement
    }
}
