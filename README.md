mysql with sequlize

# Goonj Engineering Tasks

This repository contains solutions for three key data engineering tasks: 
- Fetching data from a REST API and storing it in a database.
- Processing and analyzing donation data.
- Automating the workflow for volunteer data.

The solutions are implemented in **Node.js** with various libraries for handling HTTP requests, working with databases, and processing CSV files.
---

## 🧰 Requirements
Dependencies:
Axios: For making API requests.

Sequelize / mysql2: For interacting with MySQL/PostgreSQL.

csv-parser: For reading CSV files.

Lodash: For data manipulation.

To install all required dependencies, run:
`npm install`

## 📌 Task 1: REST API Integration

### Objective:
Write a Node.js program that fetches user data from the following API:
- **API URL**: `https://jsonplaceholder.typicode.com/users`

The program should:
1. Store the following fields in a PostgreSQL or MySQL database:
   - `id`
   - `name`
   - `username`
   - `email`
   - `phone`
   - `website`
   - `address.city`
   - `company.name`
   
2. Implement error handling for common API issues (e.g., timeouts, 404 errors).
3. Log all successful and failed API requests.

### Example Usage:
1. Install dependencies:
   ```bash
   npm install axios mysql2 sequelize
   
## 🧹 Task 2: Data Processing - Donations
Objective:
Process donation data from a CSV file (Donations.csv):

1. Clean the data by handling missing values and converting columns to appropriate data types.
2. Calculate and print the following:

- Total donations by city.

- Average donation amount per city.

- Number of donors who contributed more than ₹10,000.

3. Visualize the total donations by city using a bar chart.

#### Example Usage:
Install dependencies:

`npm install csv-parser lodash chart.js `
Run the script:

## 🔁 Task 3: Workflow Automation - Volunteer Data
Objective:
Automate the processing of volunteer data:

1. Merge three CSV files (volunteer_data_1.csv, volunteer_data_2.csv, volunteer_data_3.csv) into one consolidated file.

1. Remove duplicate entries based on Volunteer_ID.

3. Generate a summary report that includes:

- Total hours volunteered per city.

- Number of unique volunteers per city.

- Save the summary report as volunteer_summary_report.csv.

#### Example Usage:
Install dependencies:
`npm install csv-parser lodash fs `
Run the script:
The summary report will be saved as volunteer_summary_report.csv.


## How to run project:-

Clone the repository and navigate to the project directory:
```
git clone https://github.com/mdaijaj/goonj_assignement.git
```
cd `goonj_assignement/backend` <br>
Install dependencies:
```
npm i --f
```
Set up environment variables (e.g., change the file name example.env to .env) in .env:
```
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=aijaj123
DATABASE_NAME=goonj
```

create database manually go to dbeaver or workbench or any other database ui tool and create database goonj
or command line:- <br>
``
create database goonj
``

Start the server:

```
npm start
```

## 📋 API Routes List
Here’s a list of the available API routes for this project:

### Task 1 - User Data API:
`
Route: http://localhost/api/createUser ` <br>
`Method: Post ` <br>
`Response:-{
    "message": "Users fetched and saved successfully."
}` <br>

Description: Creates a new user in the system by storing user data fetched from the API.

### Task 2 - Donations Analysis API:
`
Route: http://localhost/api/analyzeDonations ` <br>
` Method: Post ` <br>
`Payload: formData:-
   key: file, 
   value : Donation.csv file
   `  <br>
`Response:  
"totalDonationsByCity": {
        "Delhi": 174500,
        "Mumbai": 28000,
        "Bangalore": 73000,
        "Ahmedabad": 2500,
        "Chennai": 18000,
        "Kolkata": 1003000,
        "Hyderabad": 11000
    },
    "averageDonationsByCity": {
        "Delhi": 34900,
        "Mumbai": 9333.333333333334,
        "Bangalore": 36500,
        "Ahmedabad": 2500,
        "Chennai": 9000,
        "Kolkata": 501500,
        "Hyderabad": 11000
    },
    "donorsOver10000": 6
}
` <br>

Description: Analyzes donation data from a provided CSV file.

### Task 3 - Volunteers Analysis API:
`
Route:  http://localhost/api/analyzeVolunteers ` <br>
`Method: Post ` <br>
`Payload: formData key: files, value :  file1.csv, file1.csv, file1.csv ` <br>
`Response:  {
    "message": "CSV files processed successfully.",
    "consolidatedFile": "single_volunteers.csv",
    "summaryReportFile": "volunteer_summary_report.csv",
    "summaryReport": [
        {
            "City": "Delhi",
            "Total_Hours": 11,
            "Unique_Volunteers": 3
        },
        {
            "City": "Hyderabad",
            "Total_Hours": 6,
            "Unique_Volunteers": 1
        },
        {
            "City": "Bangalore",
            "Total_Hours": 7,
            "Unique_Volunteers": 2
        },
        {
            "City": "Mumbai",
            "Total_Hours": 13,
            "Unique_Volunteers": 3
        },
        {
            "City": "Ahmedabad",
            "Total_Hours": 3,
            "Unique_Volunteers": 1
        },
        {
            "City": "Chennai",
            "Total_Hours": 5,
            "Unique_Volunteers": 1
        },
        {
            "City": "Kolkata",
            "Total_Hours": 2,
            "Unique_Volunteers": 1
        }
    ]
}` <br>

Description: Analyzes volunteer data from multiple CSV files.

