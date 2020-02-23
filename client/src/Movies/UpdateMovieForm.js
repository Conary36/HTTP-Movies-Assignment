import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
 
}

const UpdateMovieForm = (props)=> {

    const [film, setFilm] = useState(initialState);
    const {id} = useParams();

     useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setFilm(res.data))
            .catch(err => console.log(err))
    }, [id])

    const handleChange =(e) => {
        e.persist();
        let value = e.target.value
        if(e.target.name === 'metasore'){
            value = parseInt(value, 10)
        }
        setFilm({
            ...film,
            [e.target.name]: value
        })
    }

    const handleStars = (e) => {
        setFilm({
            ...film, 
            stars: [e.target.value]
        })
    }

   const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, film)
            .then(res => {
                return(
                setFilm(initialState),
                props.history.push("/")
                )

            })
            .catch(err => console.log(err))

    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={film.title}
            />
            <input
                type="text"
                name="director"
                placeholder="Director"
                onChange={handleChange}
                value={film.director}
            />
            <input
                type="text"
                name="metascore"
                placeholder="Metascore"
                onChange={handleChange}
                value={film.metascore}
            />
            <input
                type="text"
                name="stars"
                placeholder="Stars"
                onChange={handleStars}
                value={film.stars}
            />
            <button className="quotes-btn" type="submit">
                PUT Movie
             </button>
             

        
        </form>
    )
} 

export default UpdateMovieForm