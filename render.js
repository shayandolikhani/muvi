var pagenumber;
var searchquery;
var rows;
var tv;
$(function () {
  $("#searchbutton").click(function () {
    if ($('select option').filter(':selected').val() == 1){
      tv = false;
      pagenumber = 1;
      rows = 0;
      searchquery = encodeURIComponent($("#searchtext").val());
      $("#results").empty();
  
      theMovieDb.search.getMovie({
        "query": searchquery
      }, renderMovieList, errorCB);

    } else {
      tv = true;
      pagenumber = 1;
      rows = 0;
      searchquery = encodeURIComponent($("#searchtext").val());
      $("#results").empty();
  
      theMovieDb.search.getTv({
        "query": searchquery
      }, renderTvList, errorCB);
    }
  
  })

  $("#results").on('click', "#loadbutton", function () {
    pagenumber++;
    $("#loadbutton").remove();

    if (tv == false) {
    theMovieDb.search.getMovie({
      "query": searchquery,
      "page": pagenumber
    }, renderMovieList, errorCB);
  } else {
    theMovieDb.search.getTv({
      "query": searchquery,
      "page": pagenumber
    }, renderTvList, errorCB);
  }
  })
});



function renderMovieList(data) {
  let result = JSON.parse(data);
  let pagenumber = result.page;
  let totalpages = result.total_pages;

  if (result.total_results == 0) {
    let message = `<p>Sorry, no movies were found matching your query.</p>`;
    $(message).hide().appendTo("#results").fadeIn(500);
    return;
  }

  
  for (let i = 0; i < result.results.length; i++) {
    if (i % 3 == 0) {
      let row = `<div class = "row" id = row${rows}></div>`
      $("#results").append(row);
      rows++;
    }
    let card = `<div class="col">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w780${result.results[i].poster_path}" class="img-fluid rounded-start" alt="Poster Image">
                <p class="card-text ${result.results[i].vote_average * 10}" id = "badrating">Average Rating: ${result.results[i].vote_average * 10}%</p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${result.results[i].title}</h5>
                  <p class="card-text">${result.results[i].overview}</p>
                  <p class="card-text"><small class="text-muted">Release Date: ${result.results[i].release_date}</small></p>
                </div>
              </div>
            </div>
          </div>
    </div>`;

    $(card).hide().appendTo(`#row${rows-1}`).fadeIn(500);
  }


  for (let i = 60; i <= 100; i++) {
    $(`.${i}`).attr('id', 'goodrating');
  }

  if (pagenumber == totalpages) {
    let message = `<p id = "lastpage">Sorry, no more results.</p>`;
    $(message).hide().appendTo("#results").fadeIn(500);
    return;
  } else {
    let button = `
    <div class="text-center">
    <button id = "loadbutton" type="button" class="btn btn-outline-danger btn-lg">Load More Results</button>
    </div>
    <br>`;
    $(button).hide().appendTo("#results").fadeIn(500);
  }
}


function renderTvList(data) {
  let result = JSON.parse(data);
  let pagenumber = result.page;
  let totalpages = result.total_pages;
 
  if (result.total_results == 0) {
    let message = `<p>Sorry, no TV Shows were found matching your query.</p>`;
    $(message).hide().appendTo("#results").fadeIn(500);
    return;
  }

  
  for (let i = 0; i < result.results.length; i++) {
    if (i % 3 == 0) {
      let row = `<div class = "row" id = row${rows}></div>`
      $("#results").append(row);
      rows++;
    }
    let card = `<div class="col">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w780${result.results[i].poster_path}" class="img-fluid rounded-start" alt="Poster Image">
                <p class="card-text ${result.results[i].vote_average * 10}" id = "badrating">Average Rating: ${result.results[i].vote_average * 10}%</p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${result.results[i].name}</h5>
                  <p class="card-text">${result.results[i].overview}</p>
                  <p class="card-text"><small class="text-muted">First Air Date: ${result.results[i].first_air_date}</small></p>
                </div>
              </div>
            </div>
          </div>
    </div>`;

    $(card).hide().appendTo(`#row${rows-1}`).fadeIn(500);
  }
 
  for (let i = 60; i <= 100; i++) {
    $(`.${i}`).attr('id', 'goodrating');
  }

  if (pagenumber == totalpages) {
    let message = `<p id = "lastpage">Sorry, no more results.</p>`;
    $(message).hide().appendTo("#results").fadeIn(500);
    return;
  } else {
    let button = `
    <div class="text-center">
    <button id = "loadbutton" type="button" class="btn btn-outline-danger btn-lg">Load More Results</button>
    </div>
    <br>`;
    $(button).hide().appendTo("#results").fadeIn(500);
  }
}




function errorCB(data) {
  console.log("Error callback: " + data);
};
