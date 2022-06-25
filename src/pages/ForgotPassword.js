import {
  Box,
  Grid,
  Link,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import useInput from "../hooks/use-input";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { regEx, simpleChangeHandler } from "../utils";
import UserPool from "../UserPool";

const loginCognito = (formData) => {
  const authenticationData = {
    Username: formData.email,
    Password: formData.password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: formData.email,
    Pool: UserPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      var accessToken = result.getAccessToken().getJwtToken();
      var idToken = result.idToken.jwtToken;
      console.log("LoginSuccess", result);
      console.log("LoginSuccess", accessToken);
      console.log("LoginSuccess", idToken);
    },
    onFailure: (error) => {
      console.log("LoginError", error);
    },
  });
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Email
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) => regEx.email.test(value) === true,
    simpleChangeHandler
  );

  // Form Submit Handler
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    loginCognito({
      email: email,
    });
  };

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
          {"Sign In"}
        </Typography>

        <form onSubmit={formSubmissionHandler}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError && "Valid Email is required"}
          />

          <Box
            sx={{ mt: 4, position: "relative" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!emailIsValid}
              color="secondary"
            >
              Send Email
            </Button>
          </Box>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              variant="body2"
              onClick={() => navigate("/login")}
              sx={{ cursor: "pointer" }}
            >
              {"Cancel"}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
