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
  'GET /user/login': (req, res) => {
    const { pass, username, type } = req.body;
    res.send({
      "success": true,
      "message": "登录成功！",
      "data": {
          "ts": 1535719601000,
          "id": 2,
          "username": "admin",
          "pass": null,
          "usertype": "超级用户"
      }
    });
    return;
    // res.send({
    //   "success": true,
    //   "message": "登录成功！",
    //   "data": {
    //       "ts": 1535719601000,
    //       "id": 2,
    //       "username": "user",
    //       "pass": null,
    //       "usertype": "普通用户"
    //   }
    // });
    // return;
    // res.send({
    //   "success": false,
    //   "message": "登录成功！",
    //   "data": {
    //       "ts": 1535719601000,
    //       "id": 2,
    //       "username": "user",
    //       "pass": null,
    //       "usertype": null
    //   }
    // });
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
            "pk": "5948ffbb-c18d-4f45-8747-773485bdd6901",
            "name": "30mm钢",
            "frontMedium": "水",
            "endMedium": "空气",
            "logo": null,
            "other": "文字文字",
            "samplePk": "faae722c-a685-44e6-973e-6bfcde20e417"
        },
        {
          "ts": 1532767399000,
          "pk": "5948ffbb-c18d-4f45-8747-773485bdd6902",
          "name": "50mm钢",
          "frontMedium": "水",
          "endMedium": "水",
          "logo": null,
          "other": "文字文字",
          "samplePk": "faae722c-a685-44e6-973e-6bfcde20e417"
      },
      {
        "ts": 1532767399000,
        "pk": "5948ffbb-c18d-4f45-8747-773485bdd6903",
        "name": "80mm钢",
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
            "pk": "faae722c-a685-44e6-973e-6bfcde20e4171",
            "name": "阿波罗",
            "logo": null,
            "photos": [{pk:1, url: 'public/sample.png'},{pk:2, url: 'public/sample.png'},{pk:3, url: 'public/sample.png'}],
            "density": "1.05kg/cm3",
            "flexibleModel": "50MPa",
            "poissonRatio": "0.497",
            "soundSpeed": "1580m/s",
            "thickness": "50mm",
            "other": "文字文字",
            "userpk": null,
            "small": true
        },
        {
          "ts": 1532767399000,
          "pk": "faae722c-a685-44e6-973e-6bfcde20e4127",
          "name": "阿波罗1",
          "logo": null,
          "density": "1.05kg/cm3",
          "flexibleModel": "50MPa",
          "poissonRatio": "0.497",
          "soundSpeed": "1580m/s",
          "thickness": "50mm",
          "other": "文字文字",
          "userpk": null,
          "small": true
      },
      {
        "ts": 1532767399000,
        "pk": "faae722c-a685-44e6-973e-6bfcde20e3417",
        "name": "阿波罗2",
        "logo": null,
        "density": "1.05kg/cm3",
        "flexibleModel": "50MPa",
        "poissonRatio": "0.497",
        "soundSpeed": "1580m/s",
        "thickness": "50mm",
        "other": "文字文字",
        "userpk": null,
        "small": true
    },{name: 123},{name: 456},{name: 567},{name: 457},{name: 888},{name: 999},{name: 444},
    ]
  },
  'POST /item/pageSearchCondition': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": [
          // {
          //     "refect": 0.1,
          //     "transmission": 0.45,
          //     "bondacust": 0.7875,
          //     "rate": 10
          // },
          // {
          //     "refect": 0.2,
          //     "transmission": 0.47,
          //     "bondacust": 0.7391,
          //     "rate": 20
          // }
      ]
    });
  },
  'GET /bigmetaMng/big/sample': {
    "success": true,
    "message": null,
    "data": [
      {
             "ts": 1535548707000,
             "pk": "dae99713-394f-4cdb-8992-e54ef17744af",
             "name": "阿波罗",//名字
             "logo": null,
             "density": "1.05kg/cm3",//密度
             "flexibleModel": "50MPa",//弹性模型
             "poissonRatio": "0.497",//松柏比
             "soundSpeed": "1580m/s",//声速
             "thickness": "50mm",//厚度
             "other": "文字文字",
             "userpk": null,
             "small": false
         },
         {
             "ts": 1535549454000,
             "pk": "d8e9196d-3b58-49f3-8ad1-3e946db50904",
             "name": "阿波罗1",
             "logo": null,
             "density": "1.05kg/cm3",
             "flexibleModel": "50MPa",
             "poissonRatio": "0.497",
             "soundSpeed": "1580m/s",
             "thickness": "50mm",
             "other": "文字文字",
             "userpk": null,
             "small": false
         }
     ]
  },
  'GET /bigmetaMng/big/testModel': {
    "success": true,
    "message": null,
    "data": [
      {
          "ts": 1535551973000,
          "pk": "092e9933-d953-4c8f-80e8-bfaeeca288071",
          "name": "双层局域实尺度试验模型",//试验模型
          "size": "长宽高：1.8m*1.6m*1.4m",//尺寸
          "doubleShellSpacing": "双层间间距空气",//双层壳间距
          "innerShellThickness": "内壳厚度文字文字",//内壳厚度
          "shellThickness": "15",//外壳厚度
          "innerShellBackend": "内壳后段空气",//内壳后端
          "other": "试验模型其他",//其他
          "logo": null
      },
      {
        "ts": 1535551973000,
        "pk": "092e9933-d953-4c8f-80e8-bfaeeca288072",
        "name": "双层局域实尺度试验模型2",//试验模型
        "size": "长宽高：1.8m*1.6m*1.4m",//尺寸
        "doubleShellSpacing": "双层间间距空气",//双层壳间距
        "innerShellThickness": "内壳厚度文字文字",//内壳厚度
        "shellThickness": "15",//外壳厚度
        "innerShellBackend": "内壳后段空气",//内壳后端
        "other": "试验模型其他",//其他
        "logo": null
    }
    ]
  },
  'GET /bigmetaMng/big/testSystems': {
    "success": true,
    "message": null,
    "data":  [
      {
          "pk": "ad9bb684-2f9d-416c-bb0e-d74f50f147e13",
          "name": "测试系统名称",
          "describe": "测试系统介绍"
      },
      {
        "pk": "ad9bb684-2f9d-416c-bb0e-d74f50f147e14",
        "name": "测试系统名称2",
        "describe": "测试系统介绍2"
    }
    ]
  },
  'POST /item/pageSearchBigCondition': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": [
        {
            "refect": 0.1,//反射系数
            "transmission": 0.45,//投射系数
            "bondacust": 0.7875,//吸声系数
            "rate": 10,//频率
            "radiation": 102,//辐射声功率
            "radiationlose": 7.2,// 辐射声功率插入损失
            "echoes": 3.4//回声降低
        },
        {
            "refect": 0.2,
            "transmission": 0.47,
            "bondacust": 0.7391,
            "rate": 20,
            "radiation": 103,
            "radiationlose": 7.4,
            "echoes": 3.5
        }
      ]
    });
  },
  'GET /scaleMataMng/scale/testModelObjs': {
    "success": true,
    "message": null,
    "data": [
        {
          "ts": 1536389161000,
          "pk": "04ed1468-394e-4d12-a39f-a11a25f047ec1",
          "name": "中尺度模型",
          "shellType": "双层壳体",//壳体类型
          "shapeSize": "长5.4m，直径3.2m",
          "weight": "20T",
          "displacement": "20T",//排水量
          "other": "文字文字文字文字文字文字",
          "logo": null
        },
        {
          "ts": 1536389161000,
          "pk": "04ed1468-394e-4d12-a39f-a11a25f047ec2",
          "name": "中尺度模型2",
          "shellType": "双层壳体",//壳体类型
          "shapeSize": "长5.4m，直径3.2m",
          "weight": "20T",
          "displacement": "20T",//排水量
          "other": "文字文字文字文字文字文字特别多特别多特别多特别多特别多特别多特别多特别多特别多特别多",
          "logo": null
      }
    ]
  },
  'GET /scaleMataMng/scale/testConditions': {
    "success": true,
    "message": null,
    "data": [
        {
          "ts": 1536389161000,
          "pk": "38297ce7-0b70-42da-8487-0c8e713fa2dd2",
          "name": "文字文字",
          "duration": "1个月",
          "testTime": "201708",
          "testPlace": "杭州",
          "waterDepth": "20m",
          "testDepth": "20m",
          "other": "文字文字文字文字文字文字特别多特别多特别多特别多特别多特别多特别多特别多特别多特别多",
          "logo": null
        },
        {
          "ts": 1536389161000,
          "pk": "38297ce7-0b70-42da-8487-0c8e713fa2dd3",
          "name": "文字文字12",
          "duration": "1个月",
          "testTime": "201708",
          "testPlace": "杭州",
          "waterDepth": "20m",
          "testDepth": "20m",
          "other": "文字文字文字文字文字文字",
          "logo": null
      }
    ]
  },
  'GET /scaleMataMng/scale/layingSchemes': {
    "success": true,
    "message": null,
    "data": [
        {
          "ts": 1536389161000,
          "pk": "96350ce1-ee92-4a66-83b5-7ca3a8c2296b4",
          "name": "集成方案",
          "shellSurfaceOuter": "文字文字",//外壳外表面
          "shellSurfaceIner": "文字文字",//外壳内表面

          "innerShell": "文字文字", //内壳
          "ribs": "文字文字",
          "other": "文字文字文字文字文字文字特别多特别多特别多特别多特别多特别多特别多特别多特别多特别多",
          "logo": null
        },
        {
          "ts": 1536389161000,
          "pk": "96350ce1-ee92-4a66-83b5-7ca3a8c2296b5",
          "name": "集成方案2",
          "shellSurfaceOuter": "文字文字",//外壳外表面
          "shellSurfaceIner": "文字文字",//外壳内表面

          "innerShell": "文字文字", //内壳
          "ribs": "文字文字",
          "other": "文字文字文字文字文字文字",
          "logo": null
      }
    ]
  },
  'POST /item/pageSearchScaleCondition': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": [
        {
          rate: 10,
          "lightShellTS": 10,
          "lightShellSP": 9.71447,
          "layingShellTS": 24,
          "layingShellSP": 107.286,
          "reductionTS": 2.97922,
          "reductionSP": 117
      },
      {
          rate: 20,
          "lightShellTS": 10,
          "lightShellSP": 7.70368,
          "layingShellTS": 21,
          "layingShellSP": 106.296,
          "reductionTS": 2.78258,
          "reductionSP": 114
      },
      {
          rate: 30,
          "lightShellTS": 20,
          "lightShellSP": 10.502,
          "layingShellTS": 25,
          "layingShellSP": 107.498,
          "reductionTS": 4.22421,
          "reductionSP": 118
      },
      {
          rate: 40,
          "lightShellTS": 30,
          "lightShellSP": 9.22351,
          "layingShellTS": 23,
          "layingShellSP": 106.776,
          "reductionTS": 4.44131,
          "reductionSP": 116
      },
      {
          rate: 50,
          "lightShellTS": 40,
          "lightShellSP": 10.0789,
          "layingShellTS": 24,
          "layingShellSP": 106.921,
          "reductionTS": 3.6876,
          "reductionSP": 117
      }
    ]
    });
  },
  'POST /smallMng/queryAll': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": [
        {
          pk: 123,
          "samplepk":"faae722c-a685-44e6-973e-6bfcde20e4171",
          "samplename":"阿波罗",
          "bakingpk":"5948ffbb-c18d-4f45-8747-773485bdd6902",
          "backingname":"30mm钢",
          "press":1,
          "temparture":15,
          "refect": 0.1,
          "transmission": 0.45,
          "bondacust": 0.7875,
          "rate": 10
      },
      {
        pk: 456,
        "samplepk":"faae722c-a685-44e6-973e-6bfcde20e4173",
        "samplename":"阿波罗2",
        "bakingpk":"5948ffbb-c18d-4f45-8747-773485bdd6904",
        "backingname":"50mm钢",
        "press":1,
        "temparture":15,
        "refect": 0.1,
        "transmission": 0.45,
        "bondacust": 0.7875,
        "rate": 10
      },
      {
        pk: 789,
        "samplepk":"faae722c-a685-44e6-973e-6bfcde20e4175",
        "samplename":"阿波罗3",
        "bakingpk":"5948ffbb-c18d-4f45-8747-773485bdd6906",
        "backingname":"30mm钢1",
        "press":1,
        "temparture":15,
        "refect": 0.1,
        "transmission": 0.45,
        "bondacust": 0.7875,
        "rate": 10
      },
      {
        pk: 234,
        "samplepk":"faae722c-a685-44e6-973e-6bfcde20e4177",
        "samplename":"阿波罗4",
        "bakingpk":"5948ffbb-c18d-4f45-8747-773485bdd6908",
        "backingname":"30mm钢2",
        "press":1,
        "temparture":15,
        "refect": 0.1,
        "transmission": 0.45,
        "bondacust": 0.7875,
        "rate": 10
      },
      {
        pk: 345,
        "samplepk":"faae722c-a685-44e6-973e-6bfcde20e4179",
        "samplename":"阿波罗5",
        "bakingpk":"5948ffbb-c18d-4f45-8747-773485bdd6904",
        "backingname":"30mm钢3",
        "press":1,
        "temparture":15,
        "refect": 0.1,
        "transmission": 0.45,
        "bondacust": 0.7875,
        "rate": 10
      }
    ]
    });
  },
  'POST /bigMng/queryAll': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": [
        {
          pk: 1,
          "sampleName":"阿波罗0",
          "samplepk":"b480db62-5a06-4058-a8db-44fb946763f72",
          "testModelName":"双层局域实尺度试验模型1",
          "testModelPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f243",
          "testSystemName":"测试系统名称1",
          "temparture":"15",
			    "press":"1",
          "refect": 0.1,
          "transmission": 0.45,
          "bondacust": 0.7875,
          "rate": 10,
          "radiation": 102,
          "radiationlose": 7.2,
          "echoes": 3.4
        },
        {
          pk: 2,
          "sampleName":"阿波罗",
          "samplepk":"b480db62-5a06-4058-a8db-44fb946763f71",
          "testModelName":"双层局域实尺度试验模型2",
          "testModelPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f242",
          "testSystemName":"测试系统名称2",
          "temparture":"15",
			    "press":"1",
          "refect": 0.1,
          "transmission": 0.45,
          "bondacust": 0.7875,
          "rate": 10,
          "radiation": 102,
          "radiationlose": 7.2,
          "echoes": 3.4
        },
        {
          pk: 3,
          "sampleName":"阿波罗2",
          "samplepk":"b480db62-5a06-4058-a8db-44fb946763f73",
          "testModelName":"双层局域实尺度试验模型3",
          "testModelPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f244",
          "testSystemName":"测试系统名称3",
          "temparture":"15",
			    "press":"1",
          "refect": 0.1,
          "transmission": 0.45,
          "bondacust": 0.7875,
          "rate": 10,
          "radiation": 102,
          "radiationlose": 7.2,
          "echoes": 3.4
        },
        {
          pk: 4,
          "sampleName":"阿波罗3",
          "samplepk":"b480db62-5a06-4058-a8db-44fb946763f75",
          "testModelName":"双层局域实尺度试验模型4",
          "testModelPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f246",
          "testSystemName":"测试系统名称4",
          "temparture":"15",
			    "press":"1",
          "refect": 0.1,
          "transmission": 0.45,
          "bondacust": 0.7875,
          "rate": 10,
          "radiation": 102,
          "radiationlose": 7.2,
          "echoes": 3.4
        }
      ]
    });
  },
  'POST /scaleMng/queryAll': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": [
        {
          pk: 1,
          "testModelObjName":"中尺度模型1",
          "testModelObjPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f241",
          "layingSchemeName":"集成方案1",
          "layingSchemePk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f242",
          "testConditionName":"试验条件名称1",
          "testConditionPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f243",
          "lightShellTS": 0,
          "lightShellSP": 9.71447,
          "layingShellTS": 24,
          "layingShellSP": 107.286,
          "reductionTS": 2.97922,
          "reductionSP": 117
        },
        {
          pk: 2,
          "testModelObjName":"中尺度模型2",
          "testModelObjPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f244",
          "layingSchemeName":"集成方案2",
          "layingSchemePk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f245",
          "testConditionName":"试验条件名称2",
          "testConditionPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f246",
          "lightShellTS": 0,
          "lightShellSP": 9.71447,
          "layingShellTS": 24,
          "layingShellSP": 107.286,
          "reductionTS": 2.97922,
          "reductionSP": 117
        },
        {
          pk: 3,
          "testModelObjName":"中尺度模型3",
          "testModelObjPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f247",
          "layingSchemeName":"集成方案3",
          "layingSchemePk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f248",
          "testConditionName":"试验条件名称3",
          "testConditionPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f249",
          "lightShellTS": 0,
          "lightShellSP": 9.71447,
          "layingShellTS": 24,
          "layingShellSP": 107.286,
          "reductionTS": 2.97922,
          "reductionSP": 117
        },
        {
          pk: 4,
          "testModelObjName":"中尺度模型4",
          "testModelObjPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f24",
          "layingSchemeName":"集成方4",
          "layingSchemePk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f24",
          "testConditionName":"试验条件名称4",
          "testConditionPk":"587d69fe-0e0b-4cd8-8ecf-5d5686c85f24",
          "lightShellTS": 0,
          "lightShellSP": 9.71447,
          "layingShellTS": 24,
          "layingShellSP": 107.286,
          "reductionTS": 2.97922,
          "reductionSP": 117
        }
      ]
    });
  },
  'POST /sampleMng/modifySample': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /sampleMng/saveSample': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /sampleMng/deleteSample': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /backingMng/modifyBacking': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /backingMng/saveBacking': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /backingMng/deleteBacking': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testModelMng/modifyTestModel': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testModelMng/saveTestModel': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testModelMng/deleteTestModel': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testModelObjMng/modifyTestModelObj': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testModelObjMng/saveTestModelObj': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testModelObjMng/deleteTestModelObj': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testConditionMng/modifyTestCondition': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testConditionMng/saveTestCondition': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /testConditionMng/deleteTestCondition': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /layingSchemeMng/modifyLayingSchemePO': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /layingSchemeMng/saveLayingSchemePO': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /layingSchemeMng/deleteLayingSchemePO': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /smallMng/saveItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /smallMng/modifyItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /smallMng/deleteItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /smallMng/deleteItems': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /bigMng/saveItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /bigMng/modifyItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /bigMng/deleteItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /bigMng/deleteItems': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /scaleMng/saveItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /scaleMng/modifyItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /scaleMng/deleteItem': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /scaleMng/deleteItems': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data": {
        ...req.body
      }
    })
  },
  'POST /smallMng/queryFull': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data":  [
        {
          "ts": 1536763514000,
          "pk": "8f87ba80-6273-40d6-a5e1-acd2d1f872e5",
          "temparture": 15,
          "press": 1,
          "small": true,
          "samplepk": "9f7fde71-e0f4-4ad2-a6fe-cc92646279a6",
          "bakingpk": "8b9b9939-77b8-47e3-9d6e-b370597e763e",
          "sample": null,
          "backing": null,
          "samplename": "阿波罗02",
          "backingname": "30mm钢02"
        },
        {
          "ts": 1536763514000,
          "pk": "8f87ba80-6273-40d6-a5e1-acd2d1f872e52",
          "temparture": 15,
          "press": 1,
          "small": true,
          "samplepk": "9f7fde71-e0f4-4ad2-a6fe-cc92646279a6",
          "bakingpk": "8b9b9939-77b8-47e3-9d6e-b370597e763e",
          "sample": null,
          "backing": null,
          "samplename": "阿波罗02",
          "backingname": "30mm钢02"
        },
        {
          "ts": 1536763514000,
          "pk": "8f87ba80-6273-40d6-a5e1-acd2d1f872e53",
          "temparture": 15,
          "press": 1,
          "small": true,
          "samplepk": "9f7fde71-e0f4-4ad2-a6fe-cc92646279a6",
          "bakingpk": "8b9b9939-77b8-47e3-9d6e-b370597e763e",
          "sample": null,
          "backing": null,
          "samplename": "阿波罗02",
          "backingname": "30mm钢02"
        }
      ]
    })
  },
  'POST /bigMng/queryFull': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data":  [
        {
          "ts": 1536764084000,
          "pk": "c2b4cf72-a6d0-49a6-b98a-2f67887d106b",
          "temparture": 15,
          "press": 1,
          "sampleName": "阿波罗",
          "testModelName": "双层局域实尺度模型",
          "testSystemName": "时间反转",
          "samplepk": "b480db62-5a06-4058-a8db-44fb946763f7",
          "testModelPk": "587d69fe-0e0b-4cd8-8ecf-5d5686c85f24",
          "testSystemPk": "d897a5c2-e653-46f1-91c0-2adb3f920767",
          "sample": null,
          "testModel": null,
          "testSystem": null
        },
        {
          "ts": 1536764084000,
          "pk": "c2b4cf72-a6d0-49a6-b98a-2f67887d106b2",
          "temparture": 15,
          "press": 1,
          "sampleName": "阿波罗",
          "testModelName": "双层局域实尺度模型",
          "testSystemName": "时间反转",
          "samplepk": "b480db62-5a06-4058-a8db-44fb946763f7",
          "testModelPk": "587d69fe-0e0b-4cd8-8ecf-5d5686c85f24",
          "testSystemPk": "d897a5c2-e653-46f1-91c0-2adb3f920767",
          "sample": null,
          "testModel": null,
          "testSystem": null
        },
        {
          "ts": 1536764084000,
          "pk": "c2b4cf72-a6d0-49a6-b98a-2f67887d106b3",
          "temparture": 15,
          "press": 1,
          "sampleName": "阿波罗",
          "testModelName": "双层局域实尺度模型",
          "testSystemName": "时间反转",
          "samplepk": "b480db62-5a06-4058-a8db-44fb946763f7",
          "testModelPk": "587d69fe-0e0b-4cd8-8ecf-5d5686c85f24",
          "testSystemPk": "d897a5c2-e653-46f1-91c0-2adb3f920767",
          "sample": null,
          "testModel": null,
          "testSystem": null
        }
      ]
    })
  },
  'POST /scaleMng/queryFull': (req, res) => {
    res.send({
      "success": true,
      "message": null,
      "data":  [
        {
          "ts": 1537200124000,
          "pk": "8ee1f367-f835-49d5-ad20-ba77a0ebc6fa",
          "testModelObjName": null,
          "testModelObjPk": null,
          "layingSchemeName": null,
          "layingSchemePk": null,
          "testConditionName": null,
          "testConditionPk": null,
          "layingSchemePO": null,
          "testConditionPO": null,
          "testModelObjPO": null
        },
        {
            "ts": 1537200007000,
            "pk": "94e84395-8000-49ef-aede-162de8a90e58",
            "testModelObjName": "testModelObjName1",
            "testModelObjPk": "testModelObjPk",
            "layingSchemeName": "layingSchemeName",
            "layingSchemePk": "layingSchemePk",
            "testConditionName": "testConditionName",
            "testConditionPk": "testConditionPk",
            "layingSchemePO": null,
            "testConditionPO": null,
            "testModelObjPO": null
        },
        {
            "ts": 1537075069000,
            "pk": "acebcd69-7432-4529-a057-cae3eb406a14",
            "testModelObjName": "中尺度模型",
            "testModelObjPk": "95dffea1-3065-4521-95ca-c73e60652192",
            "layingSchemeName": "文字文字",
            "layingSchemePk": "8b1e4095-d155-49de-a36b-66dc09601433",
            "testConditionName": "201708杭州",
            "testConditionPk": "d74771b9-b0f3-43fa-a309-b3d3d07d7116",
            "layingSchemePO": null,
            "testConditionPO": null,
            "testModelObjPO": null
        }
      ]
    })
  },

};

export default (noProxy ? {'/': 'http://127.0.0.1:8080/'} : delay(proxy, 100));
