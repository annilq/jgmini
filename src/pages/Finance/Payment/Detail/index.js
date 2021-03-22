import React from 'react';

import SectionHeader from '@/components/SectionHeader';
import Detail from '@/components/CustomForm/detail/combine';
import TableList from '@/components/CustomForm/SubTable/detailList';

function Main(props) {
  const { item, formCode } = props;
  const { bizFinPaymentDetails = [] } = item;
  return (
    <Detail item={item} formCode={formCode}>
      {bizFinPaymentDetails && bizFinPaymentDetails.length > 0 && (
        <div className="containers">
          <SectionHeader
            title="付款明细"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
          />
          <TableList
            extraProps={{
              formCode: 'FinancePaymentDetail',
              referenceType: 1,
            }}
            value={item.bizFinPaymentDetails}
            expandable={{
              expandedRowRender: record => (
                <>
                  {record.materialList && record.materialList.length > 0 && (
                    <>
                      <SectionHeader
                        title="物料明细"
                        style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
                      />
                      <TableList
                        value={record.materialList}
                        extraProps={{
                          formCode: "ConPurMaterial",
                          referenceType: 1
                        }}
                        pagination={false}
                        components={{
                          header: {
                            cell: (cellprops) => <th {...cellprops} style={{ backgroundColor: "#ebebeb" }} />,
                          },
                        }}
                      />
                    </>)}
                  {record.invoiceList && record.invoiceList.length > 0 && (
                    <>
                      <SectionHeader
                        title="发票明细"
                        style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
                      />
                      <TableList
                        value={record.invoiceList}
                        extraProps={{
                          formCode: "ReInvoice",
                          referenceType: 1
                        }}
                        pagination={false}
                        components={{
                          header: {
                            cell: (cellprops) => <th {...cellprops} style={{ backgroundColor: "#ebebeb" }} />,
                          },
                        }}
                      />
                    </>)}
                </>
              ),
              indentSize: 0,
              rowExpandable: record => (record.materialList && record.materialList.length) || (record.invoiceList && record.invoiceList.length),
            }}
          />
        </div>
      )}
    </Detail>
  );
}
export default Main;
