import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Entry extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: string;

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
