// import Mock from 'mockjs'
import fetchMock from 'fetch-mock/es5/client'
fetchMock.post(
  /\/login/,
  {
    success: true,
    data: {
      userName: 'aaa',
      nickName: '用户111'
    },
    message: '登陆成功'
  },
  // 500,
  {
    delay: 1000
  }
)
