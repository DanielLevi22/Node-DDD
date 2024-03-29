import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'

let inMemoryQuestionsCommentsRepository:InMemoryQuestionsCommentsRepository
let  sut: DeleteQuestionCommentUseCase
describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsCommentsRepository)

})
  
  it('should be able dele a question comment', async () => {
    
    const questionComment = makeQuestionComment()


    await inMemoryQuestionsCommentsRepository.create(questionComment)


  	 await sut.execute({
       questionCommentId: questionComment.id.toString(),
       authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(0)
  
  })

  it('should not be able dele another user question  comment', async () => {
    
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1')
    })


    await inMemoryQuestionsCommentsRepository.create(questionComment)


  	 

  const result =  await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
   })
    
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

 
})

