import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-answer-attachments-repository copy'

let inMemoryAnswersRepository:InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository:InMemoryAnswerAttachmentsRepository

let  sut: DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)

})
  
  it('should be able to dele Answer', async () => {
   
    const newAnswer  = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

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
       AnswerId: 'answer-1',
       authorId: 'author-1'
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  
  })

  it('should not be able to delete aAnswer from another user', async () => {
   
    const newQuestion  = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

     await inMemoryAnswersRepository.create(newQuestion)

    const result =   await sut.execute({
        AnswerId: 'question-1',
        authorId:  'author-3'
        })
     expect(result.isLeft()).toBe(true)
     expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

