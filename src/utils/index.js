export const serverInfo = {
  baseUrl:
    "https://n20q8gasae.execute-api.us-east-1.amazonaws.com",
  stagingUrl: "/staging",
  createUser: "/user/create",
};

export const regEx = {
  lettersOnly: /^[a-zA-Z\s]*$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

// Handle input changes
export const simpleChangeHandler = (event) => {
  return event.target.value;
};

// Handle changes and only accept alphabets
export const onlyTextChangeHandler = (event) => {
  return event.target.value.replace(/[^a-z]/gi, "");
};
