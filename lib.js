const searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
    // // movie-detail
    const modalDetailButton = document.querySelectorAll(".modal-btn");
    modalDetailButton.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const imdbid = this.dataset.imdbid;
        fetch("https://www.omdbapi.com/?apikey=bc310c9&i=" + imdbid)
          .then(function (res) {
            return res.json();
          })
          .then((data) => {
            const movieDetails = `<div class="container-fluid">
                                    <div class="row">
                                      <div class="col-md-6">
                                        <img src="${data.Poster}" class="img-fluid" alt="img details">
                                      </div>
                                      <div class="col-md">
                                        <ul class="list-group">
                                          <li class="list-group-item"> <strong>${data.Title}</strong> - published (${data.Released})</li>
                                          <li class="list-group-item">
                                            <strong>Sutradara : </strong>${data.Director}
                                          </li>
                                          <li class="list-group-item">
                                            <strong>Pemain : </strong>${data.Actors}
                                          </li>
                                          <li class="list-group-item">
                                            <strong>Penulis : </strong>${data.Writer}
                                          </li>
                                          <li class="list-group-item">
                                            <strong>Alur : </strong>
                                            <br />${data.Plot}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>`;
            const modalBody = document.querySelector(".modal-body");
            modalBody.innerHTML = movieDetails;
          });
      });
    });
  } catch (err) {
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch("https://www.omdbapi.com/?apikey=bc310c9&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      return data.Search;
    });
}
function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}
function showCards(m) {
  return `<div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top img-fluid">
                <div class="card-body">
                  <h5 class="card-title">${m.Title}</h5>
                  <h6 class="card-sub-title text-muted">${m.Year}</h6>
                  <a href="#" class="btn btn-primary modal-btn" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                </div>
              </div>
          </div>`;
}
