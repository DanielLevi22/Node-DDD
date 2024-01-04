import { QuestionComment } from "../../enterprise/entities/question-coment";

export interface QuestionsCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>

}