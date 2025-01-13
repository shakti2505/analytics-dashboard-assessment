import fs from "fs";
import Papa from "papaparse";
// load the csv file

export const readAndParse = () => {
  return new Promise((resolve, reject) => {
    const csvFilePath = "../../data-to-visualize/Electric_Vehicle_Population_Data.csv";

    fs.readFile(csvFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error in reading file:", err);
        reject(err);
        return;
      }

      // Parse the CSV content
      const parsedCSV = Papa.parse(data, { header: true });
      resolve(parsedCSV.data);
    });
  });
};

