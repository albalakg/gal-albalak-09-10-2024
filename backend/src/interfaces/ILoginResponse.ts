interface ILoginResponse extends IBaseResponse {
  data: {
    token: string | null;
  } | null
}
