import React, {Component} from 'react';
import {Link} from "@reach/router";

class GameSystems extends Component {

    handleChange(value) {
        this.setState({
            value: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Game marketplace</h1>
                <ul>
                    {this.props.gameSystems.map(gameSystem =>
                        <li key={gameSystem._id}>
                            <Link to={`/gamesystem/${gameSystem._id}`}>{gameSystem.name}</Link>
                        </li>)}
                </ul>

                <input name="newKittenName" onChange={(event) => this.handleChange(event.target.value)} type="text"/>
                <button onClick={_ => this.props.addGameSystem(this.state.value)} type="submit">Add New Game System</button>
            </React.Fragment>
        );
    }

}

export default GameSystems;
