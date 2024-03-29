import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found";
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../repositories/questions-attachements-repopsitory";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";


interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, 
{
  question: Question
}>


export class EditQuestionUseCase {

  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentsRepository

  ) {}
  async execute({authorId,content,title,questionId,attachmentsIds}: EditQuestionUseCaseRequest): Promise <EditQuestionUseCaseResponse> {

    const question = await this.questionsRepository.findById(questionId);

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    if(authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(questionId)
    const questionAttachmentsList = new QuestionAttachmentList(currentQuestionAttachments)
    
    const questionAttachment = attachmentsIds.map( attachmentId => {
      return QuestionAttachment.create({
         attachmentId: new UniqueEntityID(attachmentId),
         questionId: question.id
      })
    })



    questionAttachmentsList.update(questionAttachment)
    question.attachments = questionAttachmentsList
    question.title = title
    question.content = content
    
    await this.questionsRepository.save(question)
    return right( {
      question
    })
  }
}