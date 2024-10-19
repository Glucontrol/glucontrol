import { link } from "../utilities/functions";
import { userType } from "./UserType";

export const userReducer = (state, action) => {
  switch (action.type) {
    case userType.login:
      const { email, password } = action.data;
      link.login(email, password);
      break;
    case userType.logOut:
      link.logOut();
      break;
    case userType.sesion:
      break;
    default:
      break;
  }
};
