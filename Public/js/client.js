$(function() {

//ask server for songs, then draw them
getSongs()



//listen for submit events and send new songs to server
$('form').on('submit', function(event){
  event.preventDefault(); ///stop form from refreshing package
  var formData = $(this).serialize();
  //send off to server
  $.ajax({
    type: 'POST',
    url: '/songs',
    data: formData,
    success: getSongs,  //ask server for songs and load them up
    //error: //function to alert error
  });
  $(this).find('input[type=text]').val('');   //clear form
});
});

function getSongs(){
$.ajax({
  type: 'GET',
  url: '/songs',
  success: function(songs){  //argument is what the response fromthe server is.  expect it to be the array of songs
    //append ul list in html
    $('#songs').empty();

    songs.forEach(function(song){
      var $li = $('<li></li>');
      $li.append('<p>Song Name:'+ song.title +'</p>');
      $li.append('<p>By: '+ song.artist +'</p>');
      //append date to DOM
      $li.append('<p> Date Added: ' + song.newDate +'</p>');
      $('#songs').append($li);

    });
  }
});
  }
