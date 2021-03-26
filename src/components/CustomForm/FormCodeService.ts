// 根据具体的formCode返回对应的service
// 之前写在router的配置里面，如果引用不在router配置的formCode表单有点不方便
import get from 'lodash/get';

import Service from '@/services';

const FormCodeServiceMap = {
  Project: 'Project',
  Approval: 'Workflow.Approval',
  Contract: 'Contract',
  InputInvoice: 'Invoice.inputInvoice',
  SaleInvoice: 'Invoice.saleInvoice',
  PaymentFinance: 'Finance.Payment',
  ReceiptFinance: 'Finance.Receipt',
  Settle: 'Finance.Settle',
  LoanBill: 'Finance.Loan',
  ReimburseBill: 'Finance.Reimburse',
  PurchasePayable: 'Purchase.PurchaseSettle',
  PurchaseApply: 'Purchase.PurchaseApply',
  PurchaseEnquiry: 'Purchase.PurchaseEnquiry',
  PurchaseNeed: 'Purchase.PurchaseNeed',
  PurchaseDepotIn: 'Supply.DepotIn',
  SalaryFinance: 'Finance.Salary',
  ReturnDepotIn: 'Supply.ReturnDepotIn',
  DepotOut: 'Supply.DepotOut',
  RefundDepotOut: 'Supply.RefundDepotOut',
  DepotTransfer: 'Supply.DepotTransfer',
  DepotCheck: 'Supply.DepotCheck',
  LeaseIn: 'Rent.LeaseIn',
  LeaseOut: 'Rent.LeaseOut',
  LeaseInDetail: 'Rent.LeaseInDetail',
  Supplier: 'Database.Supplier',
  Material: 'Database.Material',
  Machine: 'Database.Machine',
  Depot: 'Database.Depot',
  User: 'System.User',
  UserGroup: 'System.UserGroup',
  QualityCheck: "Field.QualityInspection",
  Incentive: "Field.InspectionRap",
  Reform: "Field.InspectionReform",
  // SafetyInspection: 'Field.SafetyInspection',
  // QualityInspection: 'Field.QualityInspection',
  //   task一个formCode对应几个service
  Task: 'Task',
  WorkLog: 'WorkLog',
  //   全自定义表单
  USERCREATE: 'UserCreate',
};

type FormCodeType = keyof typeof FormCodeServiceMap;
// 只有下面两种formCode，在不同的列表用到不同的service
// 任务类型
type TaskType = 'CreateList' | 'Charge' | 'ParticipateList' | 'ConfirmList';
// 审批类型
type Approval = 'myhandle' | 'mycreate' | 'finish' | 'copytome' | 'rejectservice';

// 自定义表单类型
type UserCreate = 'USERCREATE';

type ServiceType = Approval | TaskType | UserCreate;

function getServiceFromFormCode(formCode: FormCodeType, type?: ServiceType) {
  // type === 'USERCREATE'说明是全自定义
  const serviceName = FormCodeServiceMap[formCode];
  return get(Service, serviceName);
}

export { FormCodeType, ServiceType };

export default getServiceFromFormCode;
