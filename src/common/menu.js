import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '声管小样数据',
    icon: 'public/nav001.svg',
    authority: 'user', // 配置准入权限
    path: 'soundpipe',
  },
  {
    name: '水罐大样数据',
    icon: 'public/nav002.svg',
    authority: 'user', // 配置准入权限
    path: 'waterpot',
  },
  {
    name: '缩放模型数据',
    icon: 'public/nav003.svg',
    authority: 'user', // 配置准入权限
    path: 'scalemodel',
  },
  {
    name: '其他模型数据',
    icon: 'public/nav004.svg',
    authority: 'user', // 配置准入权限
    path: 'othermodel',
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  {
    name: '信息管理',
    icon: 'book',
    path: 'msgmanage',
    authority: 'admin',
    children: [
      {
        name: '样品',
        path: 'sample',
      },
      {
        name: '背衬',
        path: 'backing',
      },
      {
        name: '内场试验模型',
        path: 'inner',
      },
      {
        name: '外场试验模型',
        path: 'outer',
      },
      {
        name: '测试系统管理',
        path: 'test',
      },
      {
        name: '试验情况',
        path: 'experment',
      },
      {
        name: '敷设方案',
        path: 'lay',
      },
    ],
  },
  {
    name: '数据管理',
    icon: 'line-chart',
    path: 'datamanager',
    authority: 'admin',
    children: [
      {
        name: '声管小样',
        path: 'sounddata',
      },
      {
        name: '水罐大样',
        path: 'waterpotdata',
      },
      {
        name: '缩放模型',
        path: 'scaledata',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
