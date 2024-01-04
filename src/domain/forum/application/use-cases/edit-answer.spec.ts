

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository:InMemoryAnswersRepository
let  sut: EditAnswerUseCase
describe('Edit a Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)

})
  
  it('should be able edit a Answer', async () => {
   
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('Answer-1'))

     await inMemoryAnswersRepository.create(newAnswer)

  	 await sut.execute({
      authorId:'author-1',
      content: 'Content Teste',
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject(
      {
    
      content: 'Content Teste',
     })
  
  })

  it('should not be able to Edit a Answer from another user', async () => {
   
    const newAnswer  = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('Answer-1'))

     await inMemoryAnswersRepository.create(newAnswer)

    expect(async() =>  	
     await sut.execute({
      authorId:'author-2',
      content: 'Content Teste',
      answerId: newAnswer.id.toString(),
     })).rejects.toBeInstanceOf(Error)
  
  })
})

