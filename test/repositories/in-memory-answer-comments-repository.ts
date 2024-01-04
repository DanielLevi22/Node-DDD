import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-coments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-coment";

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository {
  public items: AnswerComment[] = [];
  async  findById(id: string) {
    const answerComment =  this.items.find(item => item.id.toString() === id)
    if(!answerComment) {
     return null
    }
    return answerComment
    }

  async create(answerComment: AnswerComment) {
  this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex( item => item.id === answerComment.id)
    this.items.splice(itemIndex, 1)
  }

}