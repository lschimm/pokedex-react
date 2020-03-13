import React, { Component } from 'react'
import axios from 'axios'

import styled from 'styled-components'

export default class Pokemon extends Component{
    state= {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: ''
    }

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params

        // URLs for poke info
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
        const pokemonSpeciesUrl = `https://pokeapi.co/api.v2/pokemon-species/${pokemonIndex}/`

        // GET poke info
        const pokemonRes = await axios.get(pokemonUrl)

        const name = pokemonRes.data.name
        const imageUrl = pokemonRes.data.sprites.front_default

        let { hp, attack, defense, speed, specialAttack, specialDefense } = ''

        pokemonRes.data.stats.map((stat) => {
            switch(stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat']
                    break;
                case 'attack':
                    attack = stat['base_stat']
                    break;
                case 'defense':
                    defense = stat['base_stat']
                    break;
                case 'speed':
                    speed = stat['base_stat']
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat']
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat']
                    break;
            }
        })

        // height is originally in decimeters / converted to feet (0.001 * 100 / rounded to 2 decimal places)
        const height = Math.round((pokemonRes.data.height * 0.328084 + 0.0001) *100) / 100

        // weight is originally in hectograms / converted to pounds
        const weight = Math.round((pokemonRes.data.height * 0.220462 + 0.0001) *100) / 100

        const types = pokemonRes.data.types.map((type) => type.type.name)
        const abilities = pokemonRes.data.abilities.map((ability) => {
            return ability.ability.name
            .toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        })
    }

    render() {
        return (
        <div>
            <h1>{this.state.name}</h1>
        </div>
        )
    }
}