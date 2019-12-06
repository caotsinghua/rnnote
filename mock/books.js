import fetchMock from 'fetch-mock/es5/client'
import Mock from 'mockjs'
fetchMock.get(
  /\/books/,
  Mock.mock({
    success: true,
    data: {
      'list|10-20': [
        {
          title: '@string(5,16)',
          createTime: '@datetime',
          desc: '@string(100,150)'
        }
      ],
      total: '@natural'
    },
    message: 'success'
  })
)

fetchMock.get(
  /\/notes/,
  Mock.mock({
    success: true,
    data: {
      'list|10-20': [
        {
          title: '@string(5,16)',
          createTime: '@datetime',
          desc: '@string(100,150)',
          id: '@guid'
        }
      ],
      total: '@natural'
    },
    message: 'success'
  })
)
