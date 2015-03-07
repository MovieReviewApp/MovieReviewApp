'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
    url: 'http://localhost:3000'
};


App.getMovies = function(){
  $.ajax({
    url: App.url + '/movies',
    type: 'GET'
  }).done(function(data){
    App.renderMovies(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.indexMovies = function(movies){
  trace(movies)
  movies.forEach(App.renderMovie);
};

App.renderMovies = function(movies){
  var rowLoop;
  //trace(currentVal, index, array);
  for (var i = 0; i < movies.length; i=i+4) {
    $('.movie-list').append('<div class="row" id="'+ i +'">');
    if(i+4 < movies.length){
      rowLoop=4;
    }else{
      rowLoop=movies.length-i;
    };
    for (var j = 0; j < rowLoop; j++){
      $('#'+i).append('<div class="col-md-3">' + '<h1 class="movie-title">' + movies[i+j].title + '</h1> </div>')
    }
    $('.movie-list').append('</div>');
  };
};

// App.renderMovie = function(currentVal,index,array){
//   trace(currentVal, index, array);
//   for (var i = 0; i < 4; i++) {
//     $('.movie-list').append('<div class="row">');
//         $('.row').append('<div class="col-md-4">' + '<h1 class="movie-title">' + currentVal.title + '</h1>' + '<p class="movie-desc">' + currentVal.description + '</p>' + '<p>Number of reviews: ' + currentVal.reviews.length + '</p>' + '</div>');
//     $('.movie-list').append('</div>');
//   };

// };

$(document).ready(function(){
  // $('#movie-search').on('change', function(event){
  //   $('#sub-search').append('<select name="sub-category"><option value="">Select sub-category</option></select>');
  console.log("We're in the document ready.");
 // });
  App.getMovies();

  // $('#movie-list').on('')
  // $('#movie-search').on('change', function(event){
  //   $('#sub-search').append('<select name="sub-category">');
  //   $('#sub-search').append('<option value="">Select sub-category</option>');
  //   $('#sub-search').append('</select>');
  // });
});


