
var ShowApp = ShowApp || {
    url: 'http://localhost:3000',
};

ShowApp.getMovie = function(id){
  $.ajax({
    url: ShowApp.url + '/movies/' + id,
    type: 'GET'
  }).done(function(data){
    ShowApp.renderMovie(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

ShowApp.renderMovie = function(movie){
  $('.movie-show').append('<ul><li id="movie-title"><h1 class="movie-title" id="'+ movie.title +'">' + movie.title + '</h1></li>'+ '<li class="mpaa" id="' + movie.mpaa_rating +'">'+ "MPAA Rating: " + movie.mpaa_rating + '</li><li class="release-date" id="' + movie.release_date.slice(0,4) + '">' + "Release Date: " + movie.release_date + '</li><li>Movie Gross: ' + movie.gross + '</li><li>Description: ' + movie.description +  '<li></ul>')
  ShowApp.renderReviews(movie.reviews);
};

ShowApp.renderReviews = function(reviews){
 for (var j = 0; j < reviews.length; j++){
    $('.review-show').append('<div class="col-md-3" id="review-result-col">' + '<ul class="review"><li><h4 class="username"> '+ reviews[j].username  + '</h4></li>'+ '<li>Star Rating: '+ reviews[j].star_rating +'</li><li>Comments: '+ reviews[j].comment + '</li></ul></div>')
  };
};

ShowApp.showReviewCreate = function(movie_id){
  var $showReviewCreate = $('a#create-review');
  $showReviewCreate.click(function(e){
    if(e.preventDefault) e.preventDefault();
    window.location.href = "/review-form.html?id=" + movie_id;
   // movieId = data.id;
 });
};


$(document).ready(function(){
  var locate = window.location.search;
  var point = locate.lastIndexOf("=");
  var movie_id = parseInt(locate.substring(point+1,locate.length));
  ShowApp.getMovie(movie_id);
  ShowApp.showReviewCreate(movie_id);

});
