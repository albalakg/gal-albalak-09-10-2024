export enum MessagesEnum {
  LOGIN_SUCCESS = "Login successful",
  GET_SCORE_SUCCESS = "Get ccore successful",
  GET_CONFIGURATION_SUCCESS = "Get configuration successful",
  GET_CONFIGURATION_ERROR = "Failed getting the configuration",
  INVALID_CLIENT_ID = "Invalid client ID",
  INVALID_CLIENT_TOKEN = "Invalid client token",
  ERROR = "error",
}

export default MessagesEnum;


export enum ErrorCodes {
  LOGIN = 100,
  GET_SCORE = 200,
  CONFIGURATION = 300,
}