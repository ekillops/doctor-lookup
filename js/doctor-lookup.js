var apiKey = require("./../.env").apiKey;
var geoKey = require("./../.env").geoKey;

function DoctorLookup(newCondition, newZip) {
  this.condition = newCondition;
  this.zip = newZip;
  this.lat = null;
  this.long = null;
  this.relatedDoctorsJSON = null;
}

DoctorLookup.getConditions = function(displayFunction) {
  $.get("https://api.betterdoctor.com/2016-03-01/conditions?user_key=" + apiKey).then(function(response){
      displayFunction(response.data);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

DoctorLookup.getDoctor = function(uid, displayFunction) {
  $.get("https://api.betterdoctor.com/2016-03-01/doctors/"+uid+"?user_key="+apiKey).then(function(response){
    displayFunction(response.data);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

DoctorLookup.prototype.getDoctorsByCondition = function(displayFunction) {
  var that = this;
  //Get latitude and longitude from maps api
  $.get("https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+that.zip+"&sensor=false&key="+geoKey).then(function(zipResponse){
    that.lat = zipResponse.results[0].geometry.location.lat;
    that.long = zipResponse.results[0].geometry.location.lng;
  }).then(function(){
    //Get doctors from doctor api
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?query="+that.condition+ "&location="+that.lat+"%2C"+that.long+"%2C%20&user_location="+that.lat+"%2C"+that.long+"&skip=0&limit=20&user_key=" + apiKey).then(function(doctorResponse){
      that.relatedDoctorsJSON = doctorResponse.data;
      displayFunction(that.relatedDoctorsJSON);
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.doctorLookupModule = DoctorLookup;
