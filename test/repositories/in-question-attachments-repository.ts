import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/questions-attachements-repopsitory";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  
  public items: QuestionAttachment[] = [];


  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(item => item.questionId.toString() === questionId)
    return questionAttachments
  }
  async deleteManyQuestionId(questionId:String) {
    const questionAttachments = this.items.filter(item => item.questionId.toString() !== questionId)
  
    this.items = questionAttachments
   }
}