import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-answer-attachments-repository copy'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-question-attachments-repository'


let inMemoryAnswerAttachmentsRepository:InMemoryAnswerAttachmentsRepository
let inMemoryQuestionAttachmentsRepository:InMemoryQuestionAttachmentsRepository

let inMemoryAnswersRepository:InMemoryAnswersRepository
let inMemoryQuestionsRepository:InMemoryQuestionsRepository
let  sut: ChooseQuestionBestAnswerUseCase
describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
     inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)

})
  
  it('should be able to choose the question  best answer', async () => {
    
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepository.create(question)
     await inMemoryAnswersRepository.create(answer)

  	 await sut.execute({
       answerId: answer.id.toString(),
       authorId: question.authorId.toString()
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  
  })

  it('should not be able to choose another user question best answer', async () => {
   
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    })
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepository.create(question)
     await inMemoryAnswersRepository.create(answer)

    const result =  await sut.execute({
      answerId: answer.id.toString(),
      authorId:  'author-3'
     })
  
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })
})

