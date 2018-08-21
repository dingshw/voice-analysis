import React, {Component} from 'react'
import { Button, Slider, InputNumber, Row, Col, Tag, Tooltip } from 'antd'
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
      transmission: 0,
      refect: 0,
      bondacust: 0,
    },
  }

  componentDidMount() {
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

  addCompareAnalysisData = () => {
    const { compareAnalysisData, analysisParam } = this.state
    compareAnalysisData.push(analysisParam)
    this.setState({compareAnalysisData})
  }

  removeAnalysisData = (index) => {
    let { compareAnalysisData } = this.state
    compareAnalysisData.splice(index, 1)
    this.setState({compareAnalysisData})
  }

  handleAvg = () => {
    const { analysisAvg } = this.state
    const { analysisData } = this.props
    const categories = []
    const seriesData = {'refect': [], 'transmission': [], 'bondacust': []}
    this.formatAnalysisData(analysisData, categories, seriesData)
    analysisAvg.bondacust = (_.sum(seriesData.bondacust)/seriesData.bondacust.length).toFixed(2)
    analysisAvg.refect = (_.sum(seriesData.refect)/seriesData.refect.length).toFixed(2)
    analysisAvg.transmission = (_.sum(seriesData.transmission)/seriesData.transmission.length).toFixed(2)
    this.setState({analysisAvg})
  }

  showAnalysisData = () => {
    const { handleAnalysisData } = this.props
    const { analysisParam } = this.state
    handleAnalysisData(analysisParam)
  }

  formatAnalysisData = (analysisData, categories, seriesData) => {
    for(const i in analysisData) {
      if(analysisData[i]) {
        categories.push(analysisData[i].rate)
        seriesData.refect.push(analysisData[i].refect)
        seriesData.transmission.push(analysisData[i].transmission)
        seriesData.bondacust.push(analysisData[i].bondacust)
      }
    }
    return {categories, seriesData}
  }

  changeChartData = (analysisData) => {
    let categories = []
    let seriesData = {'refect': [], 'transmission': [], 'bondacust': []}
    this.formatAnalysisData(analysisData, categories, seriesData)
    if(!myChart) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById('mainChart'));
    }
    // 填入数据
    myChart.setOption({
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

      },
      legend: {
        data:['反射系数','透射系数','吸声系数'],
        x: 'center',
        y: 'bottom',
      },
      xAxis: {
        data: categories || [],
      },
      yAxis: {},
      series: [
        {
          // 根据名字对应到相应的系列
          name: '反射系数',
          type: 'line',
          data: seriesData.refect || [],
          markLine: {
              data: [
                  {type: 'average', name: '平均值'},
              ],
          },
        }, {
          // 根据名字对应到相应的系列
          name: '透射系数',
          type: 'line',
          data: seriesData.transmission || [],
          markLine: {
            data: [
                {type: 'average', name: '平均值'},
            ],
          },
        }, {
          // 根据名字对应到相应的系列
          name: '吸声系数',
          type: 'line',
          data: seriesData.bondacust || [],
          markLine: {
            data: [
                {type: 'average', name: '平均值'},
            ],
          },
        },
      ],
    });
  }

  render () {
    const { analysisData } = this.props
    const { analysisParam, compareAnalysisData, analysisAvg } = this.state

    if(analysisData && analysisData.length>0 && !_.isEqual(analysisData, historyAnalysisData)) {
      historyAnalysisData = _.cloneDeep(analysisData)
      this.changeChartData(analysisData)
    }
    const marks = {
      0: '0M',
      10: '1OK',
      20: '2OK',
      30: {
        style: {
          color: '#f50',
        },
        label: <strong>30K</strong>,
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
              <h4>压力P/Mpa</h4>
              <Row gutter={12} className={styles.calculateItems}>
                <Col span={15}>
                  <Slider
                    min={0}
                    max={4.5}
                    step={0.5}
                    value={analysisParam.press}
                    onChange={this.onChangeAnalysisData.bind(this, 'press')}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={0}
                    max={4.5}
                    value={analysisParam.press}
                    onChange={this.onChangeAnalysisData.bind(this, 'press')}
                    formatter={value => `${value}Mpa`}
                    parser={value => value.replace('Mpa', '')}
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
                    value={analysisParam.temparture}
                    onChange={this.onChangeAnalysisData.bind(this, 'temparture')}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={0}
                    max={30}
                    value={analysisParam.temparture}
                    onChange={this.onChangeAnalysisData.bind(this, 'temparture')}
                    formatter={value => `${value}度`}
                    parser={value => value.replace('度', '')}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              <div className={styles.calculateBtns}>
                <Button type="primary" className={styles.showNum} onClick={this.showAnalysisData.bind(this)}>显示</Button>
                <Button className={styles.addConstact} onClick={this.addCompareAnalysisData.bind(this)}>加入对比</Button>
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
            <div id="mainChart" className={styles.chartArea}>
              暂无数据
            </div>
            <div className={styles.chartItems}>
              <span>已加入的对比数据</span>
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
              <Button type="primary" className={styles.startBtn}>开始对比</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
