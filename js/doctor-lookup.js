var apiKey = require("./../.env").apiKey;

function DoctorLookup() {}

DoctorLookup.getConditions() = function() {
  var resultList = [];
  $.get("https://api.betterdoctor.com/2016-03-01/conditions?user_key=" + apiKey).then(function(result){
    for (var i = 0; i < result.length; i++) {
      resultList = result.data;
    }
  }).fail(function(error){
    resultList.push({"name": error.responseJSON.message})
  });
  return resultList;
};

exports.doctorLookupModule = DoctorLookup;
