module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        // Get all games. Put game into json response when it resolves.
        dal.getGameSystems().then(games => res.json(games));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getGameSystem(id).then(game => res.json(game));
    });

    router.post('/', (req, res) => {
        console.log(req.body)
        let gameSystem = {
            name : req.body.name,
            games : [] 
        };
        dal.createGameSystem(gameSystem).then(gameSystem => res.json(gameSystem));
    });

    router.get('/:gameSystemId/games/:gameId', (req, res) => {
        dal.getGame(req.params.gameSystemId, req.params.gameId).then(game => res.json(game))
    })

    router.post('/:id/games', (req, res) => {
        dal.addGame(req.params.id, req.body.game).then(game => res.json(game));
    })



    return router;
};