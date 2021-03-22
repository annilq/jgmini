import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Edit as BaseForm } from '@/components/CustomForm';
import { getRouterConfig } from '@/models/menu';

@connect(
  null,
  null
)
class StepForm extends PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id, formCode },
      },
      location: {
        query: { routeName },
      },
      dispatch,
    } = this.props;
    this.id = id;
    const curRouter = getRouterConfig({ name: routeName });
    curRouter.formCode = formCode;
    curRouter.params = { formCode };
    this.formCode = formCode;
    dispatch({
      type: 'menu/setCurRouter',
      payload: { curRouter },
    });
  }

  render() {
    return (
      <PageHeaderWrapper>
        <BaseForm formCode={this.formCode} ISUSERCREATE />
      </PageHeaderWrapper>
    );
  }
}
export default StepForm;
