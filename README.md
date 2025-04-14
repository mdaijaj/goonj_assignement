mysql with sequlize

# Goonj Engineering Tasks

This repository contains solutions for three key data engineering tasks: 
- Fetching data from a REST API and storing it in a database.
- Processing and analyzing donation data.
- Automating the workflow for volunteer data.

The solutions are implemented in **Node.js** with various libraries for handling HTTP requests, working with databases, and processing CSV files.

---

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

## 📋 API Routes List
Here’s a list of the available API routes for this project:

### Task 1 - User Data API:
`
Route: POST /api/createUser
` <br>
Description: Creates a new user in the system by storing user data fetched from the API.

Controller: userController.createUser

### Task 2 - Donations Analysis API:
`
Route: POST /api/analyzeDonations
` <br>
Description: Analyzes donation data from a provided CSV file.

Controller: userController.analysisDonation

File Upload: Uses uploadDonation.single('file') to upload a single donation file for analysis.

### Task 3 - Volunteers Analysis API:
`
Route: POST /api/analyzeVolunteers
` <br>

Description: Analyzes volunteer data from multiple CSV files.

Controller: userController.analysisVolunteers

File Upload: Uses uploadVolunteer.array('files', 10) to upload up to 10 volunteer data files for analysis.

## 🧰 Requirements
Dependencies:
Axios: For making API requests.

Sequelize / mysql2: For interacting with MySQL/PostgreSQL.

csv-parser: For reading CSV files.

Lodash: For data manipulation.

To install all required dependencies, run:
`npm install`

`


