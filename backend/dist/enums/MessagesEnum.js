export var MessagesEnum;
(function (MessagesEnum) {
    MessagesEnum["LOGIN_SUCCESS"] = "Login successful";
    MessagesEnum["GET_SCORE_SUCCESS"] = "Get ccore successful";
    MessagesEnum["GET_CONFIGURATION_SUCCESS"] = "Get configuration successful";
    MessagesEnum["GET_CONFIGURATION_ERROR"] = "Failed getting the configuration";
    MessagesEnum["INVALID_CLIENT_ID"] = "Invalid client ID";
    MessagesEnum["INVALID_CLIENT_TOKEN"] = "Invalid client token";
    MessagesEnum["ERROR"] = "error";
})(MessagesEnum || (MessagesEnum = {}));
export default MessagesEnum;
export var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["LOGIN"] = 100] = "LOGIN";
    ErrorCodes[ErrorCodes["GET_SCORE"] = 200] = "GET_SCORE";
    ErrorCodes[ErrorCodes["CONFIGURATION"] = 300] = "CONFIGURATION";
})(ErrorCodes || (ErrorCodes = {}));
