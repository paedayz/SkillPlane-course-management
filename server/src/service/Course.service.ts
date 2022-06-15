import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course.entity";
import { firebaseApp, FirebaseApp } from "../firebase/firebase-app";
import { StorageFileDto, StorageService } from "../firebase/storage.service";
import { ICourseService, IResCourseDetail } from "../interfaces";
import { Between, Like } from "typeorm";

export class CourseService implements ICourseService {
  private courseRepository = AppDataSource.manager.getRepository(Course);
  private storage: StorageService;

  constructor() {
    this.storage = new StorageService(firebaseApp);
  }

  async deleteCourse(username: string, courseId: number): Promise<string> {
    try {
      const courseData = await this.courseRepository.findOneBy({
        id: courseId,
      });

      if (!courseData) throw Error("Course not found");

      if (courseData.createdBy !== username) throw Error("No permission");

      const allPromise = [
        this.courseRepository.delete({ id: courseId }),
        this.storage.deleteSingleFile(courseData.image),
      ];

      const returnData = await Promise.all(allPromise);
      return "Delete success";
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async createCrouse(
    name: string,
    description: string,
    category: string,
    image: StorageFileDto,
    subject: string,
    startTime: string,
    endTime: string,
    duration: number,
    numberOfStudent: number,
    createdBy: string
  ): Promise<IResCourseDetail> {
    try {
      const storagePath = await this.storage.saveSingleFile(image);

      const courseDetail = await this.courseRepository.save({
        name,
        description,
        category,
        image: storagePath,
        subject,
        numberOfStudent,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration,
        createdBy,
      });

      return {
        ...courseDetail,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async getCourses(
    keyword?: string,
    minDuration?: number,
    maxDuration?: number,
    take?: number,
    skip?: number
  ): Promise<IResCourseDetail[]> {
    try {
      const queryKeyword = keyword ? keyword.toLowerCase() : "";
      const queryMinDuration = minDuration ? minDuration : 0;
      const queryMaxDuration = maxDuration ? maxDuration : 90000000;
      console.log(queryKeyword)
      console.log(queryMinDuration)
      console.log(queryMaxDuration)

      let queryKeywordString = keyword ? '(LOWER(Course.name) LIKE :keyword OR LOWER(Course.description) LIKE :keyword)' : '';
      const queryDurationString = 'Course.duration BETWEEN :min AND :max'

      const courses = await this.courseRepository
        .createQueryBuilder()
        .where(queryKeywordString, {
          keyword: `%${queryKeyword}%`,
        })
        .andWhere(queryDurationString, {
          min: queryMinDuration,
          max: queryMaxDuration,
        })
        .getMany();

      return courses;
    } catch (error) {
      console.log(error);
    }
  }
}
