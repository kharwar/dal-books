import { useContext } from "react";
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
import { AuthContext } from "../context";
import { snackbar } from "../components";

const loginCognito = (formData, navigate, setLogin) => {
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
      localStorage.setItem("AWS_JWT_TOKEN", result.idToken.jwtToken);
      localStorage.setItem("USER_ID", result.idToken.payload.sub);
      snackbar.current.showSnackbar(true, result.message);
      setLogin(true);
      navigate("/");
    },
    onFailure: (error) => {
      snackbar.current.showSnackbar(true, error.message);
    },
  });
};

// const saveUserToDb = async (token) => {
//   try {
//     const response = await axios.post(
//       serverInfo.baseUrl + serverInfo.stagingUrl + serverInfo.createUser,
//       {
//         userId: "test",
//         email: "testEmail",
//         firstName: "Tasnim",
//         lastName: "Khan",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log(response);
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//   }
// };

const Login = () => {
  const { isLogin, setLogin } = useContext(AuthContext);
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

  // Password
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "", simpleChangeHandler);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  // Form Submit Handler
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    loginCognito(
      {
        email: email,
        password: password,
      },
      navigate,
      setLogin
    );
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

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth={true}
            sx={{
              mt: 2,
            }}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError && "Password is required"}
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
              disabled={!formIsValid}
              color="secondary"
            >
              Login
            </Button>
          </Box>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item xs>
            <Link
              variant="body2"
              onClick={() => navigate("/forgot-password")}
              sx={{ cursor: "pointer" }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              variant="body2"
              onClick={() => navigate("/signup")}
              sx={{ cursor: "pointer" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
