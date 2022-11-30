import { of } from 'rxjs'
import { TransferInterceptor } from './transfer-interceptor.service'

describe('ItemTransferInterceptor', () => {
  let interceptor

  beforeAll(() => {
    interceptor = new TransferInterceptor()
  })

  const mockedContext: any = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn(),
    getResponse: jest.fn(),
  }

  const mockedNext = {
    handle: jest.fn().mockReturnThis(),
    pipe: jest.fn().mockImplementation((param) => param),
  }

  it('should be defined', () => {
    expect(interceptor).toBeDefined()
  })

  it('should return pagination info in headers', () => {
    // Pre
    const header = jest.fn()
    mockedContext.getRequest.mockReturnValue({
      query: {},
    })
    mockedContext.getResponse.mockReturnValue({
      header,
    })
    const docs = []
    const responseData = of({
      docs,
      totalDocs: 0,
      limit: 20,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: 1,
    })

    // Action
    const res = interceptor.intercept(mockedContext, mockedNext)(responseData)

    // Assert
    res.subscribe((body) => {
      expect(body).toEqual(docs)
    })
    expect(header).toHaveBeenCalledTimes(4)
  })

  it('should return pagination info in metadata with v2 pagination', () => {
    // Pre
    const header = jest.fn()
    mockedContext.getRequest.mockReturnValue({
      query: { paginationVersion: '2' },
    })
    mockedContext.getResponse.mockReturnValue({
      header,
    })
    const docs = []
    const responseData = of({
      docs,
      totalDocs: 0,
      limit: 20,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: 1,
    })

    // Action
    const res = interceptor.intercept(mockedContext, mockedNext)(responseData)

    // Assert
    res.subscribe((body) => {
      expect(body.data).toEqual(docs)
      expect(body.metadata).toEqual({
        currentPage: 1,
        nextPage: 1,
        pageSize: 20,
        pageCount: 1,
        totalCount: 0,
      })
    })
    expect(header).toHaveBeenCalledTimes(0)
  })

  it('should return same data if no docs', () => {
    // Pre
    const header = jest.fn()
    mockedContext.getRequest.mockReturnValue({
      query: {},
    })
    mockedContext.getResponse.mockReturnValue({
      header,
    })
    const data = {
      someData: 'test',
    }
    const responseData = of(data)

    // Action
    const res = interceptor.intercept(mockedContext, mockedNext)(responseData)

    // Assert
    res.subscribe((body) => {
      expect(body).toEqual(data)
    })
  })
})
