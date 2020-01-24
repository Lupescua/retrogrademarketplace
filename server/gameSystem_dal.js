class Db {
    /**
     * Constructors an object for accessing gameSystems in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store gameSystems in MongoDB
        const gameSystemSchema = new mongoose.Schema({
            name: String,
            games: [{
                name: String,
                price: Number,
                sellerEmail: String,
                sellerName: String,
                condition: String,
            }]
        });

        // This model is used in the methods of this class to access gameSystems
        this.gameSystemModel = mongoose.model('gameSystem', gameSystemSchema);
    }


    async getGameSystem(id) {
        try {
            return await this.gameSystemModel.findById(id);
        } catch (error) {
            console.error("getGameSystem:", error.message);
            return {};
        }
    }
    async getGameSystems() {
        try {
            return await this.gameSystemModel.find({});
        } catch (error) {
            console.error("getGameSystems:", error.message);
            return {};
        }
    }

    async getGame(gameSystemId, gameId) {
        try {
            const gameSystem = await this.gameSystemModel.findById(gameSystemId);
            return gameSystem.games.find(g => g._id == gameId)
        } catch (error) {
            console.error("getGameSystem:", error.message);
            return {};
        }
    }

    async addGame(gameSystemId, game) {
        const gameSystem = await this.getGameSystem(gameSystemId);
        gameSystem.games.push(game);
        return gameSystem.save();
    }

    async createGameSystem(newGameSystem) {
        let gameSystem = new this.gameSystemModel(newGameSystem);
        return gameSystem.save();
    }


    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of gameSystems to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap() {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const systems = [
            'NES',
            'Atari 7800',
            'Sega Master System',
            'Sega Genesis',
            'PS1',
        ]

        const games = [{
            "name": "Super Mario World",
            "price": 50,
            "sellerEmail": "Adam@gmail.com",
            "sellerName": "Adam",
            "condition": "New",
        },
        {
            "name": "Sonic The Hedgehog 2",
            "price": 40,
            "sellerEmail": "Mark@gmail.com",
            "sellerName": "Mark",
            "condition": "Used",
        },
        {
            "name": "Tekken 3",
            "price": 90,
            "sellerEmail": "Rebecca@gmail.com",
            "sellerName": "Rebecca",
            "condition": "Not working",
        },
        {
            "name": "Super mario 64",
            "price": 33,
            "sellerEmail": "Jonathan@gmail.com",
            "sellerName": "Jonathan",
            "condition": "Ok",
        },
        {
            "name": "Super mario bros.",
            "price": 21,
            "sellerEmail": "Jonathan@gmail.com",
            "sellerName": "Jonathan",
            "condition": "Bad",
        }
        ];

        function getRandomGameItems() {
            const shuffled = games.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1, shuffled.length));
        }

        let l = (await this.getGameSystems()).length;
        console.log("collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < systems.length; i++) {
                let gameSystem = new this.gameSystemModel({
                    name: systems[i],
                    games: getRandomGameItems()
                });
                promises.push(gameSystem.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the gameSystems in the database
module.exports = mongoose => new Db(mongoose);