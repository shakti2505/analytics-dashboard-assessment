import fs from "fs";
import Papa from "papaparse";

// Load the CSV file
const csvFilePath =
  "../../data-to-visualize/Electric_Vehicle_Population_Data.csv";
const csvData = fs.readFileSync(csvFilePath, "utf-8");

// Parse CSV data into JSON
const { data } = Papa.parse(csvData, { header: true });

// Convert parsed data into an array of objects
const vehicles = data;
// 1. Group by 'Make' and count the number of vehicles
const groupByMake = (vehicles) => {
  const result = new Map();
  vehicles.forEach((vehicle) => {
    const make = vehicle.Make;
    result.set(make, (result.get(make) || 0) + 1);
  });
  return Array.from(result, ([make, count]) => ({ make, count }));
};

const makeCounts = groupByMake(vehicles);
console.log("Vehicle count by Make:", makeCounts);

// 2. Filter by 'Electric Vehicle Type'
const filterByEVType = (vehicles, type) => {
  return vehicles.filter(
    (vehicle) => vehicle["Electric Vehicle Type"] === type
  );
};

const batteryEVs = filterByEVType(vehicles, "Battery Electric Vehicle (BEV)");
console.log("Filtered Battery Electric Vehicles:", batteryEVs.length);

// 3. Aggregate average 'Electric Range' by 'Make'
const averageElectricRangeByMake = (vehicles) => {
  const rangeData = new Map();

  vehicles.forEach((vehicle) => {
    const make = vehicle.Make;
    const range = parseInt(vehicle["Electric Range"], 10) || 0;

    if (!rangeData.has(make)) {
      rangeData.set(make, { totalRange: 0, count: 0 });
    }

    rangeData.get(make).totalRange += range;
    rangeData.get(make).count += 1;
  });

  return Array.from(rangeData, ([make, { totalRange, count }]) => ({
    make,
    averageRange: count > 0 ? totalRange / count : 0,
  }));
};

const avgRangeByMake = averageElectricRangeByMake(vehicles);
console.log("Average Electric Range by Make:", avgRangeByMake);

// 4. Group by 'County' and count
const groupByCounty = (vehicles) => {
  const result = new Map();
  vehicles.forEach((vehicle) => {
    const county = vehicle.County;
    result.set(county, (result.get(county) || 0) + 1);
  });
  return Array.from(result, ([county, count]) => ({ county, count }));
};

const countyCounts = groupByCounty(vehicles);
console.log("Vehicle count by County:", countyCounts);

// Save processed data to JSON
fs.writeFileSync(
  "./processed_data.json",
  JSON.stringify({ makeCounts, avgRangeByMake, countyCounts }, null, 2)
);
console.log("Processed data saved to processed_data.json");
