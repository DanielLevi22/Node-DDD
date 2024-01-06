import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-question-attachments-repository'
let inMemoryQuestionsRepository:InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository:InMemoryQuestionAttachmentsRepository
let  sut: CreateQuestionUseCase
describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
  sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)

})
  
  it('should be able to create a question ', async () => {
   
    const result = await sut.execute({
      authorId: '1',
      title: 'Pergunta 1',
      content: 'texto qualquer',
      attachmentsIds: ['1', '2']
    })
  


    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(result.value?.question.id)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') },)
    ])

    
  })
})

