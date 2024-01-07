import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-answer-attachments-repository copy"


let inMemoryAnswersRepository:InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository:InMemoryAnswerAttachmentsRepository


describe('On Answer Created', () => {
beforeEach(() => {
  inMemoryAnswerAttachmentsRepository = new  InMemoryAnswerAttachmentsRepository()
  inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
})
  it('should send notification when the answer is created', async () => {
    const onAnswerCreated =   new OnAnswerCreated()


    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)
 
  })

})