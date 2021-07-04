import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Header from './header.component'
import ReviewForm from './review-form.component'
import Review from './review.component'
import AxiosWrapper from '../../src/requests/axios-wrapper'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const Column = styled.div`
  background: #fff; 
  max-width: 50%;
  width: 50%;
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
`

const Main = styled.div`
  padding-left: 60px;
`

const Airline = (props) => {


  const [airline, setAirline] = useState()
  const [review, setReview] = useState({ title: '', description: '', score: 0 })
  const [reviews, setReviews] = useState()
  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
    const slug = props.match.params.slug
    const url = `/api/v1/airlines/${slug}`
    AxiosWrapper.get(url)
      .then(res => {
        setAirline(res.data)
        setReviews(res.data.included)
        setLoaded(true)
      })
      .catch(res => console.log(res))
  }, [])

  const handleChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    setReview({
      ...review,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const airline_id = airline.data.id
    AxiosWrapper.post('/api/v1/reviews', { review, airline_id }) // payload???????????? 
      .then(res => {
        const new_review_included = [...airline.included, res.data.data]
        setAirline({ ...airline, new_review_included })
        setReview({ title: '', description: '', score: 0 })
        setReviews([...reviews, res.data.data])
      })
      .catch(res => console.log(res))
  }

  const setRating = (score, event) => {
    event.preventDefault()
    score = score ? score : 0
    setReview({ ...review, score }) //????????????????????
  }

  let total, average = 0
  let userReviews
  if (reviews && reviews.length > 0) {
    // ????????????????
    total = reviews.reduce((total, review) => total + review.attributes.score, 0)
    average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)) : 0

    userReviews = reviews.map((review, index) => {
      return (
        <Review
          key={index}
          id={review.id}
          attributes={review.attributes}
        />
      )
    })

  }


  return (
    <Wrapper>
      {
        loaded &&
        <div>
          <Column>
            <Main>
              <Header
                attributes={airline.data.attributes}
                reviews={reviews}
                average={average}
              />
              {userReviews}
            </Main>
          </Column>
          <Column>
            <ReviewForm
              name={airline.data.attributes.name}
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
            // error={error}
            />
          </Column>
        </div>
      }
    </Wrapper>
  )
}

export default Airline