import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Card({ name }) {
    const [img, setImg] = useState('')

    useEffect(() => {
        api.get(`/${name}`)
            .then(response => {
                const { sprites } = response.data
                setImg(sprites.other['official-artwork'].front_default)
            })
    }, [name])

    return (
        <div className='card'>
            <img src={img} alt="" />
            <h3>{name}</h3>
        </div>
    )
}
