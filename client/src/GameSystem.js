import React, { Component } from 'react';
import { Link } from "@reach/router";

class GameSystem extends Component {

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

    render() {

        const gameSystem = this.props.gameSystems.find(system => this.props.id === system._id)

        let content = <p>Loading</p>;
        if (gameSystem) {
            content =
                <React.Fragment>
                    <h1>{gameSystem.name}</h1>

                    <h3>Games</h3>
                    {gameSystem.games.map(game => (
                        <React.Fragment>
                        <h4> {game.name}</h4>
                        <ul>
                            <li>Seller: {game.sellerName}</li>
                            <li>Contact: {game.sellerEmail}</li>
                            <li>Price: ${game.price}</li>
                            <li>Condition: {game.condition}</li>
                        </ul>
                        <br />
                        </React.Fragment>
                        ))}

                    <br />
                    <Link to="/">Back</Link>
                </React.Fragment>
        }

        if (gameSystem && gameSystem.games.length === 0) {
                return (
                    <div>
                        <h1>{gameSystem.name}</h1>
                        <h2>There are no games for this system</h2>
                        <Link to="/">Back</Link>
                    </div>

                )
        }

        return content;
    }
}

export default GameSystem;
