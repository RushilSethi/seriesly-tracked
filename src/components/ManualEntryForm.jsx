import { useState } from "react";
import PropTypes from "prop-types";

const ManualEntryForm = ({ addMovie }) => {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [cover, setCover] = useState("");
  const [isSeries, setIsSeries] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      id: Date.now(),
      title,
      cover: cover || "/default-movie.png"
    };

    if (isSeries) {
      newMovie.season = season;
      newMovie.episode = episode;
      newMovie.isSeries = true;
    } else {
      newMovie.isSeries = false;
    }

    addMovie(newMovie);

    // Reset form fields
    setTitle("");
    setSeason(1);
    setEpisode(1);
    setCover("");
  };

  return (
    <div className="card bg-neutral p-5 shadow-lg mt-2 mb-8">
      <h2 className="text-primary text-xl mb-3">
        {isSeries ? "Add Series Manually" : "Add Movie Manually"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2" htmlFor="title">
            {isSeries ? "Series Title" : "Movie Title"}
          </label>
          <input
            id="title"
            type="text"
            placeholder={isSeries ? "Series Title" : "Movie Title"}
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {isSeries && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2" htmlFor="season">
                Season Number
              </label>
              <input
                id="season"
                type="number"
                placeholder="Season Number"
                className="input input-bordered w-full"
                value={season}
                onChange={(e) => setSeason(parseInt(e.target.value))}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2" htmlFor="episode">
                Episode Number
              </label>
              <input
                id="episode"
                type="number"
                placeholder="Episode Number"
                className="input input-bordered w-full"
                value={episode}
                onChange={(e) => setEpisode(parseInt(e.target.value))}
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2" htmlFor="cover">
            Cover Image URL (Optional)
          </label>
          <input
            id="cover"
            type="text"
            placeholder="Cover Image URL"
            className="input input-bordered w-full"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-full" type="submit">
          {isSeries ? "Add Series" : "Add Movie"}
        </button>
      </form>

      {/* Toggle between Series and Movie */}
      <div className="flex items-center justify-center mt-3">
        <label className="mr-2 text-white">Movie</label>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={isSeries}
          onChange={() => setIsSeries((prev) => !prev)}
        />
        <label className="ml-2 text-white">Series</label>
      </div>
    </div>
  );
};

ManualEntryForm.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

export default ManualEntryForm;
