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
        const evs = pokemonRes.data.stats.filter((stat) => {
            if (stat.effort > 0) {
                return true
            } else {
            return false
        }
        }).map((stat) => {
            return `${stat.effort} ${stat.stat.name}`
            .toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        }).join(', ')

        // GET poke description, catch rate, egg group, gender ratio, hatch steps (from pokespecies url)
        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = ''
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text
                    return
                }
            })

        // gives the chance of genders in 1/8ths
        const femaleRate = res.data['gender_rate']
        const genderRatioFemale = 12.5 * femaleRate
        const genderRatioMale = (8 - femaleRate) * 12.5

        // base capture rate is up to 255/ bring it to a 100% scale instead
        const catchRate = Math.round((100 / 255) * res.data['capture_rate'])
        
        const eggGroups = res.data['egg_groups'].map(group => {
            return group.name.toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        }).join(', ')

        // 255 steps * hatch counter + 1 before egg is hatched
        const hatchSteps = 255 * (res.data['hatch_counter'] + 1)

        this.setState({
            description,
            genderRatioFemale,
            genderRatioMale,
            catchRate,
            eggGroups,
            hatchSteps
        })
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