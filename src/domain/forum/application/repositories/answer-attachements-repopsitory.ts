import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";

export interface AnswerAttachmentsRepository {

  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyAnswerId(answerId: string): Promise<void>
}