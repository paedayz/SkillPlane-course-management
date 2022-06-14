import { StorageFileDto } from "../firebase/storage.service";

export class CreateCourseBodyDto {
    name: string;
    description: string;
    category: string;
    image: StorageFileDto;
    subject: string;
    startTime: string;
    endTime: string;
    numberOfStudent: string;
}