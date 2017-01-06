var DoctorLookup = require('./../js/doctor-lookup.js').doctorLookupModule;

function fillConditionOtions(conditions) {
  for (var i = 0; i < conditions.length; i++) {
    var condition = conditions[i];
    var conditionOption = '<option value="'+condition.uid+'">'+condition.name+'</option>';
    $('#condition').append(conditionOption);
  }
}

$(document).ready(function() {
  $('#begin, #search-again').click(function() {
    $('#welcome, #results').hide();
    if ($('#condition > option').length === 0){
      console.log("test");
      DoctorLookup.getConditions(fillConditionOtions);
    }
    $('#condition-form').show();
  });
});
