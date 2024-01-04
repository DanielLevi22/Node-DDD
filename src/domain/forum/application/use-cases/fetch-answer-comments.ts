import { AnswerComment } from "../../enterprise/entities/answer-coment";
import { AnswersCommentsRepository } from "../repositories/answers-coments-repository";

interface FetchAnswerAnswerUseCaseRequest {
 page: number;
 answerId: string;
}

interface FetchAnswerAnswerUseCaseResponse {
  answersComments: AnswerComment[];
}


export class FetchAnswerAnswerUseCase {

  constructor(
    private answersCommentsRepository: AnswersCommentsRepository
  ) {}
  async execute({page,answerId}: FetchAnswerAnswerUseCaseRequest): Promise <FetchAnswerAnswerUseCaseResponse> {


    const answersComments = await this.answersCommentsRepository.findManyAnswerId(answerId,{page})

  
    return {
      answersComments
    }
  }
}