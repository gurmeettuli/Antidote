import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function PatientInformation(props) {
  const item = props.value;
  // const handleClick = props.handleClick;
  return (
    <Grid
      container
      sx={{
        borderBottom: 1,
        borderColor: "lightgrey",
      }}
    >
      <Grid item xs={8}>
        <Typography
          className=""
          sx={{
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "1em",
            paddingTop: "15px",
            paddingLeft: "15px",
            opacity: "0.85",
          }}
        >
          {item.location.locationId +
            " - " +
            item.account.firstName +
            " " +
            item.account.lastName}
        </Typography>
        <Typography sx={{ fontSize: "0.9em", paddingLeft: "15px" }}>
          {item.location.city + ", " + item.location.countryCode}
        </Typography>
        <Box
          sx={{
            color: "#2A9285",
            fontSize: "0.9em",
            paddingLeft: "15px",
            paddingBottom: "20px",
          }}
        >
          <Typography>
            {(item.account.phone.length > 1
              ? item.account.phone + ", "
              : null) + item.account.email}
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sx={{
          borderLeft: 1,
          borderColor: "lightgrey",
          textAlign: "center",
          paddingTop: "15px",
        }}
      >
        {item.status ? (
          <Typography color="#6e6d6d">{item.status}</Typography>
        ) : (
          <Grid item xs={12}>
            <Box>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#2A9285",
                    borderColor: "#2A9285",
                    marginTop: "10px",
                    borderRadius: "20px",
                  }}
                >
                  Randomized
                </Button>
              </Grid>

              <Button
                variant="outlined"
                sx={{
                  color: "#6e6d6d",
                  borderColor: "#6e6d6d",
                  margin: "10px",
                  borderRadius: "20px",
                }}
              >
                Inactive
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

// export default withStyles(styles)(DashboardComponent);
