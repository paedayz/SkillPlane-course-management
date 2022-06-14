import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course.entity";
import { FirebaseApp } from "../firebase/firebase-app";
import { StorageFileDto, StorageService } from "../firebase/storage.service";
import { ICourseService, IResCourseDetail } from "../interfaces";

export class CourseService implements ICourseService {
  private courseRepository = AppDataSource.manager.getRepository(Course)
  private storage: StorageService;

    constructor() {
        const firebaseApp = new FirebaseApp()
        this.storage = new StorageService(firebaseApp)
    }
  deleteCourse(username: string, courseId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
    
  async createCrouse(
    name: string,
    description: string,
    category: string,
    image: StorageFileDto,
    subject: string,
    startTime: string,
    endTime: string,
    numberOfStudent: number,
    createdBy: string,
  ): Promise<IResCourseDetail> {
    try {
      const storagePath = await this.storage.saveSingleFile(image)

      const courseDetail = await this.courseRepository.save({
        name,
        description,
        category,
        image: storagePath,
        subject,
        numberOfStudent,
        startTime,
        endTime,
        createdBy
      })

      return {
        ...courseDetail
      }
    } catch (error) {
      
    }
  }
  getCourses(
    keyword?: string,
    page?: number,
    offset?: number
  ): Promise<IResCourseDetail[]> {
    throw new Error("Method not implemented.");
  }
}
