// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('SMART_FRIEGHT');

//rename license_plate attribute of collection vehicles to vehicle_licence_plate
db.vehicles.dropIndex('license_plate_1');
db.vehicles.updateMany({}, { $rename: { license_plate: 'licence_plate' } });
db.vehicles.createIndex({ licence_plate: 1 }, { unique: true });

// const vehicles = db.vehicles.findOne({licence_plate:null})
// console.log(vehicles);
