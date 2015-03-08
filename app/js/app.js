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

// App.indexMovies = function(movies){
//   trace(movies)
//   movies.forEach(App.renderMovie);
// };

App.filterMpaa = function(mpaaRate, e){
  if(e.preventDefault) e.preventDefault();
  //filter visible text
}

App.renderMovies = function(movies){
 // var rowLoop;
  //trace(currentVal, index, array);
 // for (var i = 0; i < movies.length; i=i+4) {
  //  $('.movie-list').append('<div class="row" id="'+ i +'">');
  //  if(i+4 < movies.length){
  //    rowLoop=4;
  //  }else{
   //   rowLoop=movies.length-i;
   // };
  //  for (var j = 0; j < rowLoop; j++){
   // $('.movie-list').append('<div class="row">');
    for (var j = 0; j < movies.length; j++){
      $('.movie-list').append('<div class="col-md-3">' + '<ul class="movie-text"><li id="movie-title"><h2 class="movie-title">' + movies[j].title + '</h2></li>'+ '<li class="mpaa" id="' + movies[j].mpaa_rating +'">'+ "MPAA Rating: " + movies[j].mpaa_rating + '</li><li class="release-date" id="' + movies[j].release_date.slice(0,4) + '">' + "Release Date: " + movies[j].release_date + '</li><li class="gross" id="' + movies[j].gross + '">' + "Gross: " + movies[j].gross + '</li></ul></div>')
    }
 //   $('.movie-list').append('</div>');
//  };
};

App.filterMovies = function(){
  var $filterDate = $('#filter-date');
  var $filterMpaa = $('#filter-mpaa');

  $filterDate.on('change',function(e){
    if(e.preventDefault) e.preventDefault();
    console.log($filterDate.val());
    App.filterByDate($filterDate.val());
  });

  $filterMpaa.on('change',function(e){
    if(e.preventDefault) e.preventDefault();
    console.log("Made it in filter mpaa");
  });
};

// App.allMovieDoms = function(){
//   var $movieRowList = $('.movie-list').children();
//   var allMovies = [];
//   for(var i = 0; i < $movieRowList.length; i++){
//     allMovies.push($($movieRowList[i]).children());
//   }
//   return(allMovies);
// }

App.filterByDate = function(selectDate){
  var $releaseDates = $(".release-date");
  var $movieText = $(".movie-text");
  for(var i = 0; i<$releaseDates.length; i++){
    if($releaseDates[i].id === selectDate){
      $($movieText[i]).parent().show();
    }else{
      $($movieText[i]).parent().hide();
    }
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

  App.filterMovies();

  // $('#movie-list').on('')
  // $('#movie-search').on('change', function(event){
  //   $('#sub-search').append('<select name="sub-category">');
  //   $('#sub-search').append('<option value="">Select sub-category</option>');
  //   $('#sub-search').append('</select>');
  // });
});


