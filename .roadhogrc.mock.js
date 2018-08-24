import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /metaMng/small/backing': {
    "success": true,
    "message": null,
    "data": [
        {
            "ts": 1532767399000,
            "pk": "5948ffbb-c18d-4f45-8747-773485bdd690",
            "name": "30mm钢",
            "frontMedium": "水",
            "endMedium": "空气",
            "logo": null,
            "other": "文字文字",
            "samplePk": "faae722c-a685-44e6-973e-6bfcde20e417"
        },
        {
          "ts": 1532767399000,
          "pk": "5948ffbb-c18d-4f45-8747-773485bdd690",
          "name": "50mm钢",
          "frontMedium": "水",
          "endMedium": "水",
          "logo": null,
          "other": "文字文字",
          "samplePk": "faae722c-a685-44e6-973e-6bfcde20e417"
      }
    ]
  },
  'GET /metaMng/small/sample': {
    "success": true,
    "message": null,
    "data": [
        {
            "ts": 1532767399000,
            "pk": "faae722c-a685-44e6-973e-6bfcde20e417",
            "name": "阿波罗",
            "logo": null,
            "density": "1.05kg/cm3",
            "flexibleModel": "50MPa",
            "poissonRatio": "0.497",
            "soundSpeed": "1580m/s",
            "thickness": "50mm",
            "other": "文字文字",
            "userpk": null,
            "small": true
        }
    ]
  },
  'POST /item/pageSearchCondition': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": [
          {
              "refect": 0.1,
              "transmission": 0.45,
              "bondacust": 0.7875,
              "rate": 10
          },
          {
              "refect": 0.2,
              "transmission": 0.47,
              "bondacust": 0.7391,
              "rate": 20
          }
      ]
    });
  },

};

export default (noProxy ? {} : delay(proxy, 1000));
