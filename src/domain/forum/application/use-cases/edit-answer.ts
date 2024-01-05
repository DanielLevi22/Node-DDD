import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";


interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,
{
  answer: Answer
}>


export class EditAnswerUseCase {

  constructor(
    private AnswersRepository: AnswersRepository
  ) {}
  async execute({authorId,content,answerId}: EditAnswerUseCaseRequest): Promise <EditAnswerUseCaseResponse> {

    const answer = await this.AnswersRepository.findById(answerId);

    if(!answer) {
    return left(new ResourceNotFoundError())
    }

    if(authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }


    answer.content = content

    await this.AnswersRepository.save(answer)
    return right({
      answer
    })
  }
}