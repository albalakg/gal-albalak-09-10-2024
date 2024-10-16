export enum ScoreColorEnum {
  GREEN = "green",
  RED = "red",
}

export enum RoutesEnum {
  LOGIN = 'login',
  GET_CONFIGURATION = 'configuration',
  GET_SCORE = 'score', 
}

export enum ErrorEnum {
  UNKNOWN_ERROR_MESSAGE = 'Unknown error message',
  LOGIN_ERROR_MESSAGE = 'Invalid client ID',
  UNKNOWN_ERROR_CODE = 0,
  GAME_LOST = 'Game lost',
}

export enum MessageEnum {
  LOGIN_MESSAGE = 'Logged In Successfully',
  GAME_WON = 'Game Won',
}

export enum NotificationTypeEnum {
  INFO = 'info',
  ERROR = 'error',
}

export enum GameStatusEnum {
  RUNNING = 'running',
  WON = 'won',
  LOST = 'lost',
}

export enum GameLevelEnum {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  MASTER = 'master',
}