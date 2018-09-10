import React, {Component} from 'react'
import { Button, Slider, InputNumber, Row, Col, Tag, Tooltip, message } from 'antd'
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
let historyAnalysisData = []
let analysisState = ""
const lengendMap = {
  lightShellTS: '光壳声目标强度',
  lightShellSP: '光壳辐射声功率',
  layingShellTS: '敷瓦声目标强度',
  layingShellSP: '敷瓦辐射声功率',
  reductionTS: '声目标强度降低量',
  reductionSP: '辐射声功率插入损失',
}
const chartOption = {
  title: { text: '' },
  tooltip: {},
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
  xAxis: {
    data: ['频率1', '频率2', '频率3'],
  },
  yAxis: {},
  series: [
    {
      // 根据名字对应到相应的系列
      name: '指数1',
      type: 'line',
      data: [],
      markLine: {
          data: [
              {type: 'average', name: '平均值'},
          ],
      },
    }, {
      // 根据名字对应到相应的系列
      name: '指数2',
      type: 'line',
      data: [],
      markLine: {
        data: [
            {type: 'average', name: '平均值'},
        ],
      },
    }, {
      // 根据名字对应到相应的系列
      name: '指数3',
      type: 'line',
      data: [],
      markLine: {
        data: [
            {type: 'average', name: '平均值'},
        ],
      },
    },
  ],
}

export default class ParamAnalysis extends Component {

