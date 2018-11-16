import React, {Component} from 'react'
import { Button, Slider, InputNumber, Tag, Tooltip, message } from 'antd'
import _ from 'lodash'
import echarts from 'echarts2/echarts' // 必须
import 'echarts2/component/tooltip'
import 'echarts2/component/grid'
import 'echarts2/component/toolbox'
import 'echarts2/component/legend'
import 'echarts2/chart/line'
import 'echarts2/chart/bar'
// import echarts from 'echarts/lib/echarts' // 必须
// import 'echart/lib/component/tooltip'
// import 'echart/lib/component/grid'
// import 'echart/lib/component/toolbox'
// import 'echart/lib/component/legend'
// import 'echart/lib/component/markLine'
// import 'echart/lib/chart/line'
// import 'echart/lib/chart/bar'
import styles from './ParamAnalysis.less'

let myChart = null
let analysisState = ""
const lengendMap = {
  refect: '反射系数',
  transmission: '透射系数',
  bondacust: '吸声系数',
  rate: '频率',
  radiation: '辐射声功率',
  radiationlose: '辐射声功率插入损失',
  echoes: '回声降低',
}
const chartOption = {
  title: { text: '' },
  tooltip : {
    trigger: 'axis',
    axisPointer:{
      show: true,
      type : 'cross',
      lineStyle: {
          type : 'dashed',
          width : 1,
      },
    },
    formatter (params) {
        return `频率 : ${params.value[0]}<br/>${params.seriesName}:${params.value[1]}`;
    },
  },
  toolbox: {
    show: true,
    left: '30px',
    feature: {
        dataZoom: {
            yAxisIndex: 'none',
            show: true,
        },
        dataView: {readOnly: false,show: true},
        magicType: {type: ['line', 'bar'],show: true},
        restore: {show: true},
        saveAsImage: {show: true},
    },
  },
  grid: {
    x: 30,
    x2: 40,
    y: 30,
    y2: 50,
  },
  legend: {
    data:['指数1','指数2','指数3'],
    x: 'center',
    y: 'bottom',
  },
  calculable: true,
  xAxis: {
    type : 'value',
    splitNumber: 20,
    min: 0,
    name: '频率',
  },
  yAxis: {name: '系数'},
  series: [
    {
      // 根据名字对应到相应的系列
      name: '指数1',
      type: 'line',
      data: [[10,0],[20,0]],
      markLine: {
          data: [
              {type: 'average', name: '平均值'},
          ],
      },
    }, {
      // 根据名字对应到相应的系列
      name: '指数2',
      type: 'line',
      data: [[10,0],[20,0]],
      markLine: {
        data: [
            {type: 'average', name: '平均值'},
        ],
      },
    }, {
      // 根据名字对应到相应的系列
      name: '指数3',
      type: 'line',
      data: [[10,0],[20,0]],
      markLine: {
        data: [
            {type: 'average', name: '平均值'},
        ],
      },
    },
  ],
}

export default class WaterParamAnalysis extends Component {

  state = {
    analysisParam: {
      rateMin: 0, // 最小频率
      rateMax: 10, // 最大频率
      press: 0, // 压强
      temparture: 0, // 温度
    },
    compareAnalysisData: [],
    analysisAvg: {
      transmission: 0,
      refect: 0,
      bondacust: 0,
    },
    noData: false,
  }

  componentWillMount() {
    const { param } = this.props
    const { analysisParam } = this.state
    this.setState({analysisParam: _.merge(analysisParam, param)})
  }

  componentDidMount() {
    setTimeout(() => {
      myChart = echarts.init(document.getElementById('mainChart'));
      myChart.setOption(chartOption);
    })
  }

  componentWillReceiveProps (nextProps) {
    const { analysisData, param } = nextProps
    const { data, dataParam } = analysisData
    const { analysisParam } = this.state

    this.setState({analysisParam: _.merge(analysisParam, param)})

    if(data && data.length>0) {
      if(dataParam) {
        if(analysisState === 'add') {
          this.addCompareAnalysisData(analysisData)
          analysisState = 'hasAdd'
        }
        if(analysisState === 'show'){
          analysisState = "haShow"
          this.changeChartData(data)
          this.setState({noData: false})
        }
      }
    } else if(data && data.length===0 && myChart) {
      if(analysisState === 'show'){
        myChart.clear()
        this.setState({noData: true})
      }
    }
  }

