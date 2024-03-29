

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-answer-attachments-repository copy'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswersRepository:InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository:InMemoryAnswerAttachmentsRepository

let  sut: EditAnswerUseCase
describe('Edit a Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    sut = new EditAnswerUseCase(inMemoryAnswersRepository,inMemoryAnswerAttachmentsRepository)

})
  
  it('should be able edit a Answer', async () => {
   
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('Answer-1'))

     await inMemoryAnswersRepository.create(newAnswer)
     inMemoryAnswerAttachmentsRepository.items.push(makeAnswerAttachment({
      answerId: newAnswer.id,
      attachmentId: new UniqueEntityID('1')
     }),
     makeAnswerAttachment({
      answerId: newAnswer.id,
      attachmentId: new UniqueEntityID('2')
     }))
  	 await sut.execute({
      authorId:'author-1',
      content: 'Content Teste',
      answerId: newAnswer.id.toString(),
      attachmentsIds: ['1', '3']
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({ content: 'Content Teste' })
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') },)
    ])
  })


  it('should not be able to Edit a Answer from another user', async () => {
   
    const newAnswer  = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('Answer-1'))

     await inMemoryAnswersRepository.create(newAnswer)
    
    const result =  await sut.execute({
      authorId:'author-2',
      content: 'Content Teste',
      answerId: newAnswer.id.toString(),
      attachmentsIds: []
     })

     expect(result.isLeft()).toBe(true)
     expect(result.value).toBeInstanceOf(NotAllowedError)
    
  
  })
})

