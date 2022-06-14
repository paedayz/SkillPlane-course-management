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
    numberOfStudent: number
  ): Promise<IResCourseDetail>;

  getCourses(
    keyword?: string,
    page?: number,
    offset?: number,
  ) : Promise<IResCourseDetail[]>
}

export interface IResCourseDetail {
  name: string;
  description: string;
  category: string;
  image: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  numberOfStudent: number;
  createdAt: Date;
}
