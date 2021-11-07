import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author: string;

  @Field(() => Int)
  @Column()
  pages: number;

  @Field()
  @Column()
  isCurrentlyReading: boolean;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  categories: [String] | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  description?: string | null;

  @Field(() => String)
  @CreateDateColumn()
  dateCreated: Date;

  @Field(() => String)
  @UpdateDateColumn()
  dateUpdated: Date;

  @Field(() => String, { nullable: true })
  @Column("date", { nullable: true })
  readingStartDate?: Date | null;

  @Field(() => String, { nullable: true })
  @Column("date", { nullable: true })
  readingEndDate?: Date | null;

  @Field(() => String, { nullable: true })
  @Column("interval", { nullable: true })
  readingTime?: Date | null;
}
