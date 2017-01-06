var DoctorLookup = require("./../js/doctor-lookup.js").doctorLookupModule;

function fillConditionOtions(conditions) {
  for (var i = 0; i < conditions.length; i++) {
    var condition = conditions[i];
    var conditionOption = '<option value="'+condition.uid+'">'+condition.name+'</option>';
    $("#condition-select").append(conditionOption);
  }
}

function displayDoctors(doctors) {
  $("#doctors").empty();
  if (doctors.length !== 0) {
    for (i = 0; i < doctors.length; i++) {
      var doctor = doctors[i];
      var doctorHtml = '<div class="doc-box">'+
      '<div class="row">'+
      '<div class="col-sm-4">'+
      '<img class="doc-pic" src="'+doctor.profile.image_url+'" alt="profile-pic"/>'+
      '<span class="btn btn-info btn-xs doc-info" value="'+doctor.uid+'">View Profile</span>' +
      '</div>'+
      '<div class="col-sm-8">'+
      '<h4>'+doctor.profile.first_name+' '+doctor.profile.last_name+' <small>'+doctor.profile.title+'</small></h4>'+
      '<p>Specialties <em>'+doctor.specialties[0].name+'</em></p>'+
      '<br>'+
      '<p>'+doctor.practices[0].name+'</p>'+
      '<p>'+doctor.practices[0].visit_address.street+'</p>'+
      '<p>'+doctor.practices[0].visit_address.state+', '+doctor.practices[0].visit_address.zip+'</p>'+
      '</div>'+
      '</div>'+
      '</div>';
      $("#doctors").append(doctorHtml);
    }
  } else {
    $("#doctors").append('<p>No doctors match your search.</p>');
  }
  $("#results").show();
}

$(document).ready(function() {

  $("#begin, #search-again").click(function() {
    $("#welcome, #results").hide();
    if ($("#condition > option").length === 0){
      DoctorLookup.getConditions(fillConditionOtions);
    }
    $("#condition-form").show();
  });

  $("#condition").submit(function(event){
    event.preventDefault();
    $("#condition-form").hide();
    var condition = $("#condition-select > option:selected").text().toLowerCase();
    var newDoctorLookup = new DoctorLookup(condition);
    newDoctorLookup.getDoctorsByCondition(displayDoctors);
  });
});
