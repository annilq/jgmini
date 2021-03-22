import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Badge, Button, Calendar, Empty } from 'antd';
import BreadcrumbView from '@/components/Breadcrumb';
import moment from 'moment';
import Loading from '@/components/Loading';
import IconFont from '@/components/IconFont';
import { sloarToLunar } from '@/utils/calendar';
import TaskStatusButton from '@/components/StatusButton/TaskStatusButton';
import styles from './index.less';

@connect(({ loading, taskSchedule }) => ({
  taskSchedule,
  loading:
    loading.effects['taskSchedule/getTaskByDate'] ||
    loading.effects['taskSchedule/getScheduleByMonth'] ||
    false,
}))
class Index extends PureComponent {
  state = {
    date: moment(),
  };

  componentDidMount() {
    const today = moment();

    this.getScheduleByMonth({ year: today.year(), month: today.month() + 1 });
    this.getTaskByDate({ date: today.format('YYYY-MM-DD') });
  }

  getScheduleByMonth = params => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskSchedule/getScheduleByMonth', payload: params });
  };

  getTaskByDate = params => {
    const { dispatch } = this.props;
    dispatch({ type: 'taskSchedule/getTaskByDate', payload: params });
  };

  onDateChange = date => {
    this.setState(
      {
        date,
      },
      () => {
        this.getTaskByDate({ date: date.format('YYYY-MM-DD') });
      }
    );
  };

  renderCalendarHeader = ({ value, type, onChange, onTypeChange }) => {
    return (
      <div className={styles.header}>
        <div className={styles.title}>{value.format('YYYY年MM月')}</div>
        <div>
          <Button.Group size="default">
            <Button
              onClick={() => {
                const month = value.subtract(1, 'months');
                onChange(month);
                this.getScheduleByMonth({ year: month.year(), month: month.month() + 1 });
              }}
            >
              <LeftOutlined />
              上一月
            </Button>
            <Button
              onClick={() => {
                const month = value.add(1, 'months');
                onChange(month);
                this.getScheduleByMonth({ year: month.year(), month: month.month() + 1 });
              }}
            >
              下一月
              <RightOutlined />
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  };

  getCellData = value => {
    const {
      taskSchedule: { scheduleList },
    } = this.props;

    if (scheduleList.length === 0) return [];

    const date = value.format('YYYY-MM-DD');
    const cellItem = scheduleList.find(item => item.date == date);
    return cellItem && cellItem.tasks ? cellItem.tasks : [];
  };

  renderDateCell = value => {
    const listData = this.getCellData(value);
    return (
      <div className={styles.cell}>
        <div className={styles.lunar}>
          {sloarToLunar(value.year(), value.month(), value.date()).lunarDay}
        </div>
        {listData.length
          ? listData.map(item => <Badge color="#f50" text={item.title} key={item.id} />)
          : null}
      </div>
    );
  };

  render() {
    const { date } = this.state;
    const {
      loading,
      taskSchedule: { taskList },
    } = this.props;

    return (
      <BreadcrumbView>
        <Loading loading={loading}>
          <div style={{ display: 'flex', marginTop: '16px' }}>
            <div className={styles.calendar}>
              <Calendar
                headerRender={this.renderCalendarHeader}
                dateCellRender={this.renderDateCell}
                onChange={this.onDateChange}
              />
            </div>
            <div className={styles.schedule}>
              <div className={styles.title}>{date.format('YYYY年MM月DD日  星期dd')}</div>
              <div className={styles.divider} />
              {taskList.length > 0 ? (
                taskList.map(item => (
                  <>
                    <div className={styles.taskItem}>
                      <div className={styles.top}>
                        {item.title}
                        <TaskStatusButton data={item} style={{ marginLeft: '16px' }}/>
                      </div>
                      <div className={styles.bottom}>
                        <IconFont icon="time" />
                        <span style={{ marginLeft: '6px' }}>
                          {item.beginDate} {item.endDate}
                        </span>
                        <span
                          style={{
                            flex: 1,
                            textAlign: 'right',
                            paddingRight: '10px',
                            color: 'red',
                          }}
                        >
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <div className={styles.divider} />
                  </>
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </div>
        </Loading>
      </BreadcrumbView>
    );
  }
}

export default Index;
