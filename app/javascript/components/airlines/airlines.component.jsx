import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import IndividualAirline from './individual-airline.component'

const Home = styled.div`
  text-align:center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

const Header = styled.div`
  padding:100px 100px 10px 100px;
  
  h1 {
    font-size:42px;
  }
`

const Subheader = styled.p`
  font-weight:300;
  font-size:26px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`

const Airlines = () => {
    const [airlines, setAirlines] = useState([])

    useEffect(() => {
        // Get all airlines from api
        // Update airlines in our state
        axios.get('/api/v1/airlines.json')
            .then(res => {
                setAirlines(res.data.data)
            })
            .catch(res => console.log(res))
    }, [airlines.length])

    const grid = airlines.map((airline, index) => {
        const { name, image_url, slug, avg_score } = airline.attributes
        return <IndividualAirline
            key={index}
            name={name}
            image_url={image_url}
            slug={slug}
            avg_score={avg_score}
        />
    })

    return (
        <Home>
            <Header>
                <h1>OpenFlights</h1>
                <Subheader>Airline reviews</Subheader>
            </Header>
            <Grid>
                {grid}
            </Grid>
        </Home>
    );

}

export default Airlines