import React, { PureComponent } from 'react';
import { Menu, Icon, Tag, Divider } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './index.less';
import userIcon from '../../../public/icon_user.svg';
import logout from '../../../public/icon_logout.svg';
import management from '../../../public/icon_management.svg';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNoticeData() {
    const { notices } = this.props;
    if (notices == null || notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      authoriyType
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <div className={styles.headerTItle}>
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <span className={styles.banner}>声学参数处理与分析系统</span>
        </div>
        <div className={styles.right}>
          {/* {authoriyType === 'user' ? (
            <span className={`${styles.action} ${styles.management}`}>
              <img className={styles.avatar} src={management} />
              <span className={styles.name}>后台管理</span>
            </span>) : ''
          } */}
          {currentUser.name ?
            <span className={`${styles.action} ${styles.logout}`} onClick={onMenuClick.bind(this, {key:'logout'})}>
              <img className={styles.avatar} src={logout} />
              <span className={styles.name}>注销</span>
            </span> : ''}
          {currentUser.name ? (
            <span className={`${styles.action} ${styles.account}`}>
              <img className={styles.avatar} src={userIcon} />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          ) : (
            <span className={`${styles.action} ${styles.account}`}>
              <img className={styles.avatar} src={userIcon} />
              <span className={styles.name}>未登录</span>
            </span>
          )}
        </div>
      </div>
    );
  }
}
