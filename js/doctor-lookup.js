var apiKey = require("./../.env").apiKey;

function DoctorLookup(newCondition) {
  this.condition = newCondition;
  this.relatedDoctorsJSON = null;
}

DoctorLookup.getConditions = function(displayFunction) {
  $.get("https://api.betterdoctor.com/2016-03-01/conditions?user_key=" + apiKey).then(function(response){
      displayFunction(response.data);
    }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};


DoctorLookup.prototype.getDoctorsByCondition = function(displayFunction) {
  var that = this;
  $.get("https://api.betterdoctor.com/2016-03-01/doctors?query="+that.condition+ "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey).then(function(response){
    that.relatedDoctorsJSON = response.data;
    displayFunction(that.relatedDoctorsJSON);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.doctorLookupModule = DoctorLookup;
