var DoctorLookup = require("./../js/doctor-lookup.js").doctorLookupModule;

function fillConditionOtions(conditions) {
  for (var i = 0; i < conditions.length; i++) {
    var condition = conditions[i];
    var conditionOption = '<option value="'+condition.uid+'">'+condition.name+'</option>';
    $("#condition").append(conditionOption);
  }
}

function displayDoctors(doctors) {
  $("#doctors").empty();
  for (i = 0; i < doctors.length; i++) {
    var doctor = doctors[i];
    var doctorHtml = '<div class="doc-box">'+
      '<div class="row">'+
        '<div class="col-sm-4">'+
          '<img class="doc-pic" src="'+doctor.profile.image_url+'" alt="profile-pic"/>'+
          '<div class="btn btn-info btn-xs doc-info" value="'+doctor.uid+'">View Profile</div>' +
        '</div>'+
        '<div class="col-sm-8">'+
          '<h4>'+doctor.profile.first_name+' '+doctor.profile.middle_name[0]+'. '+doctor.profile.last_name+' <small>'+doctor.profile.title+'</small></h4>'+
          '<p>Specialties <em>'+doctor.specialties[0].name+'</em></p>'+
          '<br>'+
          '<p>'+doctor.practices[0].name+'</p>'+
          '<p>'+doctor.practices[0].street+'</p>'+
          '<p>'+doctor.practices[0].state+', '+doctor.practices[0].zip+'</p>'+
        '</div>'+
      '</div>'+
    '</div>';
    $("#doctors").append(doctorHtml);
  }
}

$(document).ready(function() {

  $("#begin, #search-again").click(function() {
    $("#welcome, #results").hide();
    if ($("#condition > option").length === 0){
      console.log("test");
      DoctorLookup.getConditions(fillConditionOtions);
    }
    $("#condition-form").show();
  });

  $("form#condition").submit(function(event){
    event.preventDefault();
    var condition = $("#condition-select > option:selected").text();

  });
});
