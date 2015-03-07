'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
    url: 'http://localhost:3000'
};


App.getMovie = function(movie){
  $.ajax({
    url: App.url + '/movies/' + movie,
    type: 'GET'
  }).done(function(data){
    App.renderMovie(data);
    // App.renderForm(data);
    console.table(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

// App.renderForm = function(data){
//   $('#review-form').append('<form><input id="name" type="text"> <select name="rating"> <option value="">Choose a rating</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select> <input id="movie-id" type="hidden" value=' + data.movie.val() + '> <input id="submit-review" type="submit"> <input id="comment" type="textarea"> </form>');
// };

App.writeReview = function(event){
  event.preventDefault();
  console.log("I'm writing a review");
  // App.renderForm();
};


App.renderMovie = function(data){
  $('.movie-list').append('<ul><li>Title: ' + data.movie.title + "</li><li>Description: "  + data.movie.overview + '</li><li>Revenue: ' + data.movie.revenue + '</li><li>MPAA Rating: ' + '<input id="write-review" type="submit" value="Write a review"></li></ul>');
};


$(document).ready(function(){
  console.log("We're in the document ready.");
  $('#movie-search').on('change', function(event){
    App.getMovie($('#movie-search').val());
  });

  $('#write-review').on('submit', function(event){
    console.log('writing a review!');
    App.writeReview(event);
  });

  // $('#submit-review').on('submit'), function(values){
  //   App.commitReview(values);
  // };
});