  onChangeAnalysisData = (type, value) => {
    const { analysisParam } = this.state
    if(Object.prototype.hasOwnProperty.call(analysisParam, type)) {
      analysisParam[type] = Number(value) || 0
    } else if(type === 'rate') {
      analysisParam.rateMin = Number(value[0]) || 0
      analysisParam.rateMax = Number(value[1]) || 10
    } else if(type === 'rateMin') {
      analysisParam.rateMin = Number(value) || 0
    } else if(type === 'rateMax') {
      analysisParam.rateMax = Number(value) || 10
    }
    this.setState({
      analysisParam,
    });
  }

  changeFormatterData = (type, value) => {
    debugger
  }

  checkAnalysisData = (param) => {
    for(const key in param) {
      if(Object.prototype.hasOwnProperty.call(param, key)) {
        if(!param[key]) {
          let errMsg = '请选择'
          switch(key) {
            case 'backingname':
              errMsg = '请选择背衬'
              break
            case 'samplename':
              errMsg = '请选择样品'
              break
            case 'testModelName':
              errMsg = '请选择试验模型'
              break
            case 'testSystemName':
              errMsg = '请选择试验系统'
              break
            case 'testModelObjName':
              errMsg = '请选择试验模型'
              break
            case 'testConditionName':
              errMsg = '请选择试验情况'
              break
            case 'layingSchemeName':
              errMsg = '请选择敷设方案'
              break
            default:
              errMsg = '请选择下拉框内容'
              break
          }
          message.error(errMsg, [0.01]);
          return false
        }
      }
    }
    return true
  }

  addCompareAnalysisData = (analysisData) => {
    const { compareAnalysisData } = this.state
    const { param } = this.props
    if(!this.checkAnalysisData(param)) { return; }
    compareAnalysisData.push(analysisData)
    this.setState({compareAnalysisData})
  }

  removeAnalysisData = (index) => {
    const { compareAnalysisData } = this.state
    compareAnalysisData.splice(index, 1)
    this.setState({compareAnalysisData})
  }

  handleAvg = () => {
    const { analysisAvg } = this.state
    const { analysisData } = this.props
    const { data } = analysisData
    const categories = []
    const seriesData = {
      'refect': [],
      'transmission': [],
      'bondacust': [],
      radiation: [],
      radiationlose: [],
      echoes: [],
    }
    this.formatAnalysisData(data, categories, seriesData)
    analysisAvg.bondacust = seriesData.bondacust.length> 0 && (_.sum(seriesData.bondacust)/seriesData.bondacust.length).toFixed(2)
    analysisAvg.refect = seriesData.refect.length> 0 && (_.sum(seriesData.refect)/seriesData.refect.length).toFixed(2)
    analysisAvg.transmission = seriesData.transmission.length> 0 && (_.sum(seriesData.transmission)/seriesData.transmission.length).toFixed(2)
    analysisAvg.radiation = seriesData.radiation.length> 0 && (_.sum(seriesData.radiation)/seriesData.radiation.length).toFixed(2)
    analysisAvg.radiationlose = seriesData.radiationlose.length> 0 && (_.sum(seriesData.radiationlose)/seriesData.radiationlose.length).toFixed(2)
    analysisAvg.echoes = seriesData.echoes.length> 0 && (_.sum(seriesData.echoes)/seriesData.echoes.length).toFixed(2)
    this.setState({analysisAvg})
  }

  showAnalysisData = (state) => {
    analysisState = state
    const { handleAnalysisData, param } = this.props
    if(!this.checkAnalysisData(param)) { return; }
    const { analysisParam } = this.state
    const params = _.cloneDeep(analysisParam)
    params.rateMin = analysisParam.rateMin * 1000
    params.rateMax = analysisParam.rateMax * 1000
    handleAnalysisData(params)
  }

  addCompareData = (state) => {
    const { compareAnalysisData, analysisParam } = this.state
    for(const dataMap of compareAnalysisData) {
      if(dataMap && dataMap.dataParam) {
        const param = _.cloneDeep(analysisParam)
        param.rateMin = analysisParam.rateMin * 1000
        param.rateMax = analysisParam.rateMax * 1000
        if(_.isEqual(dataMap.dataParam, param)) {
          message.info('已加入过对比数据')
          return ;
        }
      }
    }
    this.showAnalysisData(state)
  }

  formatAnalysisData = (analysisData, categories, seriesData) => {
    for(const i in analysisData) {
      if(analysisData[i]) {
        categories.push(analysisData[i].rate)
        seriesData.refect.push([analysisData[i].rate, analysisData[i].refect])
        seriesData.transmission.push([analysisData[i].rate, analysisData[i].transmission])
        seriesData.bondacust.push([analysisData[i].rate, analysisData[i].bondacust])
        seriesData.radiation.push([analysisData[i].rate, analysisData[i].radiation])
        seriesData.radiationlose.push([analysisData[i].rate, analysisData[i].radiationlose])
        seriesData.echoes.push([analysisData[i].rate, analysisData[i].echoes])
      }
    }
    return {categories, seriesData}
  }

