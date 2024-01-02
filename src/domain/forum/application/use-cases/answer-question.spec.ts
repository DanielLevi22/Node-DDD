import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository:InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)

})
  
  it('should be able to create a answer ', async () => {
   
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: 'Pergunta 1',
      content: 'texto qualquer',
    })
  
    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('texto qualquer')

  
  })
})

