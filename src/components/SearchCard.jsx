import { useState } from "react";

const SearchCard = ({ addMovie }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSeries, setIsSeries] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fetchMoviesAndSeries = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearchResults([]);

    const omdbApiKey = "a9af197e";
    const omdbUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(
      searchTerm
    )}&apikey=${omdbApiKey}`;
    const tvmazeUrl = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
      searchTerm
    )}`;

    try {
      let results = [];

      if (isSeries) {
        const response = await fetch(tvmazeUrl);
        const data = await response.json();
        results = data.map((item) => ({
          id: `tv-${item.show.id}`,
          title: item.show.name,
          cover: item.show.image
            ? item.show.image.medium
            : "/default-series.png",
          isSeries: true,
          season: 1,
          episode: 1,
        }));
      } else {
        const response = await fetch(omdbUrl);
        const data = await response.json();
        if (data.Response === "True") {
          results = data.Search.filter((m) => m.Type === "movie").map(
            (movie) => ({
              id: movie.imdbID,
              title: movie.Title,
              cover:
                movie.Poster !== "N/A" ? movie.Poster : "/default-movie.png",
              isSeries: false,
            })
          );
        }
      }

      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-neutral p-5 shadow-lg mb-5 relative">
      <h2 className="text-primary text-xl mb-3">Search & Add</h2>

      {/* Movie/Series Toggle */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">Searching for:</span>
        <button
          className={`btn btn-sm ${
            isSeries ? "bg-blue-600" : "bg-gray-600"
          } text-white`}
          onClick={() => setIsSeries(!isSeries)}
        >
          {isSeries ? "📺 Series" : "🎬 Movie"}
        </button>
      </div>

      {/* Search Input */}
      <div className="flex gap-2 relative">
        <input
          type="text"
          placeholder="Enter movie/series title..."
          className="input input-bordered"
          style={{ flex: '1', minWidth: '0' }} // Added minWidth: '0'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchMoviesAndSeries}>
          🔍 Search
        </button>
      </div>

      {/* Search Results Dropdown */}
      {loading ? (
        <p className="text-gray-400 text-sm mt-2">Loading...</p>
      ) : showResults && searchResults.length > 0 ? (
        <div className="absolute top-full left-0 w-full bg-neutral p-2 rounded shadow-lg mt-2 z-10 border border-gray-700 max-h-80 overflow-y-auto">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-white hover:bg-gray-700 p-1 rounded-full"
            onClick={() => setShowResults(false)}
          >
            ✖
          </button>

          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-700 cursor-pointer rounded"
              onClick={() => {
                addMovie(movie);
                setSearchResults([]);
                setSearchTerm("");
                setShowResults(false);
              }}
            >
              <img
                src={movie.cover || "/default-movie.png"}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded"
              />
              <span className="text-white">{movie.title}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchCard;