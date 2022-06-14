import { NextFunction, Request, Response } from "express"
import { IResCourseDetail } from "../interfaces"
import { CourseService } from "../service"
import { StorageService } from "../firebase/storage.service"
import { FirebaseApp } from "../firebase/firebase-app"
import { CreateCourseBodyDto } from "../dto/Course.dto"

export class CourseController {
    private courseService = new CourseService()
    

    async createCourse(request: Request, response: Response, next: NextFunction): Promise<IResCourseDetail> {
        
        let createCourseData: CreateCourseBodyDto = request.body
        createCourseData.image = {
            buffer: request.file?.buffer,
            originalName: request.file?.originalname
        }
        
        return this.courseService.createCrouse(
            createCourseData.name,
            createCourseData.description,
            createCourseData.category,
            createCourseData.image,
            createCourseData.subject,
            createCourseData.startTime,
            createCourseData.endTime,
            parseInt(createCourseData.numberOfStudent),
            request['user'].username,
        )
    }

    
}