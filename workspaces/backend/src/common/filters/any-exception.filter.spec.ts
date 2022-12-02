import { AnyExceptionFilter } from './any-exception.filter'
import { HttpException, HttpStatus } from '@nestjs/common'

const JsonMocked = jest.fn()
const StatusMocked = jest.fn().mockImplementation(() => ({
  json: JsonMocked,
}))
const GetResponseMocked = jest.fn().mockImplementation(() => ({
  status: StatusMocked,
}))
const GetRequestMocked = jest.fn().mockImplementation(() => ({
  url: jest.fn(),
}))
const HttpArgumentsHostMocked = jest.fn().mockImplementation(() => ({
  getResponse: GetResponseMocked,
  getRequest: GetRequestMocked,
}))
const ArgumentsHostMocked = {
  switchToHttp: HttpArgumentsHostMocked,
}

describe('AnyExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AnyExceptionFilter({ error: jest.fn() } as any)).toBeDefined()
  })

  it('exception ERROR', () => {
    const filter = new AnyExceptionFilter({ error: jest.fn() } as any)
    filter.catch(
      new HttpException('Http exception', HttpStatus.BAD_REQUEST),
      ArgumentsHostMocked as any,
    )
    expect(ArgumentsHostMocked.switchToHttp).toBeCalledTimes(1)
    expect(HttpArgumentsHostMocked).toBeCalledWith()
    expect(GetResponseMocked).toBeCalledTimes(1)
    expect(GetRequestMocked).toBeCalledWith()
    expect(StatusMocked).toBeCalledTimes(1)
    expect(StatusMocked).toBeCalledWith(HttpStatus.BAD_REQUEST)
  })
})
