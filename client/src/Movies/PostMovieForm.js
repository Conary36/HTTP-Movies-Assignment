import React from 'react';
import axios from 'axios'

class PostMovieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                title: "",
                director: "",
                metascore: "",
                stars: [],

            }
        }
    }
    // componentDidMount = () =>{
    //     axios
    //         .get(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    //         .then(res => this.setState({movie: res.data}))
    //         .catch(err => console.log(err));
    // }
    handleChange = e => {
        if (e.target.name === 'metascore') {
            e.target.value = parseInt(e.target.value, 10);
        }
        this.setState({
            movie: {
                ...this.state.movie,
                [e.target.name]: e.target.value
            }

        })
    }
    
    handleStars = e => {
        this.setState({
            movie: {
                ...this.state.movie,
                stars: [e.target.value],
            }
        })
    }

    postMovie = (movie) => {
        this.setState({ ...this.state.movie })
        axios
            .post(`http://localhost:5000/api/movies/`, this.state.movie)
            .then(res => {
                this.setState(this.state.movie)
                // this.props.history.push("/")
            })
            .catch(err => {
                console.log(err)
            });

    }

    render() {
        return (

            <div>
                <h2>Post a new movie</h2>
                <form onSubmit={this.postMovie}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                        value={this.state.movie.title}
                    />
                    <input
                        type="text"
                        name="director"
                        placeholder="Director"
                        onChange={this.handleChange}
                        value={this.state.movie.director}
                    />
                    <input
                        type="text"
                        name="metascore"
                        placeholder="Metascore"
                        onChange={this.handleChange}
                        value={this.state.movie.metascore}
                    />
                    <input
                        type="text"
                        name='stars'
                        placeholder="Stars"
                        onChange={this.handleChange}
                        value={this.state.movie.stars}
                    />
                    
                    <button className="quotes-btn" type="submit">
                        Post Movie
                     </button>
                    
                </form>
            </div>
        )
    }
}
export default PostMovieForm;