import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {Entry} from "./Entry"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: string;
    
    @Column()
    name: string;

    @OneToMany(type => Entry, entry => entry.user)
    entries: Entry[];
}
