import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachment,AnswersAttachmentProps } from "@/domain/forum/enterprise/entities/answer-attachment";
export function makeAnswerAttachment(
  override: Partial<AnswersAttachmentProps> = {},
  id?: UniqueEntityID,
) {
 const answerAttachment = AnswerAttachment.create(
  {
 
  answerId:  new UniqueEntityID(),
  attachmentId: new UniqueEntityID(),
  ...override
  }, id
)
  return answerAttachment
}