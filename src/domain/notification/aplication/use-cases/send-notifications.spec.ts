import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SendNotificationUseCase } from './send-notifications'
import { InMemoryNotificationsRepository } from 'test/repositories/in-mememory-notifications-repository'
let inMemoryNotificationsRepository:InMemoryNotificationsRepository
let  sut: SendNotificationUseCase
describe('Send Notification', () => {
  beforeEach(() => {
    
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)

})
  
  it('should be able to send a notification ', async () => {
   
    const result = await sut.execute({
      recipientId: '1',
      title: 'new Notification',
      content: 'Content Notification',
    })
  


    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0].id).toEqual(result.value?.notification.id)
    

    
  })
})

