const checkList = [];
$('INPUT:checkbox').click(function() {
  if($(this).prop('checked') == true){
    checkList.append($(this).prop('amenity_id'));
  }
  else {
    checkList.pop($(this).prop('amenity_id'));
  }
});

$('DIV.amenities H4').text(checkList);