  state = {
    analysisParam: {
      rateMin: 0, // 最小频率
      rateMax: 10, // 最大频率
      press: 0, // 压强
      temparture: 0, // 温度
    },
    compareAnalysisData: [],
    analysisAvg: {
      "lightShellTS": 0,
      "lightShellSP": 0,
      "layingShellTS": 0,
      "layingShellSP": 0,
      "reductionTS": 0,
      "reductionSP": 0,
    },
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
        if(analysisState === 'show' && !_.isEqual(data, historyAnalysisData)){
          historyAnalysisData = _.cloneDeep(data)
          this.changeChartData(data)
        }
      }
    }
  }

  onChangeAnalysisData = (type, value) => {
    const { analysisParam } = this.state
    if(Object.prototype.hasOwnProperty.call(analysisParam, type)) {
      analysisParam[type] = value || 0
    } else if(type === 'rate') {
      analysisParam.rateMin = value[0] || 0
      analysisParam.rateMax = value[1] || 10
    } else if(type === 'rateMin') {
      analysisParam.rateMin = value || 0
    } else if(type === 'rateMax') {
      analysisParam.rateMax = value || 10
    }
    this.setState({
      analysisParam,
    });
  }

  checkAnalysisData = (param) => {
    for(const key in param) {
      if(Object.prototype.hasOwnProperty.call(param, key)) {
        if(!param[key]) {
          let errMsg = '请选择'
          switch(key) {
            case 'backgroundtype':
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
          message.error(errMsg);
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
      lightShellTS: [],
      lightShellSP: [],
      layingShellTS: [],
      layingShellSP: [],
      reductionTS: [],
      reductionSP: [],
    }
    this.formatAnalysisData(data, categories, seriesData)
    analysisAvg.lightShellTS = seriesData.lightShellTS.length> 0 && (_.sum(seriesData.lightShellTS)/seriesData.lightShellTS.length).toFixed(2)
    analysisAvg.lightShellSP = seriesData.lightShellSP.length> 0 && (_.sum(seriesData.lightShellSP)/seriesData.lightShellSP.length).toFixed(2)
    analysisAvg.layingShellTS = seriesData.layingShellTS.length> 0 && (_.sum(seriesData.layingShellTS)/seriesData.layingShellTS.length).toFixed(2)
    analysisAvg.layingShellTS = seriesData.layingShellTS.length> 0 && (_.sum(seriesData.layingShellTS)/seriesData.layingShellTS.length).toFixed(2)
    analysisAvg.reductionTS = seriesData.reductionTS.length> 0 && (_.sum(seriesData.reductionTS)/seriesData.reductionTS.length).toFixed(2)
    analysisAvg.reductionSP = seriesData.reductionSP.length> 0 && (_.sum(seriesData.reductionSP)/seriesData.reductionSP.length).toFixed(2)
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
        seriesData.lightShellTS.push(analysisData[i].lightShellTS)
        seriesData.lightShellSP.push(analysisData[i].lightShellSP)
        seriesData.layingShellTS.push(analysisData[i].layingShellTS)
        seriesData.layingShellSP.push(analysisData[i].layingShellSP)
        seriesData.reductionTS.push(analysisData[i].reductionTS)
        seriesData.reductionSP.push(analysisData[i].reductionSP)
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
            legendData.push(`${lengendMap[key]}${index}`)
            series.push({
              name: `${lengendMap[key]}${index}`,
              type: 'line',
              data: value || [],
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
      lightShellTS: [],
      lightShellSP: [],
      layingShellTS: [],
      layingShellSP: [],
      reductionTS: [],
      reductionSP: [],
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
    chartOptionTemp.xAxis.data = categories.length >0 ? categories : ['频率1', '频率2', '频率3']
    const seriesDataMap = {
      'lightShellTS': [seriesData.lightShellTS],
      'lightShellSP': [seriesData.lightShellSP],
      'layingShellTS': [seriesData.layingShellTS],
      layingShellSP: [seriesData.layingShellSP],
      reductionTS: [seriesData.reductionTS],
      reductionSP: [seriesData.reductionSP],
    }
    const chartMap = this.initSeries(seriesDataMap)
    chartOptionTemp.series = chartMap.series
    chartOptionTemp.legend.data = chartMap.legendData
    myChart.setOption(chartOptionTemp);
  }

  startContrast = () => {
    const { compareAnalysisData } = this.state
    const lightShellTSList = []
    const lightShellSPList = []
    const layingShellTSList = []
    const layingShellSPList = []
    const reductionTSList = []
    const reductionSPList = []
    let categories = []
    for(const analysisData of compareAnalysisData) {
      categories = []
      const seriesData = {
        lightShellTS: [],
        lightShellSP: [],
        layingShellTS: [],
        layingShellSP: [],
        reductionTS: [],
        reductionSP: [],
      }
      this.formatAnalysisData(analysisData.data, categories, seriesData)
      lightShellTSList.push(seriesData.lightShellTSList)
      lightShellSPList.push(seriesData.lightShellSPList)
      layingShellTSList.push(seriesData.layingShellTSList)
      layingShellSPList.push(seriesData.layingShellSPList)
      reductionTSList.push(seriesData.reductionTSList)
      reductionSPList.push(seriesData.reductionSPList)
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
      'lightShellTS': lightShellTSList,
      'lightShellSP': lightShellSPList,
      'layingShellTS': layingShellTSList,
      layingShellSP: layingShellSPList,
      reductionTS: reductionTSList,
      reductionSP: reductionSPList,
    }
    const chartMap = this.initSeries(seriesDataMap)
    const chartOptionTemp = _.cloneDeep(chartOption)
    chartOptionTemp.xAxis.data = categories.length >0 ? categories : ['频率1', '频率2', '频率3']
    chartOptionTemp.series = chartMap.series
    chartOptionTemp.legend.data = chartMap.legendData
    if(chartMap.legendData.length>6) {
      chartOptionTemp.grid.y2 = '80'
    }
    myChart.setOption(chartOptionTemp);
  }

  render () {
    const { analysisParam, compareAnalysisData } = this.state
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
              <h4>频率f/Hz</h4>
              <Row gutter={12} className={styles.calculateItems}>
                <Col span={15}>
                  <Slider
                    min={0}
                    max={30}
                    range
                    marks={marks}
                    value={[analysisParam.rateMin, analysisParam.rateMax]}
                    onChange={this.onChangeAnalysisData.bind(this, 'rate')}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={0}
                    max={analysisParam.rateMax}
                    value={analysisParam.rateMin}
                    onChange={this.onChangeAnalysisData.bind(this, 'rateMin')}
                    formatter={value => `${value}KHz`}
                    parser={value => value.replace('KHz', '')}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={1}>~</Col>
                <Col span={4}>
                  <InputNumber
                    min={analysisParam.rateMin}
                    max={30}
                    value={analysisParam.rateMax}
                    onChange={this.onChangeAnalysisData.bind(this, 'rateMax')}
                    formatter={value => `${value}KHz`}
                    parser={value => value.replace('KHz', '')}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              {isScaleModel ? '' :
                (
                  <div>
                    <h4>压力P/Mpa</h4>
                    <Row gutter={12} className={styles.calculateItems}>
                      <Col span={15}>
                        <Slider
                          min={0}
                          max={4.5}
                          step={0.5}
                          marks={paMarks}
                          value={analysisParam.press}
                          onChange={this.onChangeAnalysisData.bind(this, 'press')}
                        />
                      </Col>
                      <Col span={5}>
                        <InputNumber
                          min={0}
                          max={4.5}
                          step={0.5}
                          value={analysisParam.press}
                          onChange={this.onChangeAnalysisData.bind(this, 'press')}
                          formatter={value => `${value}MPa`}
                          parser={value => value.replace('MPa', '')}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                    <h4>温度T/度</h4>
                    <Row gutter={12} className={styles.calculateItems}>
                      <Col span={15}>
                        <Slider
                          min={0}
                          max={30}
                          step={5}
                          marks={tMarks}
                          value={analysisParam.temparture}
                          onChange={this.onChangeAnalysisData.bind(this, 'temparture')}
                        />
                      </Col>
                      <Col span={4}>
                        <InputNumber
                          min={0}
                          max={30}
                          step={5}
                          value={analysisParam.temparture}
                          onChange={this.onChangeAnalysisData.bind(this, 'temparture')}
                          formatter={value => `${value}度`}
                          parser={value => value.replace('度', '')}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
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
                  const tag = `对比数据${index}`
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
            <div id="mainChart" className={styles.chartArea}>
              <h4 className={styles.noDataSpan}>暂无数据</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
