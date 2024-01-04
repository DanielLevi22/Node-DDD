import { AnswersCommentsRepository } from "../repositories/answers-coments-repository"


interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;	
  answerCommentId: string;

}

interface DeleteAnswerCommentUseCaseResponse {}


export class DeleteAnswerCommentUseCase {

  constructor(

    private answersCommentsRepository: AnswersCommentsRepository

  ) {}
  async execute({authorId,answerCommentId}: DeleteAnswerCommentUseCaseRequest): Promise <DeleteAnswerCommentUseCaseResponse> {

    const answerComment = await this.answersCommentsRepository.findById(answerCommentId)

    if(!answerComment) {
      throw new Error('Answer not found.')
    }
    if(answerComment?.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }


  await this.answersCommentsRepository.delete(answerComment)

    return {}
  }
}