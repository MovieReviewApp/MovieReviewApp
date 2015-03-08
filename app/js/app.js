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

App.renderMovies = function(movies){
  for (var j = 0; j < movies.length; j++){
    $('.movie-list').append('<div class="col-md-3" id="movie-result-col">' + '<ul class="movie-text"><li id="movie-title"><h2 class="movie-title" id="'+ movies[j].title +'">' + movies[j].title + '</h2></li>'+ '<li class="mpaa" id="' + movies[j].mpaa_rating +'">'+ "MPAA Rating: " + movies[j].mpaa_rating + '</li><li class="release-date" id="' + movies[j].release_date.slice(0,4) + '">' + "Release Date: " + movies[j].release_date + '</li><li class="gross" id="' + movies[j].gross + '">' + "Gross: " + movies[j].gross + '</li></ul></div>')
  }
};

App.filterMovies = function(){
  var $filterDate = $('#filter-date');
  var $filterMpaa = $('#filter-mpaa');
  var $movieSearch = $('#movie-search');
  var $filterForm = $('#filter-form');
  // var $movieSearch = $('#movie-search');
  $movieSearch.on('change',function(e){
    if(e.preventDefault) e.preventDefault();
    var movieTitle = $('#movie-search').val();

    if(movieTitle){
      $('#filter-date').val('0');
      $('#filter-mpaa').val('0');
      App.filterByTitle(movieTitle);
      $('#movie-search').val("");
    };
  });
  $filterForm.on('change',function(e){
    if(e.preventDefault) e.preventDefault();
    var releaseDate = $filterDate.val();
    var mpaa = $filterMpaa.val();
   // var movieTitle = $('#movie-search').val();

   // if(movieTitle){
     // $('#filter-date').val('0');
     // $('#filter-mpaa').val('0');
    //  App.filterByTitle(movieTitle);
    //  $('#movie-search').val("");
     if (releaseDate==='0' && mpaa !=='0'){
      App.filterByOnlyMpaa(mpaa);
    }else if(mpaa==='0' && releaseDate !=='0'){
      App.filterByOnlyDate(releaseDate);
    }else{
      App.filterByDateMpaa(releaseDate, mpaa);
    };
 //   debugger;
  });
//  debugger;
};

App.filterByDateMpaa = function(selectDate, selectMpaa){
  var $releaseDates = $(".release-date");
  var $mpaaRating = $(".mpaa");
  var $movieText = $(".movie-text");
  for(var i = 0; i<$movieText.length; i++){
    if(selectDate === selectMpaa){
      $($movieText[i]).parent().show();
    } else if ($releaseDates[i].id === selectDate && $mpaaRating[i].id === selectMpaa){
      $($movieText[i]).parent().show();
    }else{
      $($movieText[i]).parent().hide();
    };
  }
};

App.filterByTitle = function(movieTitle){
  var $movieTitles = $(".movie-title");
  var $movieText = $(".movie-text");
  for(var i = 0; i<$movieTitles.length; i++){
    if($movieTitles[i].id.toLowerCase().indexOf(movieTitle.toLowerCase())> -1){
      $($movieText[i]).parent().show();
    }else{
      $($movieText[i]).parent().hide();
    };
  }
};

App.filterByOnlyDate = function(selectDate){
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

App.filterByOnlyMpaa = function(selectMpaa){
  var $mpaaRating = $(".mpaa");
  var $movieText = $(".movie-text");
  for(var i = 0; i<$mpaaRating.length; i++){
    if($mpaaRating[i].id === selectMpaa){
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
 // console.log("We're in the document ready.");
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


