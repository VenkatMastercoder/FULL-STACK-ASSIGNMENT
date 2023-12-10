const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

app.use(express.json());

// 1 - connect with db

const dbPath = path.join(__dirname, "employee.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/employee", async (request, response) => {
  const getEmployeeDataQuery = `
    SELECT
      *
    FROM
      employee;`;
  const employeeData = await db.all(getEmployeeDataQuery);
  response.send(employeeData);
});

app.post("/employee/add", async (request, response) => {
  const employee = request.body;
  console.log(employee)
  const { name, dob } = employee;
  const addEmployeeQuery = `
    INSERT INTO
      employee (name,dob)
    VALUES
      (
        '${name}',
         '${dob}'
      );`;

  const dbResponse = await db.run(addEmployeeQuery);
  response.status(200).json({ data: dbResponse });
});

app.get("/", (res) => {
  res.send("I am Backend");
});
