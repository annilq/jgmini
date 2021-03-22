import React, { useEffect } from 'react';
import { Button, Input, Form, Row, Col, Select, Switch, Radio } from 'antd';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { DataPicker, DataSelecter } from '@/components/CustomForm';
import FormEditData from '@/components/CustomForm/FormItem/edit';
import styles from '@/components/CustomForm/index.less';
import useRefresh from '@/hooks/useRefresh';

const FormItem = Form.Item;

function Edit(props) {
  const {
    data,
    parentList,
    match: {
      params: { id },
    },
    route,
    history,
    dispatch
  } = props;

  const [form] = Form.useForm();
  const refresh = useRefresh();
  const { state, isRegularCheck, parentId } = form.getFieldsValue();
  const handleSubmit = values => {
    if (id) {
      dispatch({
        type: 'qualitySetting/updateRemote',
        payload: { ...values, ...route.params, id },
        callback: () => {
          history.goBack();
        }
      });
    } else
      dispatch({
        type: 'qualitySetting/addRemote',
        payload: { ...values, ...route.params },
        callback: () => {
          history.goBack();
        }
      });
  };

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'qualitySetting/queryRemote', payload: { id }, callback: (resp) => {
          form.setFieldsValue(resp)
          refresh();
        }
      });
    }
  }, [id]);

  useEffect(() => {
    dispatch({
      type: 'qualitySetting/parentListRemote', payload: { ...route.params }
    });
  }, []);


  function onSelectProject(data) {
    form.setFieldsValue({ projectName: data.name });
    refresh();
  }

  function onSelectUser(data) {
    form.setFieldsValue({ inspectorName: data.name });
    refresh();
  }

  function onParentIdChange(value) {
    if (value) {
      const selectItem = parentList.find(item => item.id === value);
      const {
        projectId, projectName
      } = selectItem
      const formState = form.getFieldsValue();
      form.setFieldsValue({ ...formState, projectId, projectName })
    }
    refresh();
  }

  return (
    <PageHeaderWrapper>
      <div className={styles.baseForm}>
        <div style={{ flex: 1 }}>
          <Form
            layout="horizontal"
            onFinish={handleSubmit}
            initialValues={data}
            form={form}
          >
            <div className="containers">
              <div className="form-container-content">
                <Row style={{ padding: 0, margin: 0, width: "100%" }}>
                  <Col md={12} sm={24} className="form-info-item">
                    <FormItem name="parentId" label="选择父项">
                      <Select
                        showArrow
                        style={{ width: '100%' }}
                        allowClear
                        onChange={onParentIdChange}
                      >
                        {parentList.map(item => <Select.Option value={item.id} key={item.id}>{item.content}</Select.Option>)}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24} className="form-info-item">
                    <FormItem
                      label="项目名称"
                      name="projectId"
                      rules={[{ required: true, message: '请选择项目' }]}
                    >
                      <DataPicker
                        extraProps={{
                          formCode: 'Project',
                        }}
                        formdata={{ ...form.getFieldsValue() }}
                        onSelect={formdata => onSelectProject(formdata)}
                        // 清空作用
                        readOnly={!!parentId}
                        onChange={() => onSelectProject({})}
                        placeholder="项目"
                      />
                    </FormItem>
                    <FormItem
                      name="projectName"
                      style={{ display: 'none' }}
                    >
                      <span />
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24} className="form-info-item">
                    <FormItem
                      name="content"
                      label="检查项名称"
                      rules={[{ required: true, message: '请输入检查项名称' }]}
                    >
                      <Input placeholder="请输入检查项名称" />
                    </FormItem>
                  </Col>
                  <Col md={24} sm={24} className="form-info-item">
                    <FormItem
                      name="standardContent"
                      label="检查验收标准"
                    >
                      <Input.TextArea placeholder="验收标准" autosize={{ minRows: 4, maxRows: 4 }} />
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24} className="form-info-item">
                    <FormItem name="state" label="检查状态">
                      <DataSelecter
                        extraProps={{
                          flag: "inspectItemStatusMap",
                          type: 2,
                        }}
                        store={window.g_app._store}
                      >
                        {(candidates, { onChange, ...rest }) => (
                          <Select
                            showArrow
                            style={{ width: '100%' }}
                            options={candidates}
                            {...rest}
                            onChange={(value) => { onChange(value); refresh() }}
                          />
                        )}
                      </DataSelecter>
                    </FormItem>
                  </Col>
                  <Col md={24} sm={24} className="form-info-item" style={{ display: parseInt(state, 10) === 2 ? "flex" : "none" }} >
                    <FormItem name="isRegularCheck" label="是否定期检查" valuePropName="checked" style={{ display: "inline-flex" }}>
                      <Switch onChange={refresh} />
                    </FormItem>
                    <div style={{ display: "inline-flex", lineHeight: "30px", marginLeft: 10, color: "#999", fontSize: 12 }}> 开启定期检查周期后，按照选择的周期将定期为负责人创建新的检查单</div>
                  </Col>
                  {isRegularCheck && parseInt(state, 10) === 2 && (
                    <>
                      <Col md={24} sm={24} className="form-info-item">
                        <FormItem name="checkCycle" label="检查周期" rules={[{ required: true, message: '请选择检查周期' }]}>
                          <FormEditData
                            data={{
                              controlCode: "checkCycle",
                              controlType: 4,
                              placeHolder: "检查周期",
                              extraProps: {
                                flag: "inspectItemCycleMap",
                                type: 2,
                              }
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col md={24} sm={24} className="form-info-item">
                        <FormItem
                          shouldUpdate
                        >
                          {formInstance => {
                            const { inspectorName } = formInstance.getFieldsValue();
                            return (
                              <FormItem name="inspectorId" label="检查负责人" rules={[{ required: true, message: '请选择检查人' }]}>
                                <DataPicker
                                  extraProps={{
                                    formCode: 'User',
                                    nameCode: "name"
                                  }}
                                  formdata={{ ...form.getFieldsValue() }}
                                  onSelect={formdata => onSelectUser(formdata)}
                                  // 清空作用
                                  onChange={() => onSelectUser({})}
                                  placeholder="负责人"
                                >
                                  <Input
                                    value={inspectorName}
                                    placeholder="负责人"
                                    suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                                    style={{ flex: 1, verticalAlign: 'middle' }}
                                  />
                                </DataPicker>
                              </FormItem>
                            );
                          }}
                        </FormItem>
                        <FormItem
                          name="inspectorName"
                          style={{ display: 'none' }}
                        >
                          <span />
                        </FormItem>
                      </Col>
                    </>
                  )}
                </Row>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" style={{ padding: '0 20px', }}>
                保存
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </PageHeaderWrapper>
  );
}

export default connect(({ qualitySetting, loading }) => ({
  formdata: qualitySetting.item,
  parentList: qualitySetting.parentList,
  submitloading:
    loading.effects['qualitySetting/updateRemote'] ||
    loading.effects['qualitySetting/addRemote'] ||
    false,
}))(Edit);
