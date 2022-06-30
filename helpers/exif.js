const fs = require("fs");
const piexif = require("piexifjs");

function getGPS(filename) {
  try {
    const exif = piexif.load(
      fs.readFileSync(`./public/images/${filename}`).toString("binary")
    );

    const latitude = exif["GPS"][piexif.GPSIFD.GPSLatitude];
    const latitudeRef = exif["GPS"][piexif.GPSIFD.GPSLatitudeRef];
    const longitude = exif["GPS"][piexif.GPSIFD.GPSLongitude];
    const longitudeRef = exif["GPS"][piexif.GPSIFD.GPSLongitudeRef];

    const latitudeMultiplier = latitudeRef == "N" ? 1 : -1;
    const decimalLatitude =
      latitudeMultiplier * piexif.GPSHelper.dmsRationalToDeg(latitude);
    const longitudeMultiplier = longitudeRef == "E" ? 1 : -1;
    const decimalLongitude =
      longitudeMultiplier * piexif.GPSHelper.dmsRationalToDeg(longitude);

    return `${decimalLatitude},${decimalLongitude}`;
  } catch (err) {
    return null;
  }
}

module.exports = { getGPS };
