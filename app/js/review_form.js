/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
    url: 'http://localhost:3000'
};

// App.getReviews = function(movieId){
//   $.ajax({
//     url: App.url + '/movies/' + movieId.id + '/reviews',
//     type: 'GET'
//   }).done(function(data){
//     // App.indexPosts(data);
//     console.log(data);
//   }).fail(function(jqXHR, textStatus, errorThrown){
//     trace(jqXHR, textStatus, errorThrown);
//   });
// };

App.updateReviews = function(data,movieId){
    $.ajax({
    url: 'http://localhost:3000/movies/' + movieId + '/reviews/' + data.id,
    type: 'PATCH',
    }).done(function(data){
      trace(data);
    }).fail();
};

App.submitReview = function(event,movieId){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: App.url + '/reviews',
    type: 'POST',
    data: {review:
      {
        star_rating: $('#star-rating').val(),
        comment: $('#review-comment').val(),
        username: $('#username').val()
      }
    },
  }).done(function(data){
    App.updateReviews(data,movieId);
    $('#star-rating').val(""),
    $('#review-comment').val(""),
    $('#username').val("")
    trace(data,movieId);
  }).fail(function(jqXKR, textStatus, errorThrown){
    trace(jqXKR, textStatus, errorThrown);
  })
};


$(document).ready(function(){
  var locate = window.location.search;
  var point = locate.lastIndexOf("=");
  var movieId = parseInt(locate.substring(point+1,locate.length));

  $('form.new-review-form').on('submit',function(event){
    App.submitReview(event,movieId);
  });
});




