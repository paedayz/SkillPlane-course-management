import { StorageFileDto } from "../firebase/storage.service";

export class CreateCourseBodyDto {
    name: string;
    description: string;
    category: string;
    image: StorageFileDto;
    subject: string;
    startTime: string;
    duration: string;
    endTime: string;
    numberOfStudent: string;
}

export class GetCourseQueryDto {
    keyword?: string;
    minDuration?: string;
    maxDuration?: string;
    take?: string;
    skip?: string;
}