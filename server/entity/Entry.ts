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

    beautify() {
        const data = {
            userID: this.userID,
            buyPrice: this.buyPrice,
            monday: {
              AM: this.monAM,
              PM: this.monPM
            },
            tuesday: {
              AM: this.tueAM,
              PM: this.tuePM
            },
            wednesday: {
              AM: this.wedAM,
              PM: this.wedPM
            },
            thursday: {
              AM: this.thuAM,
              PM: this.thuPM
            },
            friday: {
              AM: this.friAM,
              PM: this.friPM
            },
            saturday: {
              AM: this.satAM,
              PM: this.satPM
            },
        };
        return data;
    }

}
