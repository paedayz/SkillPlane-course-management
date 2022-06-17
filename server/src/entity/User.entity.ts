import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    hashPassword: string

    @Column()
    role: string

    @Column({default: null})
    hashRefreshToken: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    nickname: string;

    @Column({type: 'timestamp'})
    birthday: Date;

    @Column({default: null})
    gender: string;

   

}
