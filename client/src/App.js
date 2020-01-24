import React, { Component } from 'react';
import GameSystem from "./GameSystem";
import { Router } from "@reach/router";
import GameSystems from "./GameSystems";
import {Link} from "@reach/router";
import Create from './Create'

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {

        super(props);
        this.state = {
            gameSystems: []

        };
    }




    componentDidMount() {
        this.fetchData().then(() => console.log("GameSystems gotten!"));
    }



    async fetchData() {
        let url = `${this.API_URL}/gamesystems`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            gameSystems: json
        })
    }

    getGameSystem(id) {
        return this.state.gameSystems.find(k => k._id === id);
    }


    async addGame(gameSystemId, game) {
        await fetch(`${this.API_URL}/gamesystems/${gameSystemId}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({gameSystemId, game })
        });
        await this.fetchData();
    }

    async addGameSystem(name) {
        await fetch(`${this.API_URL}/gamesystems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ name: name, games: ['Examples'] })
        });
        await this.fetchData();
    }




    render() {
        return (
            <div className="container">
                <Router>
                    <GameSystems path="/" gameSystems={this.state.gameSystems} addGameSystem={name => this.addGameSystem(name)} />
                    <GameSystem path="/gamesystem/:id" gameSystems={this.state.gameSystems} />
                    <Create path={'/create'} gameSystems={this.state.gameSystems}  addGame={(gameSystemId, game) => this.addGame(gameSystemId, game)} />
                </Router>
                <Link to={'/create'} >Create game listing</Link>
            </div>
        );
    }
}

export default App;
