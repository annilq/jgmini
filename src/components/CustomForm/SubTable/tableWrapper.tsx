import React from 'react';
import { View } from 'remax/wechat';
import tableStyles from "./index.less"

function TableWrapper(props) {
    const { onAddItem, children } = props;
    return (
        <>
            {children}
            {onAddItem && <View
                onClick={onAddItem}
                className={tableStyles["table-addbtn"]}
            > 添加
          </View>}
        </>
    );
}

export default TableWrapper;
