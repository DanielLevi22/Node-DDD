import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answers-coments-repository"


interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;	
  answerCommentId: string;

}

type DeleteAnswerCommentUseCaseResponse = Either<String, {}>


export class DeleteAnswerCommentUseCase {

  constructor(

    private answersCommentsRepository: AnswersCommentsRepository

  ) {}
  async execute({authorId,answerCommentId}: DeleteAnswerCommentUseCaseRequest): Promise <DeleteAnswerCommentUseCaseResponse> {

    const answerComment = await this.answersCommentsRepository.findById(answerCommentId)

    if(!answerComment) {
      return left('Answer comment not found.')
    }
    if(answerComment?.authorId.toString() !== authorId) {
      return  left('Not allowed.')
    }


  await this.answersCommentsRepository.delete(answerComment)

    return right({})
  }
}