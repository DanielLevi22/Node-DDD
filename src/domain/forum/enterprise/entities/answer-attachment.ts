import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";


export interface AnswersAttachmentProps {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswersAttachmentProps> {
  get answerId() {
  return this.props.answerId;
  }
  get attachmentId() {
  return this.props.attachmentId;
  }

  static create(props: AnswersAttachmentProps, id?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, id)
    
    return attachment
}
}