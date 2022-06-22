import {
  Container,
  Paper,
  TextField,
  Typography,
  Rating,
  styled,
  Grid,
  Button,
  Box,
} from "@mui/material";
import useInput from "../hooks/use-input";
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
const Review = () => {
  const onlyTextChangeHandler = (e) => {
    return e.target.value.replace(/[^a-zA-z0-9]/gi, "");
  };

  const simpleChangeHandler = (e) => {
    return e.target.value;
  };
  //Book Name
  const {
    value: bookName,
    isValid: bookNameIsValid,
    hasError: bookNameHasError,
    valueChangeHandler: bookNameChangeHandler,
    inputBlurHandler: bookNameBlurHandler,
    reset: resetBookNameInput,
  } = useInput((value) => value.trim() !== "", onlyTextChangeHandler);

  // Message
  const {
    value: message,
    isValid: messageIsValid,
    hasError: messageHasError,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: resetMessageInput,
  } = useInput((value) => value.trim(), onlyTextChangeHandler);

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    console.log(bookName);
    console.log(message);
    // console.log(rating);
  };

  let formIsValid = false;

  formIsValid = bookNameIsValid;

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
          {"Review your book"}
        </Typography>

        <form onSubmit={formSubmissionHandler}>
          <TextField
            id="bookName"
            label="Book Name"
            variant="outlined"
            fullWidth={true}
            sx={{ mt: 2 }}
            value={bookName}
            onChange={bookNameChangeHandler}
            onBlur={bookNameBlurHandler}
            error={bookNameHasError}
            helperText={bookNameHasError && "Book Name is Required."}
          />
          <TextField
            id="message"
            label="Message (Optional)"
            variant="outlined"
            fullWidth={true}
            multiline={true}
            rows={5}
            sx={{ mt: 4 }}
            value={message}
            onChange={messageChangeHandler}
          />
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledRating
              id="rating"
              defaultValue={5}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              highlightSelectedOnly
              sx={{ mt: 5 }}
              // value={rating}
              // onChange={ratingChangeHandler}
              // onBlur={ratingBlurHandler}
              size="large"
            />
          </Container>
          <Box
            sx={{ mt: 4, position: "relative" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!formIsValid}
              color="secondary"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Container style={{ height: "20px" }} {...other}>
      {customIcons[value].icon}
    </Container>
  );
}
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfied color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfied color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfied color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAlt color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfied color="success" />,
    label: "Very Satisfied",
  },
};
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

export default Review;
