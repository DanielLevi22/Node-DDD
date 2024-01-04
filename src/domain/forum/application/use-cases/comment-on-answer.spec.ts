
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswersRepository:InMemoryAnswersRepository
let inMemoryAnswersCommentsRepository:InMemoryAnswersCommentsRepository
let  sut: CommentOnAnswerUseCase
describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswersCommentsRepository)

})
  
  it('should be able comment on answer', async () => {
    
    const answer = makeAnswer()


    await inMemoryAnswersRepository.create(answer)


  	 await sut.execute({
       answerId: answer.id.toString(),
       authorId: answer.authorId.toString(),
       content: 'Comment Test'
    })

    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual('Comment Test')
  
  })

 
})

