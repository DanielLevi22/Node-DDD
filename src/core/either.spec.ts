import { Either,  left, right } from "./either"


function doSomething(shouldSuccess:boolean): Either<string, number> {
  if(shouldSuccess) {
    return right(10)
  }else {
    return left('error')
  }
}




test('success result', () => {
  const successResult = doSomething(true)
  expect(successResult.isRight()).toBeTruthy()
})


test('error result', () => {
  const errorResult  = left(false)
  expect(errorResult.isLeft()).toBe(true)
  expect(errorResult.isRight()).toBe(false)
})