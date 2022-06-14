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

    @Column()
    startTime: string

    @Column()
    endTime: string

    @Column()
    numberOfStudent: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
