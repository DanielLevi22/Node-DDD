import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository:InMemoryAnswersRepository
let  sut: DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)

})
  
  it('should be able to dele Answer', async () => {
   
    const newAnswer  = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

     await inMemoryAnswersRepository.create(newAnswer)

  	 await sut.execute({
       AnswerId: 'answer-1',
       authorId: 'author-1'
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  
  })

  it('should not be able to delete aAnswer from another user', async () => {
   
    const newQuestion  = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

     await inMemoryAnswersRepository.create(newQuestion)

    expect(async() =>  	
     await sut.execute({
     AnswerId: 'question-1',
      authorId:  'author-3'
     })).rejects.toBeInstanceOf(Error)
  
  })
})

