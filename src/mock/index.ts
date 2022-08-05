import Mock from 'mockjs';

// 列表查询
const list = Mock.mock('/api/list', 'get', {
  success: true,
  message: '成功',
  // 属性 list 的值是一个数组，其中含有 1 到 5 个元素
  'list|10': [{
    // 属性 sid 是一个自增数，起始值为 1，每次增 1
    'sid|+1': 1,
    // 属性 userId 是一个5位的随机码
    'userId|5': '',
    'name': '@cname',
  }]
})
//登录接口
const login = Mock.mock('/api/login', 'post', {
  success: true,
  message: '成功',
  data: {
    access_token: "@guid"
  }
})

const menu = Mock.mock('/api/menu', 'get', {
  success: true,
  message: '成功',
  data: [
    {
      path: '/home',
      icon: 'HomeOutlined',
      title: '首页'
    },
    {
      path:'/ceshi',
      icon:'DropboxOutlined',
      title:'测试'
    },
    {
      children: [
        {
          icon: "AppstoreOutlined",
          isLink: "https://github.com/HalseySpicy/Hooks-Admin",
          path: "/link/github",
          title: "GitHub 仓库",
        }
      ],
      icon: "PaperClipOutlined",
      path: "/link",
      title: "外部链接"
    }
  ]
})

const buttons = Mock.mock('/api/auth/buttons','get',{
  success: true,
  message: '成功',
  data:{
    useHooks:{
      add:true,
      edit:false
    }
  }
})
const data = [
  list,
  login,
  menu,
  buttons
]

export default data