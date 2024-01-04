import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepository:InMemoryQuestionsRepository
let inMemoryQuestionsCommentsRepository:InMemoryQuestionsCommentsRepository
let  sut: CommentOnQuestionUseCase
describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionsCommentsRepository)

})
  
  it('should be able comment on question', async () => {
    
    const question = makeQuestion()


    await inMemoryQuestionsRepository.create(question)


  	 await sut.execute({
       questionId: question.id.toString(),
       authorId: question.authorId.toString(),
       content: 'Comment Test'
    })

    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual('Comment Test')
  
  })

 
})

