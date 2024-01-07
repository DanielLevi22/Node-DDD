import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotificationsRepository } from "@/domain/notification/aplication/repositories/notifications-repository";
import { Notification, NotificationsProps } from "@/domain/notification/enterprise/entities/notifications";
import { faker } from '@faker-js/faker'
export function makeNotification(
  override: Partial<NotificationsProps> = {},
  id?: UniqueEntityID,
) {
 const notifications = Notification.create(
  {
  recipientId: new UniqueEntityID(),
  title: faker.lorem.sentence(4),
  content: faker.lorem.sentence(10),
  ...override
  }, id
)
  return notifications
}