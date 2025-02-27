import { useState, useEffect } from "react";
import SearchCard from "../components/SearchCard";
import ListCard from "../components/ListCard";
import ManualEntryForm from "../components/ManualEntryForm";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    movieId: null,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      try {
        const parsedMovies = JSON.parse(savedMovies);
        if (Array.isArray(parsedMovies)) {
          setMovies(parsedMovies);
        } else {
          console.warn("Stored data is not an array, resetting to empty array.");
          setMovies([]);
        }
      } catch (error) {
        console.error("Error loading movies from localStorage:", error);
        setMovies([]);
      }
    }
  }, []);

  // Save to localStorage whenever movies update
  useEffect(() => {
    if (movies.length > 0) {
      try {
        localStorage.setItem("movies", JSON.stringify(movies));
      } catch (error) {
        console.error("Error saving movies to localStorage:", error);
      }
    }
  }, [movies]);

  // Add a movie from search results
  const addMovie = (movie) => {
    if (!movies.some((m) => m.id === movie.id)) {
      setMovies((prevMovies) => [...prevMovies, movie]);
    }
  };

  // Update season for a movie
  const updateSeason = (id, change) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, season: Math.max(1, movie.season + change) }
          : movie
      )
    );
  };

  // Update episode for a movie
  const updateEpisode = (id, change) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, episode: Math.max(1, movie.episode + change) }
          : movie
      )
    );
  };

  // Toggle the completion status of a movie
  const toggleCompleted = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, completed: !movie.completed } : movie
      )
    );
  };

  // Delete a movie from the list
  const deleteMovie = (id) => {
    setDeleteConfirmation({ show: true, movieId: id }); // Show confirmation before deletion
  };

  const confirmDeleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);

    try {
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.error("Error saving movies to localStorage:", error);
    }
    setDeleteConfirmation({ show: false, movieId: null });
  };

  return (
    <div className="min-h-screen bg-background text-white p-5 flex flex-col">
      <h1 className="text-primary text-3xl text-center font-bold mb-5">
        SerieslyTracked 📺📌
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 w-full">
          <SearchCard addMovie={addMovie} />
          <ManualEntryForm addMovie={addMovie} />
        </div>

        <div className="lg:w-2/3 w-full">
          <ListCard
            movies={movies}
            updateEpisode={updateEpisode}
            updateSeason={updateSeason}
            toggleCompleted={toggleCompleted}
            deleteMovie={deleteMovie}
          />
        </div>
      </div>

      {deleteConfirmation.show && (
        <div className="toast toast-center mb-8">
          <div className="alert alert-warning bg-blue-200 text-blue-800">
            <span>Are you sure you want to delete this movie?</span>
            <div className="flex gap-2">
              <button
                className="btn btn-xs btn-error"
                onClick={() => confirmDeleteMovie(deleteConfirmation.movieId)}
              >
                Yes
              </button>
              <button
                className="btn btn-xs btn-success"
                onClick={() =>
                  setDeleteConfirmation({ show: false, movieId: null })
                }
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;