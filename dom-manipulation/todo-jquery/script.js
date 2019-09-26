
$('#addtask').click(function() {
  $('#tasklist').append(

    $('<li>')
      .append(
        $('<button>')
          .text('❌')
          .click(function (ev) {
            // ev -> the event
            // ev.target -> the element on which click happened
            // parent() -> the li element
            $(ev.target).parent().remove()
          })
      )
      .append($('<span>').text($('#newtask').val()))
  )

  $('#newtask').val('')

})
