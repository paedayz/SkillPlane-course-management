import { CourseController } from "./controller";
import { UserController } from "./controller/User.controller";

interface IRoute {
  method: string;
  route: string;
  controller: any;
  action: string;
  role: "user" | "admin" | null;
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
    role: null,
  },

  {
    method: "get",
    route: "/user",
    controller: UserController,
    action: "getUserCredentials",
    role: "user",
  },

  {
    method: "post",
    route: "/refreshToken",
    controller: UserController,
    action: "refreshToken",
    role: null,
  },

  {
    method: "delete",
    route: "/logout",
    controller: UserController,
    action: "logout",
    role: "user",
  },
];

const courseRoute: IRoute[] = [
  {
    method: "post",
    route: "/course",
    controller: CourseController,
    action: "createCourse",
    role: "admin",
  },
  {
    method: "delete",
    route: "/course/:courseId",
    controller: CourseController,
    action: "deleteCourse",
    role: "admin",
  },
  {
    method: "get",
    route: "/course",
    controller: CourseController,
    action: "getCourses",
    role: "user",
  },
];
const Routes: IRoute[] = [].concat(userRoute, courseRoute);

export default Routes;
