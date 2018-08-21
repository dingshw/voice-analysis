import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '声管小样数据',
    icon: 'public/nav001.svg',
    path: 'soundpipe',
  },
  {
    name: '水罐大样数据',
    icon: 'public/nav002.svg',
    path: 'waterpot',
  },
  {
    name: '缩放模型数据',
    icon: 'public/nav003.svg',
    path: 'scalemodel',
  },
  {
    name: '其他模型数据',
    icon: 'public/nav004.svg',
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
