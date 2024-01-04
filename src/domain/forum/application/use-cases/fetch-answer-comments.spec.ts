import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerAnswerUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswersCommentsRepository:InMemoryAnswersCommentsRepository
let  sut: FetchAnswerAnswerUseCase
describe('Fetch Answers Comment', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
   sut = new FetchAnswerAnswerUseCase(inMemoryAnswersCommentsRepository)

})
  
  it('should be able to fetch answers comment', async () => {
  
    await inMemoryAnswersCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))
    await inMemoryAnswersCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))
    await inMemoryAnswersCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))
    const { answersComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1
    })
    expect(answersComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answers comment', async () => {
    
    for(let i = 1; i <= 22; i++) {
      await inMemoryAnswersCommentsRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answer-1')}))
    }


    const { answersComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2
    })
    expect(answersComments).toHaveLength(2)
  })

})

