interface IGetScoreResponse extends IBaseResponse {
  data: {
    score: number | null;
  } | null
}
