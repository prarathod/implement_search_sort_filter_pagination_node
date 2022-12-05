const router = require("express").Router();
const Movie = require("../models/Movie");

router.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    genre === "All"
      ? genre == [...genreOptions]
      : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.quiry.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[(sort[0] = sort[1])];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // filter
    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const response = {
        error:false,
        total,
        page:page+1,
        limit,
        genres: genreOptions,
        movies,
    }

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, massage: "Internal Server Error" });
  }
});

module.exports = router;
