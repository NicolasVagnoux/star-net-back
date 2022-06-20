export {};

declare global {
  namespace Express {
    interface Request {
      userInfo?: IUserInfo;
    }
  }
}
