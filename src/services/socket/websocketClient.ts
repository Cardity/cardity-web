import { io, Socket as SocketIOSocket } from "socket.io-client";
import router from "@/router";
import CAH from "../cah";
import SocketCallback from "../callback/socketCallback";
import Game from "../game/game";

export default class WebsocketClient {
    protected socket: SocketIOSocket;

    protected lastHeartbeat: number = 0;

    public createGameCallback: SocketCallback | null = null;
    public joinGameCallback: SocketCallback | null = null;
    public changeGameListener: SocketCallback[] = [];
    public chatMessageCallback: SocketCallback | null = null;
    public startGameCallback: SocketCallback | null = null;
    public playerChangedCallback: SocketCallback | null = null;
    public playerWonCallback: SocketCallback | null = null;

    constructor() {
        // TODO: Adresse in Config auslagern
        this.socket = io("wss://cah.testsrv.de:8448/", {
            transports: ["websocket"],
            reconnection: false // TODO: uncomment
        });
        this.socket.on("connect", this.onopen.bind(this));
        this.socket.on("message", this.onmessage.bind(this));
        this.socket.on("disconnect", this.onclose.bind(this));
    }

    public send(type: string | null, data: { [key: string]: any } | null, operation: string = "message") {
        let requestData: { [key: string]: any } = {}
        if (type != null && type && type.length > 0) {
            requestData["t"] = type;
        }
        if (data != null) {
            requestData["d"] = data;
        }
        this.socket.emit(operation, requestData);
    }

    protected onopen(event: any) {
        console.log("socket opened");

        this.send(null, null, "hello");
    }

    protected onclose(event: any) {
        // TODO: Fehlermeldung anzeigen bei close
        console.log("server closed connection");
        router.push("/connection-closed");
    }

    protected onmessage(data: any) {
        console.log(data);
        this.handleResponse(data.t, data.d);
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
            case "CHAT_MESSAGE": {
                if (this.chatMessageCallback != null) {
                    this.chatMessageCallback(data);
                }
                break;
            }
            case "START_GAME": {
                if (this.startGameCallback != null) {
                    this.startGameCallback(data);
                }
                break;
            }
            case "PLAYER_WON": {
                if (this.playerWonCallback != null) {
                    this.playerWonCallback(data);
                }
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
                case "wordCards": {
                    CAH.getPlayer().wordCards = data[key];
                    break;
                }
                case "isCardCzar": {
                    CAH.getPlayer().isZcar = data[key];
                    break;
                }
            }
        }

        if (this.playerChangedCallback != null) {
            this.playerChangedCallback(data);
        }
    }

    protected changeGame(data: { [key: string]: any }) {
        let game: Game = CAH.getGame();
        for (let key in data) {
            switch (key) {
                case "cardDecks": {
                    game.cardDecks = data[key];
                    break;
                }
                case "gameID": {
                    game.gameID = data[key];
                    break;
                }
                case "hostKey": {
                    game.hostKey = data[key];
                    break;
                }
                case "houseRules": {
                    game.houseRules = data[key];
                    break;
                }
                case "maxPlayers": {
                    game.maxPlayers = data[key];
                    break;
                }
                case "players": {
                    game.players = data[key];
                    break;
                }
                case "secondsPerRound": {
                    game.secondsPerRound = data[key];
                    break;
                }
                case "isRunning": {
                    game.isRunning = data[key];
                    break;
                }
                case "phase": {
                    game.phase = data[key];
                    break;
                }
                case "activeQuestionCard": {
                    game.questionCard = data[key];
                    break;
                }
                case "selectedCards": {
                    game.selectedCards = data[key];
                    break;
                }
                case "questionCards": {
                    game.questionCards = data[key];
                    break;
                }
            }
        }

        for (let key in this.changeGameListener) {
            this.changeGameListener[key](data);
        }
    }
}
