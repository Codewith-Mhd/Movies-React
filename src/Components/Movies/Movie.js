import {useState, useEffect} from "react"

const URL_API = "https://www.omdbapi.com?apikey=1ac57f34"
const SearchMovies = () => {
  const [movieName, setmovieName] = useState("")
  const [movieData, setmovieData] = useState(null)

  const fetchMovieData = async (title) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=1ac57f34&t=${title}`
    )
    const data = await res.json()
    console.log(data.search)
    setmovieData(data)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    fetchMovieData(movieName)
  }

  useEffect(() => {
    if (movieData && movieData.Response === false) {
      alert("No movie found")
    }
  }, [movieData])

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setmovieName(e.target.value)}
        />
        <button>Search</button>
      </form>
      {movieData && (
        <div>
          <h1>{movieData.Title}</h1>
          <img src={movieData.Poster} alt={movieData.Title} />
          <p>{movieData.Plot}</p>
        </div>
      )}
    </div>
  )
}

export default SearchMovies
