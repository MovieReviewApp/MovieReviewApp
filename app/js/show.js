
var ShowApp = ShowApp || {
    url: 'http://localhost:3000',
};

ShowApp.getMovie = function(id){
  $.ajax({
    url: ShowApp.url + '/movies/' + id,
    type: 'GET'
  }).done(function(data){
    debugger;
    ShowApp.renderMovie(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

ShowApp.renderMovie = function(movie){
  $('.movie-show').append('<ul class="movie-text"><li id="movie-title"><h2 class="movie-title" id="'+ movie.title +'">' + movie.title + '</h2></li>'+ '<li class="mpaa" id="' + movie.mpaa_rating +'">'+ "MPAA Rating: " + movie.mpaa_rating + '</li><li class="release-date" id="' + movie.release_date.slice(0,4) + '">' + "Release Date: " + movie.release_date + '</li></ul>')
};




$(document).ready(function(){
  var locate = window.location.search;
  var point = locate.lastIndexOf("=");
  var movie_id = parseInt(locate.substring(point+1,locate.length));
  ShowApp.getMovie(movie_id);

});
