import { useState, useEffect } from "react";
import { Paper, Grid, Container } from "@mui/material";
import BookTile from "../components/book-tile";
import { books } from "../data";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { snackbar } from "../components";
import { serverInfo } from "../utils";

const getAllBooksFromDb = async () => {
  const jwtToken = localStorage.getItem("AWS_JWT_TOKEN");

  try {
    const response = await axios.get(
      serverInfo.baseUrl + serverInfo.books,
      {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'content-type': 'application/json'
        },
      }
    );
    snackbar.current.showSnackbar(true, response.message);
  } catch (error) {
    console.log(`Error: ${error}`);
    snackbar.current.showSnackbar(true, error.message);
  }
};

const Home = () => {
  const [postedBooks, setPostedBooks] = useState([]);

  useEffect(() => {
    getAllBooksFromDb();
  }, []);


  return (
    <Container maxWidth="lg">
      <Paper sx={{ m: "50px", p: "30px" }}>
        <Grid container spacing={3} rowGap={2}>
          {postedBooks.map((book) => (
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