import { NextFunction, Request, Response } from "express";
import { IResCourseDetail } from "../interfaces";
import { CourseService } from "../service";
import { StorageService } from "../firebase/storage.service";
import { FirebaseApp } from "../firebase/firebase-app";
import { CreateCourseBodyDto, GetCourseQueryDto } from "../dto/Course.dto";

export class CourseController {
  private courseService = new CourseService();

  async createCourse(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResCourseDetail> {
    let createCourseData: CreateCourseBodyDto = request.body;

    createCourseData.image = {
      buffer: request.file?.buffer,
      originalName: request.file?.originalname,
    };

    return this.courseService.createCrouse(
      createCourseData.name,
      createCourseData.description,
      createCourseData.category,
      createCourseData.image,
      createCourseData.subject,
      createCourseData.startTime,
      createCourseData.endTime,
      parseInt(createCourseData.duration),
      parseInt(createCourseData.numberOfStudent),
      request["user"].username
    );
  }

  async deleteCourse(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<string> {
    if (!request.params.courseId) throw Error("Course id not found");

    const username = request["user"].username;
    const courseId = parseInt(request.params.courseId);

    return this.courseService.deleteCourse(username, courseId);
  }

  async getCourses(request: Request, response: Response, next: NextFunction) {
    const params: GetCourseQueryDto = request.query;
    return await this.courseService.getCourses(
      params.keyword,
      parseInt(params.minDuration),
      parseInt(params.maxDuration),
      parseInt(params.take),
      parseInt(params.skip)
    );
  }
}
