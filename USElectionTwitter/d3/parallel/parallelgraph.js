(function() {

d3.text("d3/parallel/parallel.txt", function(error, tledata) {
  tleparse(tledata);
});

function tleparse(data) {
  console.log(data);

  var lines = data.split("\n");
  console.log(lines);

  var objects = [];
  lines.forEach(function(line) {
    if (line.length == 0) return;

    if (line[0] == "1") {
      var obj = objects[objects.length-1];
      obj.satelliteNumber = line.slice(2,7);
      obj.classification = line.slice(7,8);
      obj.launchYear = line.slice(9,11);
      obj.launchNumber = line.slice(11,14);
      obj.launchPiece = line.slice(14,17);
      obj.epochYear = line.slice(18,20);
      obj.epochDay = line.slice(20,32);
      obj.firstDerivMeanMotion = line.slice(33,43);
      obj.secondDerivMeanMotion = line.slice(44,52);
      obj.bstarDragTerm = line.slice(53,61);
      obj.ephemerisType = line.slice(62,63);
      obj.elementNumber = line.slice(65,68);
      return; 
    }

    if (line[0] == "2") {
      var obj = objects[objects.length-1];
      obj.inclination = line.slice(8,16);
      obj.rightAscension = line.slice(17,25);
      obj.eccentricity = "." + line.slice(26,33);
      obj.perigee = line.slice(34,42);
      obj.meanAnomaly = line.slice(43,51);
      obj.meanMotion = line.slice(52,63);
      obj.revolutionNumberAtEpoch = line.slice(63,68);

      // trim whitespace
      for (var k in obj) obj[k] = obj[k].trim();

      return; 
    }
    
    objects.push({
      name: line
    });
  });
  console.log(objects);

  d3.select("#parallelCoord").append("pre").text(d3.csv.format(objects));
};

})();