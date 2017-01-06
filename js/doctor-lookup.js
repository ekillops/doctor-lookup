var apiKey = require("./../.env").apiKey;

function DoctorLookup() {
  this.condition = null;
  this.relatedDoctorsJSON = null;
}

DoctorLookup.getConditions = function(displayFunction) {
  $.get("https://api.betterdoctor.com/2016-03-01/conditions?user_key=" + apiKey).then(function(result){
      displayFunction(result.data);
    }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};


DoctorLookup.prototype.getDoctorsByCondition = function(condition, displayFunction) {
  $.get("https://api.betterdoctor.com/2016-03-01/doctors?query="+condition+ "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey).then(function(result){
    this.relatedDoctorsJSON = response.data;
    displayFunction(resultList);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.doctorLookupModule = DoctorLookup;
