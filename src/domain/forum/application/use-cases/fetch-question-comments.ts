import { Either, right } from "@/core/either";
import { QuestionComment } from "../../enterprise/entities/question-coment";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";

interface FetchQuestionQuestionUseCaseRequest {
 page: number;
 questionId: string;
}

type FetchQuestionQuestionUseCaseResponse = Either<
null,
{
  questionsComments: QuestionComment[];
}> 


export class FetchQuestionQuestionUseCase {

  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository
  ) {}
  async execute({page,questionId}: FetchQuestionQuestionUseCaseRequest): Promise <FetchQuestionQuestionUseCaseResponse> {


    const questionsComments = await this.questionsCommentsRepository.findManyQuestionId(questionId,{page})

  
    return right({
      questionsComments
    })
  }
}