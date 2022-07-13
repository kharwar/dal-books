import { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverInfo } from "../../utils";
import { snackbar } from "../../components";
import { PointsContext } from "../../context";

const getUserDetails = async (userId, setPostedUser) => {
  const jwtToken = localStorage.getItem("AWS_JWT_TOKEN");

  try {
    const response = await axios.get(
      serverInfo.baseUrl + serverInfo.users + "/" + userId,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "content-type": "application/json",
        },
      }
    );
    const name =
      response.data.data.Item.firstName +
      " " +
      response.data.data.Item.lastName;
    setPostedUser(name);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateBookRented = async (props, setRented) => {
  const jwtToken = localStorage.getItem("AWS_JWT_TOKEN");
  const userId = localStorage.getItem("USER_ID");

  try {
    const response = await axios.put(
      serverInfo.baseUrl + serverInfo.books,
      {
        bookId: props.bookId,
        title: props.title,
        description: props.description,
        author: props.author,
        points: props.points,
        imageUrl: props.imageUrl,
        userId: props.userId,
        rentedBy: userId,
        isRented: true,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "content-type": "application/json",
        },
      }
    );
    setRented(true);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateUser = async (userPoints) => {
  const jwtToken = localStorage.getItem("AWS_JWT_TOKEN");
  const userId = localStorage.getItem("USER_ID");
  const firstName = localStorage.getItem("USER_FIRST_NAME");
  const lastName = localStorage.getItem("USER_LAST_NAME");
  const email = localStorage.getItem("USER_EMAIL");

  try {
    const response = await axios.post(
      serverInfo.baseUrl + serverInfo.users,
      {
        userId: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        points: userPoints
      }
    );

    localStorage.setItem("USER_POINTS", userPoints);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

function BookTile(props) {
  const [isRented, setRented] = useState(props.isRented);
  const [postedByMe, setPostedByMe] = useState(false);
  const [postedUser, setPostedUser] = useState("");
  const { userPoints, setUserPoints } = useContext(PointsContext);
  const loggedInUserId = localStorage.getItem("USER_ID");

  useEffect(() => {
    if (props.userId !== loggedInUserId) {
      getUserDetails(props.userId, setPostedUser);
    } else {
      setPostedUser("Me!!!");
      setPostedByMe(true);
    }
  }, []);

  const borrowClickHandler = (event) => {
    const loggedInUserPoints = localStorage.getItem("USER_POINTS");

    if (props.points > loggedInUserPoints) {
      snackbar.current.showSnackbar(true, "Not enough points!");
      return;
    }
    const newPoints = loggedInUserPoints - props.points;
    
    setUserPoints(newPoints);

    updateBookRented(props, setRented);
    updateUser(newPoints);
    snackbar.current.showSnackbar(true, "Book Successfully Borrowed!");
  };

  return (
    <Card>
      <CardActionArea component={Link} to={`/book/${props.bookId}`}>
        <CardMedia
          component="img"
          image={props.imageUrl}
          sx={{
            height: {
              xs: 150,
              md: 200,
            },
            width: { md: "100%" },
          }}
        />
        <CardContent>
          <Typography variant="h6">{props.title}</Typography>
          <Typography sx={{ color: "#888" }} variant="caption">
            {props.description}
          </Typography>
          <br />
          <Typography sx={{ color: "#888" }} variant="overline">
            {`${props.author}`}
          </Typography>
          <br />
          <Typography sx={{ color: "#888" }} variant="caption">
            {`Posted by: ${postedUser}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider></Divider>
      <CardActions>
        <Grid container>
          <Grid textAlign="center" item xs={6}>
            <Typography sx={{ color: "#888" }} variant="overline">
              {props.points} Points Needed
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isRented || postedByMe}
              onClick={borrowClickHandler}
            >
              {isRented && !postedByMe && "Borrowed"}
              {postedByMe && "My Book"}
              {!isRented && !postedByMe && "Borrow"}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default BookTile;