  initSeries = (seriesData) => {
    const legendData = []
    const series = []
    for(const key in seriesData) {
      if(Object.hasOwnProperty.call(seriesData, key)) {
        if(lengendMap[key]) {
          seriesData[key].forEach((value, index) => {
            legendData.push(`${lengendMap[key]}${index+1}`)
            series.push({
              name: `${lengendMap[key]}${index+1}`,
              type: 'line',
              data: value || [],
              markPoint : {
                data : [
                  {type : 'average', name : '平均值'},
                ],
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'},
                  ],
              },
            })
          })
        }
      }
    }
    return {legendData, series}
  }

  changeChartData = (analysisData) => {
    const categories = []
    const seriesData = {
      'refect': [],
      'transmission': [],
      'bondacust': [],
      radiation: [],
      radiationlose: [],
      echoes: [],
    }
    this.formatAnalysisData(analysisData, categories, seriesData)
    if(!myChart) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById('mainChart'));
    }
    if(categories.length <=0) {
      message.info('选择的参数，无分析数据')
    }
    myChart.clear()
    // 填入数据
    // chartOptionTemp.series
    const chartOptionTemp = _.cloneDeep(chartOption)
    // chartOptionTemp.xAxis.data = categories.length >0 ? categories : ['频率1', '频率2', '频率3']
    chartOptionTemp.xAxis.max = Math.max(...categories)
    const seriesDataMap = {
      'refect': [seriesData.refect],
      'transmission': [seriesData.transmission],
      'bondacust': [seriesData.bondacust],
      radiation: [seriesData.radiation],
      radiationlose: [seriesData.radiationlose],
      echoes: [seriesData.echoes],
    }
    const chartMap = this.initSeries(seriesDataMap)
    chartOptionTemp.series = chartMap.series
    chartOptionTemp.legend.data = chartMap.legendData
    myChart.setOption(chartOptionTemp);
  }

  startContrast = () => {
    const { compareAnalysisData } = this.state
    const refectList = []
    const transmissionList = []
    const bondacustList = []
    const radiationList = []
    const radiationloseList = []
    const echoesList = []
    let categories = []
    for(const analysisData of compareAnalysisData) {
      categories = []
      const seriesData = {
        'refect': [],
        'transmission': [],
        'bondacust': [],
        radiation: [],
        radiationlose: [],
        echoes: [],
      }
      this.formatAnalysisData(analysisData.data, categories, seriesData)
      refectList.push(seriesData.refect)
      transmissionList.push(seriesData.transmission)
      bondacustList.push(seriesData.bondacust)
      radiationList.push(seriesData.radiationList)
      radiationloseList.push(seriesData.radiationloseList)
      echoesList.push(seriesData.echoesList)
    }
    if(!myChart) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById('mainChart'));
    }
    if(categories.length <=0) {
      message.info('选择的参数，无分析数据')
    }
    myChart.clear()
    const seriesDataMap = {
      'refect': refectList,
      'transmission': transmissionList,
      'bondacust': bondacustList,
      radiation: radiationList,
      radiationlose: radiationloseList,
      echoes: echoesList,
    }
    const chartMap = this.initSeries(seriesDataMap)
    const chartOptionTemp = _.cloneDeep(chartOption)
    // chartOptionTemp.xAxis.data = categories.length >0 ? categories : ['频率1', '频率2', '频率3']
    chartOptionTemp.xAxis.max = Math.max(...categories)
    chartOptionTemp.series = chartMap.series
    chartOptionTemp.legend.data = chartMap.legendData
    if(chartMap.legendData.length>6) {
      chartOptionTemp.grid.y2 = '80'
    }
    myChart.setOption(chartOptionTemp);
  }

  render () {
    const { analysisParam, compareAnalysisData, noData } = this.state
    const { isScaleModel } = this.props
    const marks = {
      0: '0',
      5: '5K',
      10: '10K',
      15: '15K',
      20: '20K',
      25: '25K',
      30: {
        style: {
          color: '#f50',
        },
        label: <strong>30K</strong>,
      },
    };

    const paMarks = {
      0: '0',
      0.5: '0.5',
      1.0: '1.0',
      1.5: '1.5',
      2.0: '2.0',
      2.5: '2.5',
      3.0: '3.0',
      3.5: '3.5',
      4.0: '4.0',
      4.5: {
        style: {
          color: '#f50',
        },
        label: <strong>4.5</strong>,
      },
    };

    const tMarks = {
      0: '0',
      5: '5',
      10: '10',
      15: '15',
      20: '20',
      25: '25',
      30: {
        style: {
          color: '#f50',
        },
        label: <strong>30</strong>,
      },
    };

    return (
      <div className={styles.paramAnalysis}>
        <span className={`${styles.paramTitle} ${styles.title}`}>参数分析</span>
        <div className={`${styles.paramTriangle} ${styles.triangle}`} />
        <div className={styles.settingBox}>
          <div className={styles.calculate}>
            <span className={styles.calculateTitle}>参数设置</span>
            <div className={styles.calculateBox}>
              <div className={styles.titleH4}>
                <h4>频率f/Hz</h4>
                <div>
                  <InputNumber
                    min={0}
                    max={analysisParam.rateMax}
                    value={analysisParam.rateMin}
                    onChange={this.onChangeAnalysisData.bind(this, 'rateMin')}
                  />kHz
                  ~
                  <InputNumber
                    min={analysisParam.rateMin}
                    max={30}
                    value={analysisParam.rateMax}
                    onChange={this.onChangeAnalysisData.bind(this, 'rateMax')}
                  />kHz
                </div>
              </div>
              <Slider
                min={0}
                max={30}
                range
                marks={marks}
                value={[analysisParam.rateMin, analysisParam.rateMax]}
                onChange={this.onChangeAnalysisData.bind(this, 'rate')}
              />
              {isScaleModel ? '' :
                (
                  <div>
                    <div className={styles.titleH4}>
                      <h4>压力P/Mpa</h4>
                      <div>
                        <InputNumber
                          min={0}
                          max={4.5}
                          step={0.5}
                          value={analysisParam.press}
                          onChange={this.onChangeAnalysisData.bind(this, 'press')}
                          onblur={this.changeFormatterData.bind(this, 'press')}
                        />MPa
                      </div>
                    </div>
                    <Slider
                      min={0}
                      max={4.5}
                      step={0.5}
                      marks={paMarks}
                      included={false}
                      value={analysisParam.press}
                      onChange={this.onChangeAnalysisData.bind(this, 'press')}
                    />
                    <div className={styles.titleH4}>
                      <h4>温度T/度</h4>
                      <div>
                        <InputNumber
                          min={0}
                          max={30}
                          step={5}
                          value={analysisParam.temparture}
                          onChange={this.onChangeAnalysisData.bind(this, 'temparture')}
                        />度
                      </div>
                    </div>
                    <Slider
                      min={0}
                      max={30}
                      step={5}
                      marks={tMarks}
                      included={false}
                      value={analysisParam.temparture}
                      onChange={this.onChangeAnalysisData.bind(this, 'temparture')}
                    />
                  </div>
                )
              }
              <div className={styles.calculateBtns}>
                <Button type="primary" className={styles.showNum} onClick={this.showAnalysisData.bind(this, 'show')}>显示</Button>
                <Button className={styles.addConstact} onClick={this.addCompareData.bind(this, 'add')}>加入对比</Button>
              </div>
            </div>
            {/* <div className={styles.calculateAvg}>
              <Button type="primary" className={styles.countBtn} onClick={this.handleAvg.bind(this)}>计算</Button>
              <div className={styles.calculateAvgBox}>
                <ul>
                  <li><span>平均透射系数</span><span>{analysisAvg.transmission || 0}</span></li>
                  <li><span>平均反射系数</span><span>{analysisAvg.refect || 0}</span></li>
                  <li><span>平均吸声系数</span><span>{analysisAvg.bondacust || 0}</span></li>
                </ul>
              </div>
            </div> */}
          </div>
          <div className={styles.calculateChart}>
            <div className={styles.chartItems}>
              <span>已加入的对比数据</span>
              <div className={styles.itemList}>
                {compareAnalysisData && compareAnalysisData.map((item, index) => {
                  const tag = `对比数据${index+1}`
                  const isLongTag = tag.length > 10;
                  const tagElem = (
                    <Tag key={tag} className={styles.chartItem} closable={index !== 0} afterClose={() => this.removeAnalysisData(index)}>
                      {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? <Tooltip className={styles.chartItem} title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
              </div>
              <Button type="primary" className={styles.startBtn} onClick={this.startContrast}>开始对比</Button>
            </div>
            <h4 style={{display: noData ? 'block':'none'}} className={styles.noDataSpan}>暂无数据，请选择</h4>
            <div id="mainChart" className={styles.chartArea} style={{display: noData ? 'none':'block'}} />
          </div>
        </div>
      </div>
    )
  }
}
