$(function(){
  $('#search-input').click( function(event){
    if($('#user-name').val() === ""){
      event.preventDefault();
      alert('Please Enter A Name');
    } else if($('#input-search').val() === ""){
      event.preventDefault();
      alert('Please Enter A Search')
    }
  });
});
