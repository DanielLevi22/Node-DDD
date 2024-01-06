import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepository {

  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyQuestionId(questionId: string): Promise<void>
}