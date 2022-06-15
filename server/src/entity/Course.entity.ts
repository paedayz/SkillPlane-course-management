import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    category: string

    @Column()
    image: string

    @Column()
    subject: string

    @Column({type: 'timestamp'})
    startTime: Date

    @Column({type: 'timestamp'})
    endTime: Date

    @Column()
    numberOfStudent: number

    @Column()
    duration: number

    @Column()
    createdBy: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
