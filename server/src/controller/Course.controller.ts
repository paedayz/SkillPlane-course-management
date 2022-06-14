import { NextFunction, Request, Response } from "express"
import { IResCourseDetail } from "../interfaces"
import { CourseService } from "../service"
import { StorageService } from "../firebase/storage.service"
import { FirebaseApp } from "../firebase/firebase-app"

export class CourseController {
    private courseService = new CourseService()
    private storage: StorageService;

    constructor() {
        const firebaseApp = new FirebaseApp()
        this.storage = new StorageService(firebaseApp)
    }

    async createCourse(request: Request, response: Response, next: NextFunction): Promise<IResCourseDetail> {
        // const body = request.body
        console.log(request['file'])
        this.storage.saveSingleFile({
            buffer: request['file'].buffer,
            path: request['file'].originalname
        })
        return null
        // return await this.courseService.createCrouse()
    }

    
}