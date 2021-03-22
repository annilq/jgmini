import { statistic as api } from '@/services/api';

const Project = {
  list: api.projectList
}

const InContract = {
  list: api.inContractList
}

const OutContract = {
  list: api.outContractList
}

const Safety = {
  list: api.safetyList,
  listByChecker: api.safetyCheckerList,
}

const Quality = {
  list: api.qualityList,
  listByChecker: api.qualityCheckerList,
}

const PurchaseApply = {
  list: api.purchaseList,
  listByMaterial: api.purchaseMaterialList,
}

const DepotIn = {
  listBySupplierId: api.depotInSupplierList,
  listByMaterial: api.depotInMaterialList,
}

const DepotOut = {
  depotOutList: api.depotOutList,
  depotOutMaterialList: api.depotOutMaterialList,
}

const DepotTransfer = {
  transferInList: api.transferInList,
  transferOutList: api.transferOutList,
}

const Receipt = {
  receiptList: api.receiptList,
}

const Payment = {
  paymentList: api.paymentList,
}

const Settle = {
  settleProjectList: api.settleProjectList,
  settleSupplierList: api.settleSupplierList,
}

const Salary = {
  salaryList: api.salaryList,
}

// 统计报表共有以下模块
const ReportCodeMap = {
  "projectFee": {
    icon: "projectFee",
    componentPath: "ProjectFee",
    service: Project
  },
  "inContract": {
    icon: "inContract",
    componentPath: "InContract",
    service: InContract
  },
  "outContract": {
    icon: "outContract",
    componentPath: "OutContract",
    service: OutContract
  },
  "quality": {
    icon: "quality",
    componentPath: "Quality",
    service: Quality,
  },
  "safety": {
    icon: "safety",
    componentPath: "Quality",
    service: Safety,
  },
  "purchaseApply": {
    icon: "purchaseApply",
    componentPath: "PurchaseApply",
    service: PurchaseApply,
  },
  "depotIn": {
    icon: "depotIn",
    componentPath: "DepotIn",
    service: DepotIn,
  },
  "depotOut": {
    icon: "depotOut",
    componentPath: "DepotOut",
    service: DepotOut
  },
  "depotTransfer": {
    icon: "depotTransfer",
    componentPath: "DepotTransfer",
    service: DepotTransfer
  },
  "receipt": {
    icon: "receipt",
    componentPath: "Receipt",
    service: Receipt
  },
  "payment": {
    icon: "payment",
    componentPath: "Payment",
    service: Payment
  },
  "settle": {
    icon: "settle",
    componentPath: "Settle",
    service: Settle
  },
  "salary": {
    icon: "salary",
    componentPath: "Salary",
    service: Salary
  },
}

export interface FlowConfig {
  icon: string;
  componentPath: string;
  service?: { list: any;[index: number]: any };
}

export type ReportCode = keyof typeof ReportCodeMap;

// 根据ReportCode字段为获取模块的图标、组件路径以及列表接口
export const getConfigFromCode = (code: ReportCode): FlowConfig => {
  return ReportCodeMap[code];
}

