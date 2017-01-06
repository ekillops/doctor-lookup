var apiKey = require("./../.env").apiKey;

function DoctorLookup() {}

DoctorLookup.getConditions = function(displayFunction) {
  $.get("https://api.betterdoctor.com/2016-03-01/conditions?user_key=" + apiKey).then(function(result){
      var resultList = result.data;
      displayFunction(resultList);
    }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.doctorLookupModule = DoctorLookup;
