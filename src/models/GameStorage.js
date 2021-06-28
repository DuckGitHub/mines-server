class GameStorage {
    static instance;

    constructor(){
       if (!!GameStorage.instance) return GameStorage.instance

       this.games = new Map()
       GameStorage.instance = this;

       return GameStorage.instance
    }

    findGameById(gameId) {
        return this.games.get(gameId)
    }

    addGame(game){
        this.games.set(game.id, game)
    }
    
    removeGame(gameId){
        this.games.delete(gameId)
    }

    showAllGames() {
        const games = this.games
        for (const entry of games) console.log('Game ID: ', entry[0])
    }
}

module.exports = GameStorage