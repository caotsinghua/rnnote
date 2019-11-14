// import Mock from 'mockjs'
import fetchMock from 'fetch-mock'
fetchMock.post(
  '/login',
  {
    success: true,
    data: {
      userName: 'aaa',
      nickName: '用户111'
    }
  },
  {
    delay: 1000
  }
)
