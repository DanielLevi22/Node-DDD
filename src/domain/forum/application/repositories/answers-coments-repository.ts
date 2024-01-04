import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-coment";

export interface AnswersCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}