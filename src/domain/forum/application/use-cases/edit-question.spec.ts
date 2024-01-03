import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository:InMemoryQuestionsRepository
let  sut: EditQuestionUseCase
describe('Edit a Question', () => {
  beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new EditQuestionUseCase(inMemoryQuestionsRepository)

})
  
  it('should be able edit a question', async () => {
   
    const newQuestion  = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

     await inMemoryQuestionsRepository.create(newQuestion)

  	 await sut.execute({
      authorId:'author-1',
      title: 'Pergunta test',
      content: 'Content Teste',
      questionId: newQuestion.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject(
      {
      title: 'Pergunta test',
      content: 'Content Teste',
     })
  
  })

  it('should not be able to Edit a question from another user', async () => {
   
    const newQuestion  = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

     await inMemoryQuestionsRepository.create(newQuestion)

    expect(async() =>  	
     await sut.execute({
      authorId:'author-2',
      title: 'Pergunta test',
      content: 'Content Teste',
      questionId: newQuestion.id.toString(),
     })).rejects.toBeInstanceOf(Error)
  
  })
})

