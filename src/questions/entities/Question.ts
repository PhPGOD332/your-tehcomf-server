import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./Category";


@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column({name: 'question_description'})
    questionDescription: string;

    @ManyToOne(() => Category, category => category.id)
    category: Category;
}