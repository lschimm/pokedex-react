import React, { Component } from 'react'
import axios from 'axios'

import PokemonCard from './PokemonCard'

export default class PokemonList extends Component {
    // get pokemon list!
    state= {
        url: "https://pokeapi.co/api/v2/pokemon/",
        pokemon: null
    }
    //visible to the user
    async componentDidMount() {
        const res = await axios.get(this.state.url)
        this.setState({pokemon: res.data['results'] })
        // this.setState to rerun 
    }
    render() {
        return (
            <React.Fragment>
            {this.state.pokemon ? (<div className="row">
            {this.state.pokemon.map((pokemon) => (
                <PokemonCard />
                ))}
        </div>) : (<h1>Loading Pokemon...</h1>)}
        </React.Fragment>
        )
    }
}