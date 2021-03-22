import React from 'react';

const actionColumns = [
  {
    title: '操作',
    render: (text, record) => (
      <>
        <a onClick={() => {
          window.g_app._store.dispatch({ type: 'jgTableModel/dataId', payload: record.id });
          window.g_app._store.dispatch({ type: 'jgTableModel/toggleDetail', payload: true });
        }}>详细</a>
      </>
    ),
  },
];

export default actionColumns;
