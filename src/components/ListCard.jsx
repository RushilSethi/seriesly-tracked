import { useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

const ListCard = ({ movies, updateEpisode, updateSeason, toggleCompleted, deleteMovie }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter movies based on search term (case-insensitive)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card bg-neutral p-5 border border-gray-700">
      <h2 className="text-primary text-xl mb-3">My List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search in your list..."
        className="input input-bordered w-full mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Movie List */}
      <div>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              updateEpisode={updateEpisode}
              updateSeason={updateSeason}
              toggleCompleted={toggleCompleted}
              deleteMovie={deleteMovie}
            />
          ))
        ) : (
          <p className="text-gray-400">No movies match your search.</p>
        )}
      </div>
    </div>
  );
};

// ✅ PropTypes
ListCard.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      season: PropTypes.number,
      episode: PropTypes.number,
      completed: PropTypes.bool.isRequired,
      cover: PropTypes.string,
      isSeries: PropTypes.bool.isRequired,
    })
  ).isRequired,
  updateEpisode: PropTypes.func.isRequired,
  updateSeason: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default ListCard;
