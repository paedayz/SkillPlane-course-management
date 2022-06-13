import { UserController } from "./controller/User.controller";

interface IRoute {
  method: string;
  route: string;
  controller: any;
  action: string;
  role: string | null;
}

const userRoute: IRoute[] = [
    {
      method: "post",
      route: "/register",
      controller: UserController,
      action: "register",
      role: null,
    },

    {
      method: "post",
      route: "/login",
      controller: UserController,
      action: "login",
      role: null
    },
  ];

const Routes: IRoute[] = [].concat(userRoute);

export default Routes


