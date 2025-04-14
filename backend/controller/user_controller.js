const db = require("../models");
const DonationTable = db.donationModel;
const VolenteersTable = db.volenteerModel;

const UserTable = db.userModel;
const axios = require("axios");
const fs = require("fs");
const csv = require("csv-parser");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// task1. create user:-
exports.createUser = async (req, res) => {
  console.log("createUser called");
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
      {
        timeout: 5000,
      }
    );

    console.log("response", response.data);

    const users = response.data.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      phone: u.phone,
      website: u.website,
      address_city: u.address?.city,
      company_name: u.company?.name,
    }));
    console.log("users", users);

    const result = await UserTable.bulkCreate(users, {
      updateOnDuplicate: [
        "name",
        "username",
        "email",
        "phone",
        "website",
        "city",
        "companyName",
      ],
    });

    console.log("result", result);
    res.status(200).json({ message: "Users fetched and saved successfully." });
  } catch (error) {
    let message = "API request failed";
    if (error.code === "ECONNABORTED") {
      message = "Request timeout";
    } else if (error.response && error.response.status === 404) {
      message = "API endpoint not found";
    }
    res.status(500).json({ message });
  }
};


//task2. analysisDonation:-
exports.analysisDonation = async (req, res) => {
  const results = [];
  const donationByCity = {};
  const donationCount = {};
  let highDonorCount = 0;
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      const city = data.City.trim();
      const amount = parseFloat(data.Amount.replace(/[^0-9.]/g, ""));

      console.log("data", data)
      if (!donationByCity[city]) {
        donationByCity[city] = 0;
        donationCount[city] = 0;
      }

      donationByCity[city] += amount;
      donationCount[city] += 1;

      if (amount > 10000) {
        highDonorCount++;
      }

      results.push({ ...data, amount });
    })
    .on("end", async() => {
      const averageByCity = {};
      const result = await DonationTable.bulkCreate(results);

      for (let city in donationByCity) {
        averageByCity[city] = donationByCity[city] / donationCount[city];
      }

      res.json({
        totalDonationsByCity: donationByCity,
        averageDonationsByCity: averageByCity,
        donorsOver10000: highDonorCount,
      });
    });
};


// task3. analysisVolenteers:-
exports.analysisVolenteers = async (req, res) => {
  const files = req.files;
  const consolidatedData = new Map();

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  function readCSV(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
  }

  async function processData() {
    for (const file of files) {
      const data = await readCSV(file.path);

      for (const row of data) {
        const id = row.Volunteer_ID.trim();
        if (!consolidatedData.has(id)) {
          consolidatedData.set(id, {
            Volunteer_ID: id,
            Name: row.Name.trim(),
            City: row.City.trim(),
            Hours: parseFloat(row.Hours),
          });
        }
      }
      fs.unlinkSync(file.path); // delete uploaded file after use
    }
  }

  await processData();

  
  // 1. Write consolidated CSV
  const consolidatedCsvWriter = createCsvWriter({
    path: "volunteers/single_volunteers_file.csv",
    header: [
      { id: "Volunteer_ID", title: "Volunteer_ID" },
      { id: "Name", title: "Name" },
      { id: "City", title: "City" },
      { id: "Hours", title: "Hours" },
    ],
  });

  console.log("kkkkk", consolidatedData.values());
  const dataSave=await VolenteersTable.bulkCreate(consolidatedData.values());
  console.log("dataSave", dataSave)
  await consolidatedCsvWriter.writeRecords([...consolidatedData.values()]);


  // 2: Generate summary
  const cityStats = {};
  for (const volunteer of consolidatedData.values()) {
    const city = volunteer.City;
    if (!cityStats[city]) {
      cityStats[city] = {
        totalHours: 0,
        volunteerSet: new Set(),
      };
    }
    cityStats[city].totalHours += volunteer.Hours;
    cityStats[city].volunteerSet.add(volunteer.Volunteer_ID);
  }

  const reportData = Object.keys(cityStats).map((city) => ({
    City: city,
    Total_Hours: cityStats[city].totalHours,
    Unique_Volunteers: cityStats[city].volunteerSet.size,
  }));
  console.log("reportData", reportData);

  const reportCsvWriter = createCsvWriter({
    path: "volunteers/volunteer_summary_report.csv",
    header: [
      { id: "City", title: "City" },
      { id: "Total_Hours", title: "Total_Hours" },
      { id: "Unique_Volunteers", title: "Unique_Volunteers" },
    ],
  });

  await reportCsvWriter.writeRecords(reportData);
  console.log("Summary report saved");

  return res.status(200).json({
    message: "CSV files processed successfully.",
    consolidatedFile: "single_volunteers.csv",
    summaryReportFile: "volunteer_summary_report.csv",
    summaryReport: reportData,
  });
}
