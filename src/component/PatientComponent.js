import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PatientInformation from "./PatientInformation";

export default function PatientComponent(props) {
  const item = props.information;
  const handleRandomizedClick = props.handleRandomizedClick;
  const handleInactiveClick = props.handleInactiveClick;

  return (
    <Box sx={{ backgroundColor: "#FFF", border: 1, borderColor: "lightgrey" }}>
      {/* NOTE: If locationId is different for all patients then that can be used as the key for eaach patients */}
      {/* NOTE: Missing attributes Gender, Age/DOB */}
      <Typography
        sx={{
          borderBottom: 1,
          borderColor: "lightgrey",
          padding: "15px",
        }}
      >
        Patient Details
      </Typography>
      {item.map((singular, index) => (
        <PatientInformation
          key={index}
          value={singular}
          handleInactiveClick={handleInactiveClick}
          handleRandomizedClick={handleRandomizedClick}
        />
      ))}
    </Box>
  );
}
