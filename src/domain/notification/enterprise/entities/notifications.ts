import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface NotificationsProps {
  recipientId: UniqueEntityID
  title: string;
  content: string;
  readAt?: Date
  createdAt: Date
}


export class Notification extends Entity<NotificationsProps> {
  get recipientId() {
    return this.props.recipientId
  }
  get title() {
    return this.props.title
  }
  get content() {
    return this.props.content
  }
  get readAt() {
    return this.props.readAt
  }
  get createdAt() {
    return this.props.createdAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(props: Optional<NotificationsProps, 'createdAt'>, id?: UniqueEntityID){
    const notifications = new Notification({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id)

    return notifications
  }
}