import React, { Component } from 'react';
import { Link } from "@reach/router";


class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameSystem: '',
            name: '',
            price: '',
            sellerName: '',
            email: '',
            condition: '',



        };
    }


    handleChange(value) {
        this.setState({
            value: value
        });
    }



    onSubmit(e) {
        e.preventDefault();
        const game = {
            name: this.state.name,
            condition: this.state.condition,
            price: this.state.price,
            sellerName: this.state.sellerName,
            sellerEmail: this.state.email
        }
        const sysId = this.props.gameSystems.find(system => this.state.gameSystem === system.name)._id
        this.props.addGame(sysId, game);
    }


    render() {
        const conditions = ['New', 'Used', 'Not working', 'Ok', 'Bad']
        const games = ["Super Mario World", "Sonic The Hedgehog 2", "Tekken 3", "Super mario 64", "Super mario bros."]
        return (
            <React.Fragment>
                <h1>Create game listing</h1>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <label>
                        Game system/console
                            <select value={this.state.gameSystem} onChange={(e) => this.setState({ gameSystem: e.target.value })} >
                            {this.props.gameSystems.map(system => <option>{system.name}</option>)}
                        </select>
                    </label>
                    <label>
                        Your price
                        <input type="text" value={this.state.price} onChange={event => this.setState({ price: event.target.value })} name="price" />
                    </label>
                    <label>
                        Game
                            <select onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name}>
                            {games.map(g => <option>{g}</option>)}
                        </select>
                    </label>
                    <label>
                        Email for contact
                        <input type="text" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} name="email" />
                    </label>
                    <label>
                        Your name
                        <input type="text" value={this.state.sellerName} onChange={event => this.setState({ sellerName: event.target.value })} name="sellerName" />
                    </label>
                    <label>
                        Condition
                        <select value={this.state.condition} onChange={(e) => this.setState({ condition: e.target.value })} >
                            {conditions.map(condition => <option>{condition}</option>)}
                        </select>
                    </label>
                    <input type="submit" value="Add game" />
                </form>

                <Link to="/">Back</Link>
            </React.Fragment>
        );
    }

}

export default Create;