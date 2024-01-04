import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/questions-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-coment";

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
  public items: QuestionComment[] = [];
  async  findById(id: string) {
    const questionComment =  this.items.find(item => item.id.toString() === id)
    if(!questionComment) {
     return null
    }
    return questionComment
    }
  async create(questionComment: QuestionComment) {
  this.items.push(questionComment);
  }
  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex( item => item.id === questionComment.id)
    this.items.splice(itemIndex, 1)
  }

}