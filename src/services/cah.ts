import Game from "./game/game";
import Player from "./game/player";
import WebsocketClient from "./socket/websocketClient";

export default class CAH {
    static socket: WebsocketClient;
    static player: Player;
    static game: Game;

    public static getClient(): WebsocketClient {
        if (CAH.socket == null) {
            CAH.socket = new WebsocketClient();
        }
        return CAH.socket;
    }

    public static getPlayer(): Player {
        if (CAH.player == null) {
            CAH.player = new Player();
        }
        return CAH.player;
    }

    public static getGame(): Game {
        if (CAH.game == null) {
            CAH.game = new Game();
        }
        return CAH.game;
    }
}
