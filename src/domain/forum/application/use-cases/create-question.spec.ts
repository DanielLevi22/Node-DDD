import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository:InMemoryQuestionsRepository
let  sut: CreateQuestionUseCase
describe('Create question', () => {
  beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)

})
  
  it('should be able to create a question ', async () => {
   
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Pergunta 1',
      content: 'texto qualquer',
    })
  
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  
  })
})

