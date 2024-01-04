import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-coments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-coment";

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository {
  public items: AnswerComment[] = [];


  async create(answerComment: AnswerComment) {
  this.items.push(answerComment);
  }

}