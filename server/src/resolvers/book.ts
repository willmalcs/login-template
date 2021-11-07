import { Book } from "../entities/Book";
import {
  Mutation,
  Resolver,
  Arg,
  Int,
  Query,
  InputType,
  Field,
} from "type-graphql";
import { sleep } from "../utils/sleep";

@InputType()
class BookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  pages: number;

  @Field(() => Boolean)
  isCurrentlyReading: boolean;

  @Field(() => [String])
  categories: [String];

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  readingStartDate: Date | null;

  @Field(() => String, { nullable: true })
  readingEndDate: Date | null;
}

@InputType()
class BookUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  author?: string;

  @Field(() => Int, { nullable: true })
  pages?: number;

  @Field(() => Boolean, { nullable: true })
  isCurrentlyReading?: boolean;

  @Field(() => [String], { nullable: true })
  categories?: [String];

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  readingStartDate?: Date | null;

  @Field(() => String, { nullable: true })
  readingEndDate?: Date | null;
}

@Resolver()
export class BookResolver {
  @Mutation(() => Book)
  async createBook(@Arg("options", () => BookInput) options: BookInput) {
    const book = await Book.create(options).save();
    return book;
  }

  @Mutation(() => Book)
  async updateBook(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => BookUpdateInput) input: BookUpdateInput
  ) {
    await Book.update({ id }, input);
    return Book.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id", () => Int) id: number) {
    await Book.delete({ id });
    return true;
  }

  @Query(() => [Book])
  async books() {
    await sleep(2000);
    return Book.find();
  }

  @Query(() => Book, { nullable: true })
  book(@Arg("id", () => Int) id: number): Promise<Book | undefined> {
    return Book.findOne(id);
  }
}

//one way to do mutations
// @Mutation(() => Boolean)
// async createBook(
//   @Arg("title", () => String) title: string,
//   @Arg("author", () => String) author: string,
//   @Arg("pages", () => Int) pages: number,
//   @Arg("currently_reading", () => Boolean) isCurrentlyReading: boolean,
//   @Arg("categories", () => [String], {nullable: true}) categories: [String],
//   @Arg("description", () => String, {nullable: true}) description?: string,
//   @Arg("reading_start_date", () => Date, {nullable: true}) readingStartDate?: Date,
//   @Arg("reading_end_date", () => Date, {nullable: true}) readingEndDate?: Date,
// ) {
//   await Book.insert({title, author, pages, description, categories, isCurrentlyReading, readingStartDate, readingEndDate})
//   return true;
// }
