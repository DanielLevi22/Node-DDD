import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";

import { SendNotificationUseCase } from "../use-cases/send-notifications";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswerChoseEvent } from "@/domain/forum/enterprise/events/question-best-answer-chosen";

export class OnQuestionBestAnswerChosen implements EventHandler {

  constructor(
    private answerRepository: AnswersRepository,
    private sendoNotifications: SendNotificationUseCase 
  ) {
    this.setupSubscriptions()
  }
  setupSubscriptions(): void {
   DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), QuestionBestAnswerChoseEvent.name)
  }

  private async sendQuestionBestAnswerNotification({question, bestAnswerId }:QuestionBestAnswerChoseEvent) {
    const answer  = await this.answerRepository.findById(bestAnswerId.toString())

    if(answer) {
        await this.sendoNotifications.execute({
          recipientId: answer.authorId.toString(),
          title: `Sua resposta foi escolhida!`,
          content: `A resposta que voce enviou em "${question.title.substring(0,20).concat('...on-question-best-answer-chosen')}" foi escolhida pelo autor!`,
        })
    }
  }
}