import { useEffect, useState } from "react";
import "./App.css";
import axiosInstance from "./axiosInstance";

function App() {
  const [name, setName] = useState();
  const [dob, setDob] = useState();

  const [Data, setData] = useState([]);

  // 1. Create an UI that is capable of fetching the employee basic details.

  // The details can include name, department, designation, salary, dob, address and other info that you can think of adding.

  // 2. The user must be able to add this information and when the submit button is hit , the details must be visible on the same page in form of a table.

  // 3. Then the form must be capable to take in more information of other employees and whenever the data is submitted, it must appear on the same table with addition to the previous data.

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get("/employee");
    console.log(res.data);
    setData(res.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/employee/add", {
      name: name,
      dob: dob,
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={name}
          placeholder="enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={dob}
          placeholder="enter dob"
          onChange={(e) => setDob(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      
      {Data.map((e) => {
        return (
          <>
            <div className="py-5">
              <p>{e.Name}</p>
              <p>{e.DOB}</p>
            </div>
          </>
        );
      })}
    </>
  );
}

export default App;
