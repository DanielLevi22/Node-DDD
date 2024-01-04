import { QuestionComment } from "../../enterprise/entities/question-coment";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";

interface FetchQuestionQuestionUseCaseRequest {
 page: number;
 questionId: string;
}

interface FetchQuestionQuestionUseCaseResponse {
  questionsComments: QuestionComment[];
}


export class FetchQuestionQuestionUseCase {

  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository
  ) {}
  async execute({page,questionId}: FetchQuestionQuestionUseCaseRequest): Promise <FetchQuestionQuestionUseCaseResponse> {


    const questionsComments = await this.questionsCommentsRepository.findManyQuestionId(questionId,{page})

  
    return {
      questionsComments
    }
  }
}