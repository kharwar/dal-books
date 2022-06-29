import {
  Paper,
  Typography,
  Container,
} from "@mui/material";

const Home = () => {
  console.log(sessionStorage.getItem("AWS_JWT_TOKEN"));
  console.log(sessionStorage.getItem("USER_ID"));

  return (
    <Container maxWidth="md">
      <Paper sx={{ m: "50px", p: "30px" }}>
        <Typography
          variant="h5"
          component="h5"
          sx={{ lineHeight: 1.2, mb: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Home
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
