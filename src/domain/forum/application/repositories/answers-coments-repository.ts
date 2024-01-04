import { AnswerComment } from "../../enterprise/entities/answer-coment";

export interface AnswersCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>

}