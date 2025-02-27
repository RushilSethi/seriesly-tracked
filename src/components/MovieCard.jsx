import PropTypes from "prop-types";
import Icon from "../assets/icon_nobg.png";

const MovieCard = ({
  movie,
  updateEpisode,
  updateSeason,
  toggleCompleted,
  deleteMovie,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center bg-neutral p-4 mb-4 rounded-lg border border-gray-700 ${
        movie.completed ? "grayscale opacity-60" : ""
      }`}
    >
      {/* Movie Cover */}
      <img
        src={movie.cover && movie.cover !== "N/A" ? movie.cover : Icon}
        alt={movie.title}
        className="w-24 h-32 sm:w-20 sm:h-28 md:w-16 md:h-24 lg:w-14 lg:h-20 object-cover rounded-md"
        onError={(e) => {
          e.target.src = Icon;
        }}
      />

      {/* Movie Info & Controls */}
      <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 w-full">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white break-words">
              {movie.title}
            </h3>

            {/* Show Season/Episode only if it's a series */}
            {movie.isSeries && (
              <p className="text-sm text-gray-400">
                Season <span className="text-primary">{movie.season}</span> - 
                Episode <span className="text-primary">{movie.episode}</span>
              </p>
            )}
          </div>

          {/* Completed & Delete Buttons */}
          <div className="flex justify-center sm:justify-end gap-2 mt-2 sm:mt-0">
            <button
              className={`btn btn-sm ${
                movie.completed
                  ? "bg-teal-600 hover:bg-teal-500"
                  : "bg-yellow-500 hover:bg-yellow-400"
              } text-white`}
              onClick={() => toggleCompleted(movie.id)}
            >
              {movie.completed ? "✔ Completed" : "❗ Incomplete"}
            </button>

            <button
              className="btn btn-sm bg-red-600 hover:bg-red-500 text-white"
              onClick={() => deleteMovie(movie.id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>

        {/* Season & Episode Controls - Only for Series */}
        {movie.isSeries && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-2">
            <div className="flex gap-2">
              <button
                className="btn btn-sm bg-gray-800 hover:bg-gray-700 text-gray-300"
                onClick={() => updateSeason(movie.id, -1)}
                disabled={movie.completed}
              >
                ⬅ Season
              </button>
              <button
                className="btn btn-sm bg-gray-800 hover:bg-gray-700 text-gray-300"
                onClick={() => updateSeason(movie.id, 1)}
                disabled={movie.completed}
              >
                Season ➡
              </button>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-sm bg-gray-800 hover:bg-gray-700 text-gray-300"
                onClick={() => updateEpisode(movie.id, -1)}
                disabled={movie.completed}
              >
                ⬅ Episode
              </button>
              <button
                className="btn btn-sm bg-gray-800 hover:bg-gray-700 text-gray-300"
                onClick={() => updateEpisode(movie.id, 1)}
                disabled={movie.completed}
              >
                Episode ➡
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    season: PropTypes.number,
    episode: PropTypes.number,
    completed: PropTypes.bool.isRequired,
    cover: PropTypes.string,
    isSeries: PropTypes.bool.isRequired,
  }).isRequired,
  updateEpisode: PropTypes.func.isRequired,
  updateSeason: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default MovieCard;
