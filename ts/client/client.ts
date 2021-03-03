export class Client {
    protected socket: WebSocket;

    protected lastHeartbeat: number = 0;

    constructor(options: { [key: string]: string }) {
        this.socket = new WebSocket(options["websocketPath"]);
        this.socket.onopen = this.onopen.bind(this);
        this.socket.onmessage = this.onmessage.bind(this);
        this.socket.onclose = this.onclose.bind(this);
    }

    protected onopen(event: Event) {
        var data = {
            "o": 1
        };
        this.socket.send(JSON.stringify(data));

        setTimeout(this.checkHeartbeat.bind(this), 50000);
    }

    protected onclose(event: CloseEvent) {
        // TODO: Fehlermeldung anzeigen bei close
        console.log("server closed connection");
    }

    protected onmessage(event: MessageEvent<any>) {
        var data = JSON.parse(event.data);
        switch (data.o) {
            case 2:
                this.heartbeat();
                break;
            case 4:
                this.handleHeartbeatAck();
                break;
        }
    }

    protected heartbeat() {
        this.lastHeartbeat = Math.floor(Date.now() / 1000);
        setInterval(this.sendHeartbeat.bind(this), 40000);
    }

    protected sendHeartbeat() {
        var data = {
            "o": 3
        };
        this.socket.send(JSON.stringify(data));
    }

    protected handleHeartbeatAck() {
        this.lastHeartbeat = Math.floor(Date.now() / 1000);
    }

    protected checkHeartbeat() {
        if (this.lastHeartbeat + 50 < Math.floor(Date.now() / 1000)) {
            this.socket.close();
            return;
        }

        setTimeout(this.checkHeartbeat.bind(this), 50000);
    }
}
