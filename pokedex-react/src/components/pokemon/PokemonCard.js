import React, { Component } from 'react';

import styled from 'styled-components'

const Sprite = styled.img`
    width: 5em;
    height: 5em;
`

export class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        tooManyRequests: false
    }

    componentDidMount () {
        const { name, url } = this.props
        const pokemonIndex = url.split('/')[url.split('/').length - 2]
        //number before the last slash
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
    
        this.setState({
            name,
            imageUrl,
            pokemonIndex
        })
    }


    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5">
            <div className="card">
                <h5 className="card-header">{this.state.pokemonIndex}</h5>
                <Sprite 
                className="card-img-top rounded mx-auto mt-2" 
                onLoad={() => this.setState({imageLoading: false})}
                onError={() => this.setState({tooManyRequests: true})}
                src={this.state.imageUrl} />
                {this.state.tooManyRequests ? (
                    <h6 className='mx-auto'>
                        <span className="badge badge-danger mt-2">Too Many Requests :(</span>
                    </h6>
                ) : null }
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
//

export default PokemonCard;