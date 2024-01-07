import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-answer-attachments-repository copy"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-question-attachments-repository"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notifications"
import { InMemoryNotificationsRepository } from "test/repositories/in-mememory-notifications-repository"
import { makeQuestion } from "test/factories/make-question"
import { SpyInstance } from "vitest"
import { waitFor } from "test/ultils/wait-for"
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen"


let sendNotificationExecuteSpy:SpyInstance<
[SendNotificationUseCaseRequest],
Promise<SendNotificationUseCaseResponse>
>

let inMemoryQuestionAttachmentsRepository:InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository:InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository:InMemoryAnswerAttachmentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase
describe('On question Best Answer Chosen ', () => {
beforeEach(() => {
  inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
  inMemoryAnswerAttachmentsRepository = new  InMemoryAnswerAttachmentsRepository()
  inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
  inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
  sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)
  sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')
  new OnQuestionBestAnswerChosen(
    inMemoryAnswersRepository,
    sendNotificationUseCase
  )
})
  it('should send notification when the topic has new best answer  chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({questionId: question.id})

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id
    
    await inMemoryQuestionsRepository.save(question)
    


    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
    
 
  })

})