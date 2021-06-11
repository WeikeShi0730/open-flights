import React from 'react'
import './rating.styles.css'

const Rating = ({ score, ...props }) => {

    const norm_score = (score / 5) * 100

    return (
        <span className="star-wrapper">
            <span className="stars" style={{ width: norm_score + "%" }}></span>
        </span>
    )
}

export default Rating