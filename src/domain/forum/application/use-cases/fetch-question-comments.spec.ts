
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { FetchQuestionQuestionUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionsCommentsRepository:InMemoryQuestionsCommentsRepository
let  sut: FetchQuestionQuestionUseCase
describe('Fetch Questions Comment', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository()
   sut = new FetchQuestionQuestionUseCase(inMemoryQuestionsCommentsRepository)

})
  
  it('should be able to fetch questions comment', async () => {
  
    await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))
    await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))
    await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))
    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })
    expect(result.value?.questionsComments).toHaveLength(3)
  })

  it('should be able to fetch paginated questions comment', async () => {
    
    for(let i = 1; i <= 22; i++) {
      await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({questionId: new UniqueEntityID('question-1')}))
    }


    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })
    expect(result.value?.questionsComments).toHaveLength(2)
  })

})

