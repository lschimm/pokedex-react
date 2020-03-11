import React, { Component } from 'react';

export class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
    }

    componentDidMount () {
        const { name, url } = this.props
        const pokemonIndex = url.split('/')[url.split('/').length - 2]
        //number before the last slash
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
    }

    render() {
        return (
            <div className='col-md-3 col-sm-6 mb-5'>
            <div className="card-header">
                <h1>{this.state.name}</h1>
            </div>
            </div>
        );
    }
}

export default PokemonCard;
