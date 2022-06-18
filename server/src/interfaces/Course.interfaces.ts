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
  ): Promise<IResCourseDetail | Error>;

  getCourses(
    keyword?: string,
    minDuration?: number,
    maxDuration?: number,
    take?: number,
    skip?: number,
  ) : Promise<IResCourseDetail[] | Error>

  deleteCourse(
    username: string,
    courseId: number,
  ) : Promise<string  | Error>
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
