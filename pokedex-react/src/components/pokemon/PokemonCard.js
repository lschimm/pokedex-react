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
    
        this.setState({
            name: name, 
            imgUrl: imageUrl, 
            pokemonIndex: pokemonIndex
        })
    }

    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5">
            <div className="card">
                <h5 className="card-header">{this.state.pokemonIndex}</h5>
                <div className="card-body mx-auto">
                    <h6 className="card-title">
                        {this.state.name
                        .toLowerCase() // set it to lower case
                        .split(' ') // splitting it at the space
                        .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1)) // mapping over each, sets it to upper case 
                        // then BOOM. joins it together
                        .join(' ')}
                    </h6>
                </div>
            </div>
            </div>
        );
    }
}

export default PokemonCard;
