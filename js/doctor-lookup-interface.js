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
      '<div class="img-wrapper">'+
      '<img class="doc-pic img-fluid" src="'+doctor.profile.image_url+'" alt="profile-pic"/>'+
      '</div>'+
      '<span class="btn btn-info btn-xs doc-info" value="'+doctor.uid+'">View Profile</span>' +
      '</div>'+
      '<div class="col-sm-4">'+
      '<h4>'+doctor.profile.first_name+' '+doctor.profile.last_name+' <small>'+doctor.profile.title+'</small></h4>'+
      '<p>Specialties <em>'+doctor.specialties[0].name+'</em></p>'+
      '<br>'+
      '<p>'+doctor.practices[0].name+'</p>'+
      '<p><small>Street:</small> '+doctor.practices[0].visit_address.street+'</p>'+
      '<p><small>State/Zip:</small> '+doctor.practices[0].visit_address.state+', '+doctor.practices[0].visit_address.zip+'</p>'+
      '<p><small>Phone:</small> '+((doctor.practices[0].phones.length > 1)? doctor.practices[0].phones[1].number : doctor.practices[0].phones[0].number)+'</p>'+
      '</div>'+
      '</div>'+
      '</div>';
      $("#doctors").append(doctorHtml);
    }
  } else {
    $("#doctors").append('<p>No doctors match your search.</p>');
  }
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
    var zip = $("condition-zip").val();
    var newDoctorLookup = new DoctorLookup(condition);
    newDoctorLookup.getDoctorsByCondition(displayDoctors);
    $("#search-condition").text(newDoctorLookup.condition);
    $("#results").show();
  });
});
