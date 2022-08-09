import { CognitoUserPool } from "amazon-cognito-identity-js";
import { poolData } from "../configurations";

export default new CognitoUserPool(poolData);
