
$('#addtask').click(function() {
  $('#tasklist').append(

    $('<li>').text($('#newtask').val())
  )
})
