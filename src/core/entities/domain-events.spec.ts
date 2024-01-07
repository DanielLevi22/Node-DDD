import { DomainEvent } from "../events/domain-event";
import { DomainEvents } from "../events/domain-events";
import { AggregateRoot } from "./aggregate-root";
import { UniqueEntityID } from "./unique-entity-id";

class CustomAggregateCreated implements DomainEvent {
 public ocurredAt: Date;
 private aggregate: CustomAggregate;


constructor(aggregate: CustomAggregate) {
  this.ocurredAt = new Date();
  this.aggregate = aggregate;
}

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {


  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
  
}


describe('domain events', () => {
  it('should be able to dispatch and list to events', () => {

    const callbackSpy = vi.fn()

    // Subscribe cadastrado (Ouvindo  o evento de resposta criada)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    //Criando resposta porem sem salvar no banco)
    const aggregate =  CustomAggregate.create()

    //estou assegurando que o evento foi criado mais nao disparado)
    expect(aggregate.domainEvents).toHaveLength(1)

    //estou assegurando que o evento foi criado mais nao disparado)

    //estou criando a resposta no banco de dados e assim disparando o evento)
    DomainEvents.dispatchEventsForAggregate(aggregate.id)


    //o Subscribe escuta o evento e faz oque deve ser feito

    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)

    
  })
})