import { AnswerComment } from "../../enterprise/entities/answer-coment";

export interface AnswersCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}