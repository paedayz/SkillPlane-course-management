import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course.entity";
import { firebaseApp, FirebaseApp } from "../firebase/firebase-app";
import { StorageFileDto, StorageService } from "../firebase/storage.service";
import { ICourseService, IResCourseDetail } from "../interfaces";

export class CourseService implements ICourseService {
  private courseRepository = AppDataSource.manager.getRepository(Course)
  private storage: StorageService;

    constructor() {
        this.storage = new StorageService(firebaseApp)
    }

  async deleteCourse(username: string, courseId: number): Promise<string> {
    try {
      const courseData = await this.courseRepository.findOneBy({id: courseId})

      if(!courseData) throw Error('Course not found')

      if(courseData.createdBy !== username) throw Error('No permission')

      const allPromise = [
        this.courseRepository.delete({id: courseId}),
        this.storage.deleteSingleFile(courseData.image)
      ]

      const returnData = await Promise.all(allPromise)
      return 'Delete success'
    } catch (error) {
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
      throw new Error(error.message);
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
