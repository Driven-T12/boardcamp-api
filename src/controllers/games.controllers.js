import { getAllGames, getGameName, addGame } from "../repository/games.repository.js";

export async function getGames(req, res) {
    try {

        const games = await getAllGames();

        res.send(games.rows);

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createGames(req, res) {

    const { name } = req.body;

    try {
        
        const game = await getGameName(name);

        if ( game.rowCount > 0 )
            return res.status(409).send({message:'Jogo já cadastrado!'});

        await addGame(req.body);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message)
    }
} 