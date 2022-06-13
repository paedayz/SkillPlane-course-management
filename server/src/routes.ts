import { UserController } from "./controller/User.controller";

interface IRoute {
  method: string;
  route: string;
  controller: any;
  action: string;
}

const userRoute: IRoute[] = [
    {
      method: "post",
      route: "/register",
      controller: UserController,
      action: "register",
    },
  ];

const Routes: IRoute[] = [].concat(userRoute);

export default Routes


