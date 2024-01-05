import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { NotAllowedError } from "./errors/not-allowed-error";


interface DeleteAnswerUseCaseRequest {
  AnswerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError
,{}>


export class DeleteAnswerUseCase {

  constructor(
    private AnswersRepository: AnswersRepository
  ) {}
  async execute({AnswerId,authorId}: DeleteAnswerUseCaseRequest): Promise <DeleteAnswerUseCaseResponse> {

    const Answer = await this.AnswersRepository.findById(AnswerId);

    if(!Answer) {
      return left(new ResourceNotFoundError())
    }

    if(authorId !== Answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.AnswersRepository.delete(Answer)
    return right({})
  }
}