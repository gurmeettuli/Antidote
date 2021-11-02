import axios from "axios";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import PatientComponent from "./component/PatientComponent";

function App() {
  const [value, setValue] = useState("1");
  const [info, setInformation] = useState([]);
  const [inactiveValues, setInactiveValues] = useState([]);
  const [randomizedValues, setRandomizedValues] = useState([]);
  // NOTE: This value can be used in the future for another tab
  // eslint-disable-next-line no-unused-vars
  const [unassignedValues, setUnassignedValues] = useState([]);

  // NOTE: Do not remove value, this helps with updating which tab should be active
  // eslint-disable-next-line no-unused-vars
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios
        .get(`http://localhost:3000/patients`)
        .catch((error) => {
          // NOTE:The state is updated here and reflect to user
          // setErrorMessage(error);
          console.log(error);
        });
      setInformation(response.data || []);
      arrangeItems(response.data);
    };

    fetch();
  }, []);

  const handleRandomizedClick = (input) => {
    setInformation([
      ...info.filter(
        (obj) => obj.location.locationId !== input.location.locationId
      ),
      input,
    ]);
    // setInformation([...info, input]);
    setRandomizedValues([...randomizedValues, input]);
  };
  const handleInactiveClick = (input) => {
    setInformation([...info, input]);
    setInactiveValues([...inactiveValues, input]);
  };

  const arrangeItems = (initialValues) => {
    const one = [],
      two = [],
      three = [];
    initialValues.forEach((val) => {
      if (val.status === "inactive") {
        one.push(val);
      }
      if (val.status === "randomized") {
        two.push(val);
      }
      three.push(val);
    });
    setInactiveValues(one);
    setRandomizedValues(two);
    // NOTE: This is the list of patients who havn't been allocated yet
    // NOTE: I am setting this value but currently it is not being used
    setUnassignedValues(three);
  };

  return (
    <Box padding="40px" background="#F0F1E5">
      <Typography fontSize="28px" variant="subtitle1" className="something">
        Patients
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, color: "lightgrey" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label={"Inactive (" + inactiveValues.length + ")"} value="1" />
            <Tab
              label={"Randomized (" + randomizedValues.length + ")"}
              value="2"
            />
            <Tab label={"All (" + info.length + ")"} value="3" />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <PatientComponent information={inactiveValues} />
        </TabPanel>
        <TabPanel value="2">
          <PatientComponent information={randomizedValues} />
        </TabPanel>
        <TabPanel value="3">
          <PatientComponent
            information={info}
            handleRandomizedClick={handleRandomizedClick}
            handleInactiveClick={handleInactiveClick}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
