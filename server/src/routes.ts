import { CourseController } from "./controller";
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
    role: null,
  },

  {
    method: "post",
    route: "/refreshToken",
    controller: UserController,
    action: "refreshToken",
    role: null,
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
