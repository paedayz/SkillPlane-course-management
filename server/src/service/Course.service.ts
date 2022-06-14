import { StorageFileDto } from "../firebase/storage.service";
import { ICourseService, IResCourseDetail } from "../interfaces";

export class CourseService implements ICourseService {
    
  createCrouse(
    name: string,
    description: string,
    category: string,
    image: StorageFileDto,
    subject: string,
    startTime: string,
    endTime: string,
    numberOfStudent: number
  ): Promise<IResCourseDetail> {
    throw new Error("Method not implemented.");
  }
  getCourses(
    keyword?: string,
    page?: number,
    offset?: number
  ): Promise<IResCourseDetail[]> {
    throw new Error("Method not implemented.");
  }
}
