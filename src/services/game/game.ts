import IPlayer from "../interfaces/iplayer";

export default class Game {
    public gameID: string = "";
    public hostKey: string = "";
    public players: { [key: string]: IPlayer } = {};
    public maxPlayers: number = 10;
    public secondsPerRound: number = 90;
    public cardDecks: string[] = ["1"];
    public houseRules: number = 1;
    public isRunning: boolean = false;
    public questionCard: string = "";
}
