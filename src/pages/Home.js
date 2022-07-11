import { Paper, Grid, Container } from "@mui/material";
import BookTile from "../components/book-tile";
import { books } from "../data";

const Home = () => {
  console.log(sessionStorage.getItem("AWS_JWT_TOKEN"));
  console.log(sessionStorage.getItem("USER_ID"));

  return (
    <Container maxWidth="lg">
      <Paper sx={{ m: "50px", p: "30px" }}>
        <Grid container spacing={3} rowGap={2}>
          {books.map((book) => (
            <Grid item xs={4}>
              <BookTile key={book.id} {...book} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
