const routeMaps = [
  {
    path: '/project/index',
    componentPath: 'Project',
    formCode: 'Project',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // contract
  {
    path: '/contract/inContract',
    formCode: 'Contract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 材料采购
  {
    path: '/contract/outContract',
    formCode: 'materialContract',
    componentPath: 'Contract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 租赁
  {
    path: '/contract/leaseContract',
    formCode: 'leaseContract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 分包
  {
    path: '/contract/laborContract',
    formCode: 'laborContract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 其他
  {
    path: '/contract/otherContract',
    formCode: 'otherContract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 劳务
  {
    path: '/contract/workerContract',
    formCode: 'workerContract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 进项发票
  {
    path: '/finance/invoice/inputInvoice',
    formCode: 'InputInvoice',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 销项发票
  {
    path: '/finance/invoice/saleInvoice',
    formCode: 'SaleInvoice',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/payment',
    formCode: 'PaymentFinance',
    componentPath: 'Finance/Payment',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/receipt',
    formCode: 'ReceiptFinance',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/settle',
    formCode: 'Settle',
    componentPath: 'Finance/Settle',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/loan',
    formCode: 'LoanBill',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/reimburse',
    formCode: 'ReimburseBill',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/finance/purchaseBill',
    formCode: 'PurchasePayable',
    params: { approveStatus: 'COMPLETE' },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 农名工工资
  {
    path: '/finance/salary',
    formCode: 'SalaryFinance',
    componentPath: 'Finance/Salary',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/supply/purchase/purchaseApply',
    formCode: 'PurchaseApply',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/supply/purchase/purchaseEnquiry',
    componentPath: 'Supply/Purchase/purchaseEnquiry',
    formCode: 'PurchaseEnquiry',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/supply/purchase/purchaseNeed',
    formCode: 'PurchaseNeed',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/supply/purchase/purchaseContract',
    formCode: 'Contract',
    params: { contractCate: '3' },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 采购入库
  {
    path: '/supply/stock/depotIn',
    formCode: 'PurchaseDepotIn',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 归还入库
  {
    path: '/supply/stock/depotIn2',
    formCode: 'ReturnDepotIn',
    componentPath: 'Supply/Stock/returnDepotIn',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 领用出库
  {
    path: '/supply/stock/depotOut',
    formCode: 'DepotOut',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 退货出库
  {
    path: '/supply/stock/depotOut2',
    formCode: 'RefundDepotOut',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存调拨
  {
    path: '/supply/stock/depotTransfer',
    formCode: 'DepotTransfer',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存盘点
  {
    path: '/supply/stock/depotCheckDetail',
    formCode: 'DepotCheck',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存详情
  {
    path: '/supply/stock/depotDetail',
    operations: ['DOWNLOAD']
  },
  // 租赁进场
  {
    path: '/supply/rent/leaseenter',
    formCode: 'LeaseIn',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 租赁退场
  {
    path: '/supply/rent/leaseleave',
    formCode: 'LeaseOut',
    componentPath: 'Supply/Rent/LeaseLeave',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 租赁盘点
  {
    path: '/supply/rent/leasecheck',
    formCode: 'LeaseInDetail',
    componentPath: 'Supply/Rent/LeaseCheck',
    operations: ['DOWNLOAD'],
    showCreator: false,
  },
  {
    path: '/database/supplier',
    formCode: 'Supplier',
    operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  {
    path: '/database/material',
    formCode: 'Material',
    operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  {
    path: '/database/machine',
    formCode: 'Machine',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/database/depot',
    formCode: 'Depot',
    componentPath: 'Database/Depot',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // task 任务
  {
    path: '/taskManagement/task/pending',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'PendingList',
  },
  {
    path: '/taskManagement/task/create',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'CreateList',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/taskManagement/task/charge',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'Charge',
  },
  {
    path: '/taskManagement/task/participate',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'ParticipateList',
  },
  {
    path: '/taskManagement/task/confirm',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'ConfirmList',
  },
  {
    path: '/taskManagement/task/all',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'AllList',
    operations: ['DOWNLOAD'],
  },
  // worklog 工作日志
  {
    path: '/worklog/index',
    formCode: 'WorkLog',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 完全自定义组件
  {
    path: '/usercreate/:formCode',
    serviceType: 'USERCREATE',
    formCode: 'USERCREATE',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 质量检查
  {
    path: '/quality/qualityCheck',
    formCode: 'QualityCheck',
    componentPath: 'Check',
    params: { category: 1 },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 待我检查
  {
    path: '/quality/checkWaiting',
    formCode: 'QualityCheck',
    componentPath: 'CheckWaiting',
    params: { category: 1, status: '0' },
  },
  // 质量整改
  {
    path: '/quality/rectification',
    formCode: 'Reform',
    operations: ['EDIT', 'DELETE'],
    params: { category: 1 },
    componentPath: 'Reform',
  },
  // 奖惩
  {
    path: '/quality/incentive',
    formCode: 'Incentive',
    operations: ['EDIT', 'DELETE'],
    params: { category: 1 },
  },
  {
    path: '/safety/safetyCheck',
    formCode: 'QualityCheck',
    componentPath: 'Check',
    params: { category: 2 },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 待我检查
  {
    path: '/safety/checkWaiting',
    formCode: 'QualityCheck',
    componentPath: 'CheckWaiting',
    params: { category: 2, status: '0' },
  },
  // 安全整改
  {
    path: '/safety/rectification',
    formCode: 'Reform',
    params: { category: 2 },
    componentPath: 'Reform',
    operations: ['EDIT', 'DELETE'],
  },
  // 奖惩
  {
    path: '/safety/incentive',
    formCode: 'Incentive',
    params: { category: 2 },
    operations: ['EDIT', 'DELETE'],
  },
  // 劳务班组
  {
    path: '/labor/laborteam',
    formCode: 'classGroup',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 资金计划模版
  {
    path: '/projectFund/fundModel',
    formCode: 'FundDetail',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 资金计划
  {
    path: '/projectFund/fundPlan',
    formCode: 'project_fund_plan',
    componentPath: 'ProjectFund',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/projectFund/fundReport',
    formCode: 'FundReport',
    componentPath: 'ProjectFundReport',
    operations: ['WRITE']
  },
  // 物料计划
  {
    path: '/projectMaterial/materialPlan',
    formCode: 'materialPlan',
    componentPath: 'MaterialPlan',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 物资填报
  {
    path: '/projectMaterial/materialReport',
    formCode: 'materialReport',
    operations: ['WRITE'],
    componentPath: 'MaterialReport',
  },
]
function getConfigFormformCode(formCode) {
  return routeMaps.find(item => item.formCode === formCode) || {}
}

export default getConfigFormformCode