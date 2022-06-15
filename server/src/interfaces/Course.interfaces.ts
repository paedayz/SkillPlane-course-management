import { StorageFileDto } from "../firebase/storage.service";

export interface ICourseService {
  createCrouse(
    name: string,
    description: string,
    category: string,
    image: StorageFileDto,
    subject: string,
    startTime: string,
    endTime: string,
    duration: number,
    numberOfStudent: number,
    createdBy: string,
  ): Promise<IResCourseDetail>;

  getCourses(
    keyword?: string,
    minDuration?: number,
    maxDuration?: number,
    page?: number,
    offset?: number,
  ) : Promise<IResCourseDetail[]>

  deleteCourse(
    username: string,
    courseId: number,
  ) : Promise<string>
}

export interface IResCourseDetail {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  numberOfStudent: number;
  createdAt: Date;
}
