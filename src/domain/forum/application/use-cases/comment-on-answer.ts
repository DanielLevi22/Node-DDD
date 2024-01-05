import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "../../enterprise/entities/answer-coment";
import { AnswersCommentsRepository } from "../repositories/answers-coments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;	
  answerId: string;
  content: string;

}

type CommentOnAnswerUseCaseResponse = Either<
ResourceNotFoundError,{ 
answerComment: AnswerComment;

}> 


export class CommentOnAnswerUseCase {

  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentsRepository: AnswersCommentsRepository

  ) {}
  async execute({authorId,content,answerId}: CommentOnAnswerUseCaseRequest): Promise <CommentOnAnswerUseCaseResponse> {

    const answer = await this.answersRepository.findById(answerId)

    if(!answer) {
     return left(new ResourceNotFoundError())
    }


  const answerComment = AnswerComment.create({
    authorId: new UniqueEntityID(authorId),
    answerId: new UniqueEntityID(answerId),
    content,

  })

  await this.answersCommentsRepository.create(answerComment)

    return right({
      answerComment
    })
  }
}