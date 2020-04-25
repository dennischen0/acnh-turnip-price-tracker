import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Entry extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.entries)
    user: User;

    @Column()
    buyPrice: number;

    @Column()
    monAM: number;

    @Column()
    monPM: number;

    @Column()
    tueAM: number;

    @Column()
    tuePM: number;

    @Column()
    wedAM: number;

    @Column()
    wedPM: number;

    @Column()
    thuAM: number;

    @Column()
    thuPM: number;

    @Column()
    friAM: number;

    @Column()
    friPM: number;

    @Column()
    satAM: number;

    @Column()
    satPM: number;

}
