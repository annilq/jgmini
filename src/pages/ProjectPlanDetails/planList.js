import React from 'react'
import { useTable, useExpanded, useRowState } from 'react-table'
import { Button } from 'antd'

function Table({ columns, data, updateRowData, onSubmit }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: false,
      // updateRowData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateRowData,
      initialState: { rowState: data },
      getSubRows: (row) => row.children
    },
    useExpanded,
    useRowState,
  )
  // console.log(state);
  return (
    <>
      <div className="ant-table">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table {...getTableProps()} style={{ "tableLayout": "auto" }}>
              <thead className="ant-table-thead">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="ant-table-row">
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className="ant-table-cell">{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="ant-table-tbody">
                {rows.map((row) => {
                  // console.log(rows);
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()} className="ant-table-row">
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="ant-table-cell">
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Button type="primary" onClick={onSubmit}>保存</Button>
      </div>
    </>
  )
}

export default Table;
