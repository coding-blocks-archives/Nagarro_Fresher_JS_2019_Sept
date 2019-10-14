$.addTodo=function()  {
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
      .append($('<button>')
                 .text('🔺')
                 .click(function(ev){
                   $(ev.target).parent().insertBefore($(ev.target).parent().prev())


                 })
      )
      .append($('<button>')
                 .text('🔻' )
                 .click(function(ev){
                   $(ev.target).parent().insertAfter($(ev.target).parent().next())


                 })
      )
      .append($('<span>').text($('#newtask').val()))
      .append($('<span>').text($('#deadline').val()))
  )

  $('#newtask').val('')
  $('#deadline').val('')

}


$('#addtask').click($.addTodo);

$('#newTask').on("keypress", function (e) {
  if (e.which == 13) {
   $.addTodo;
  }
})
