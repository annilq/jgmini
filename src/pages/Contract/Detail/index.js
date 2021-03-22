import React from 'react'

import Detail from '@/components/CustomForm/detail/combine';
import List from "./detail"

function Main(props) {
  const { item, formCode } = props;
  const { detailList = [] } = item;
  return (
    <Detail item={item} formCode={formCode}>
      {detailList.length > 0 && <List data={item} />}
    </Detail>
  );

}
export default Main;
