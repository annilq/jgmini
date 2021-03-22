const CommonPage = './CommonPage';
const CommonPageEdit = './CommonPage/Edit';
const UserCreatePage = './UserCreatePage';
const UserCreatePageEdit = './UserCreatePage/Edit';
const DetailPage = './DetailPage';
const EditPage = './EditPage';
//每个自定义的router都要有 formCode 占位用,方便编辑页面查找
// 因为查找router的时候会根据有没有formCode来判断是不是要找的router

export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/dashboard' },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'gzt',
      //   component: './Dashboard',
      // },
      // project
      {
        path: '/project',
        name: 'project',
        icon: 'xmgl',
        // 公司视图进入项目视图的时候一定要先进入dashboard初始化projectId
        // 后面所有操作都是根据这个projectId来操作
        routes: [
          {
            path: '/project/dashboard',
            name: 'project',
            component: './Project/Dashboard',
          },
          {
            path: '/project/index',
            name: 'project',
            componentPath: 'Project',
            formCode: 'Project',
            component: CommonPage,
            operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
          },
          {
            path: '/project/index/edit/:id?',
            name: 'add',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          {
            path: '/project/category',
            name: 'category',
            component: './Project/Category',
          },
        ],
      },
      // office
      {
        path: '/office',
        name: 'office',
        icon: 'bggl',
        routes: [
          {
            path: '/office/approval',
            name: 'approval',
            formCode: 'Approval',
            serviceType: 'myhandle',
            component: './Office/Approval',
          },
          {
            path: '/office/mycreate',
            name: 'mycreate',
            formCode: 'Approval',
            serviceType: 'mycreate',
            component: './Office/Approval',
          },
          {
            path: '/office/finish',
            name: 'finish',
            formCode: 'Approval',
            serviceType: 'finish',
            component: './Office/Approval',
          },
          {
            path: '/office/copytome',
            name: 'finish',
            formCode: 'Approval',
            serviceType: 'copytome',
            component: './Office/Approval',
          },
          {
            path: '/office/reject',
            name: 'finish',
            formCode: 'Approval',
            serviceType: 'rejectservice',
            component: './Office/Approval',
          },
        ],
      },
      // contract
      {
        path: '/contract',
        name: 'contract',
        icon: 'htgl',
        routes: [
          {
            path: '/contract/inContract',
            name: 'inContract',
            formCode: 'Contract',
            component: CommonPage,
            operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
          },
          {
            path: '/contract/inContract/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          // 材料采购
          {
            path: '/contract/outContract',
            name: 'materialContract',
            formCode: 'materialContract',
            componentPath: 'Contract',
            component: CommonPage,
            operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
          },
          {
            path: '/contract/outContract/edit/:id?',
            componentPath: 'Contract',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          // 租赁
          {
            path: '/contract/leaseContract',
            name: 'leaseContract',
            formCode: 'leaseContract',
            component: CommonPage,
            operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
          },

          {
            path: '/contract/leaseContract/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          // 分包
          {
            path: '/contract/laborContract',
            name: 'laborContract',
            formCode: 'laborContract',
            component: CommonPage,
            operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
          },
          {
            path: '/contract/laborContract/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
        ],
      },
      // finance
      {
        path: '/finance',
        name: 'finance',
        icon: 'cwgl',
        routes: [
          {
            path: '/finance/invoice',
            name: 'invoice',
            routes: [
              // 进项发票
              {
                path: '/finance/invoice/inputInvoice',
                name: 'InputInvoice',
                formCode: 'InputInvoice',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              {
                path: '/finance/invoice/inputInvoice/edit/:id?',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              // 销项发票
              {
                path: '/finance/invoice/saleInvoice',
                name: 'SaleInvoice',
                formCode: 'SaleInvoice',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              {
                path: '/finance/invoice/saleInvoice/edit/:id?',
                hideInMenu: true,
                component: CommonPageEdit,
              },
            ],
          },
          {
            path: '/finance/payment',
            name: 'payment',
            formCode: 'PaymentFinance',
            componentPath: 'Finance/Payment',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
          },
          {
            path: '/finance/payment/edit/:id?',
            hideInMenu: true,
            componentPath: 'Finance/Payment',
            component: CommonPageEdit,
          },
          {
            path: '/finance/receipt',
            name: 'receipt',
            formCode: 'ReceiptFinance',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
          },
          {
            path: '/finance/receipt/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          {
            path: '/finance/settle',
            name: 'Settle',
            formCode: 'Settle',
            componentPath: 'Finance/Settle',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
          },
          {
            path: '/finance/settle/edit/:id?',
            name: 'Settle',
            hideInMenu: true,
            componentPath: 'Finance/Settle',
            component: CommonPageEdit,
          },
          {
            path: '/finance/loan',
            name: 'loan',
            formCode: 'LoanBill',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
          },
          {
            path: '/finance/loan/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          {
            path: '/finance/reimburse',
            name: 'reimburse',
            formCode: 'ReimburseBill',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/finance/reimburse/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          {
            path: '/finance/purchaseBill',
            name: 'purchaseBill',
            formCode: 'PurchasePayable',
            params: { approveStatus: 'COMPLETE' },
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/finance/purchaseBill/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          // 农名工工资
          {
            path: '/finance/salary',
            name: 'salary',
            formCode: 'SalaryFinance',
            componentPath: 'Finance/Salary',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/finance/salary/edit/:id?',
            hideInMenu: true,
            componentPath: 'Finance/Salary',
            component: CommonPageEdit,
          },
        ],
      },
      // supply
      {
        path: '/supply',
        name: 'supply',
        icon: 'wzgl',
        routes: [
          {
            path: '/supply/purchase',
            name: 'purchase',
            routes: [
              {
                path: '/supply/purchase/purchaseApply',
                name: 'purchaseApply',
                formCode: 'PurchaseApply',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              {
                path: '/supply/purchase/purchaseApply/edit/:id?',
                name: 'purchaseApply',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              {
                path: '/supply/purchase/purchaseEnquiry',
                name: 'purchaseEnquiry',
                componentPath: 'Supply/Purchase/purchaseEnquiry',
                formCode: 'PurchaseEnquiry',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE']
              },
              {
                path: '/supply/purchase/purchaseEnquiry/edit/:id?',
                name: 'purchaseEnquiry',
                componentPath: 'Supply/Purchase/purchaseEnquiry',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              {
                path: '/supply/purchase/purchaseNeed',
                name: 'purchaseNeed',
                formCode: 'PurchaseNeed',
                component: './Supply/Purchase/purchaseNeed',
                operations: ['WRITE', 'EDIT', 'DELETE']
              },
              {
                path: '/supply/purchase/purchaseNeed/edit/:id?',
                name: 'purchaseNeed',
                hideInMenu: true,
                component: './Supply/Purchase/purchaseNeed/Edit',
              },

              {
                path: '/supply/purchase/purchaseContract',
                name: 'purchaseContract',
                formCode: 'Contract',
                params: { contractCate: '3' },
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE']
              },
              {
                path: '/supply/purchase/purchaseContract/edit/:id?',
                name: 'purchaseContract',
                hideInMenu: true,
                component: CommonPageEdit,
              },
            ],
          },

          {
            path: '/supply/stock',
            name: 'stock',
            routes: [
              // 采购入库
              {
                path: '/supply/stock/depotIn',
                name: 'depotIn',
                formCode: 'PurchaseDepotIn',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              // 采购入库详情
              {
                path: '/supply/stock/depotIn/edit/:id?',
                name: 'PurchaseDepotIn',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              // 归还入库
              {
                path: '/supply/stock/depotIn2',
                name: 'depotIn2',
                formCode: 'ReturnDepotIn',
                componentPath: 'Supply/Stock/returnDepotIn',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },

              // 归还入库详情
              {
                path: '/supply/stock/depotIn2/edit/:id?',
                name: 'ReturnDepotIn',
                hideInMenu: true,
                componentPath: 'Supply/Stock/returnDepotIn',
                component: CommonPageEdit,
              },

              // 领用出库
              {
                path: '/supply/stock/depotOut',
                name: 'depotOut',
                formCode: 'DepotOut',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              // 领用出库详情
              {
                path: '/supply/stock/depotOut/edit/:id?',
                name: 'depotOut',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              // 退货出库
              {
                path: '/supply/stock/depotOut2',
                name: 'depotOut2',
                formCode: 'RefundDepotOut',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },

              // 出库详情
              {
                path: '/supply/stock/depotOut2/edit/:id?',
                name: 'depotOut',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              // 库存调拨
              {
                path: '/supply/stock/depotTransfer',
                name: 'depotTransfer',
                formCode: 'DepotTransfer',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              {
                path: '/supply/stock/depotTransfer/edit/:id?',
                name: 'depotTransfer',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              // 库存盘点
              {
                path: '/supply/stock/depotCheckDetail',
                name: 'depotCheckDetail',
                formCode: 'DepotCheck',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              {
                path: '/supply/stock/depotCheckDetail/edit/:id?',
                name: 'depotCheckDetail',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              // 库存详情
              {
                path: '/supply/stock/depotDetail',
                name: 'depotDetail',
                component: './Supply/Stock/depotDetail',
                operations: ['DOWNLOAD']
              },
              {
                path: '/supply/stock/depotDetail/edit/:id?',
                name: 'depotDetail',
                hideInMenu: true,
                component: CommonPageEdit,
              },
            ],
          },
          {
            path: '/supply/rent',
            name: 'rent',
            routes: [
              // 租赁进场
              {
                path: '/supply/rent/leaseenter',
                name: 'leaseenter',
                formCode: 'LeaseIn',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              {
                path: '/supply/rent/leaseenter/edit/:id?',
                name: 'leaseenter',
                hideInMenu: true,
                component: CommonPageEdit,
              },

              // 租赁退场
              {
                path: '/supply/rent/leaseleave',
                name: 'leaseleave',
                formCode: 'LeaseOut',
                componentPath: 'Supply/Rent/LeaseLeave',
                component: CommonPage,
                operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
              },
              {
                path: '/supply/rent/leaseleave/edit/:id?',
                name: 'leaseleave',
                componentPath: 'Supply/Rent/LeaseLeave',
                hideInMenu: true,
                component: CommonPageEdit,
              },
              // 租赁盘点
              {
                path: '/supply/rent/leasecheck',
                name: 'leasecheck',
                formCode: 'LeaseInDetail',
                componentPath: 'Supply/Rent/LeaseCheck',
                operations: ['DOWNLOAD'],
                showCreator: false,
                component: CommonPage,
              },
              {
                path: '/supply/rent/LeaseCheck/edit/:id?',
                componentPath: 'Supply/Rent/LeaseCheck',
                name: 'leasecheck',
                hideInMenu: true,
                component: CommonPageEdit,
              },
            ],
          },
        ],
      },
      // database
      {
        path: '/database',
        name: 'database',
        icon: 'jcsj',
        routes: [
          {
            path: '/database/supplier',
            name: 'supplier',
            formCode: 'Supplier',
            component: CommonPage,
            operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
          },
          {
            path: '/database/supplier/edit/:id?',
            name: 'supplier',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          {
            path: '/database/material',
            name: 'material',
            formCode: 'Material',
            component: CommonPage,
            operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
          },
          {
            path: '/database/material/edit/:id?',
            name: 'material',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          {
            path: '/database/materialcategory',
            name: 'materialcategory',
            component: './Database/Material/category',
          },
          {
            path: '/database/machine',
            name: 'machine',
            formCode: 'Machine',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/database/machinecategory',
            name: 'machinecategory',
            component: './Database/Machine/category',
          },
          {
            path: '/database/machine/edit/:id?',
            name: 'machine',
            hideInMenu: true,
            component: CommonPageEdit,
          },
          {
            path: '/database/depot',
            name: 'depot',
            formCode: 'Depot',
            componentPath: 'Database/Depot',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/database/depot/edit/:id?',
            name: 'depot',
            hideInMenu: true,
            component: CommonPageEdit,
          },
        ],
      },

      // task 任务
      {
        path: '/taskManagement',
        name: 'task',
        icon: 'bbgl',
        routes: [
          {
            path: '/taskManagement/task/pending',
            name: 'pending',
            componentPath: 'Task',
            formCode: 'Task',
            serviceType: 'PendingList',
            component: CommonPage,
          },
          {
            path: '/taskManagement/task/create',
            name: 'create',
            componentPath: 'Task',
            formCode: 'Task',
            serviceType: 'CreateList',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/taskManagement/task/charge',
            name: 'incharge',
            componentPath: 'Task',
            formCode: 'Task',
            serviceType: 'Charge',
            component: CommonPage,
          },
          {
            path: '/taskManagement/task/participate',
            name: 'participate',
            componentPath: 'Task',
            formCode: 'Task',
            serviceType: 'ParticipateList',
            component: CommonPage,
          },
          {
            path: '/taskManagement/task/confirm',
            name: 'confirm',
            componentPath: 'Task',
            formCode: 'Task',
            serviceType: 'ConfirmList',
            component: CommonPage,
          },
          {
            path: '/taskManagement/task/all',
            name: 'all',
            componentPath: 'Task',
            formCode: 'Task',
            serviceType: 'AllList',
            operations: ['DOWNLOAD'],
            component: CommonPage,
          },
          {
            path: '/taskManagement/task/:type/edit/:id?',
            hideInMenu: true,
            componentPath: 'Task',
            component: CommonPageEdit,
          },
          {
            path: '/taskManagement/schedule',
            name: 'schedule',
            component: './Task/Schedule',
          },
          {
            path: '/taskManagement/config',
            component: './Task/Config',
          },
          // {
          //   path: '/taskManagement/task/statistics',
          //   component: './Task/Statistics',
          // },
        ],
      },
      // worklog 工作日志
      {
        path: '/worklog',
        name: 'worklog',
        icon: 'worklog',
        routes: [
          {
            path: '/worklog/index',
            name: 'worklog',
            formCode: 'WorkLog',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/worklog/index/edit/:id?',
            hideInMenu: true,
            component: CommonPageEdit,
          },
        ],
      },
      // 完全自定义组件
      {
        path: '/usercreate',
        name: '用户自定义表单',
        routes: [
          {
            path: '/usercreate/:formCode',
            serviceType: 'USERCREATE',
            formCode: 'USERCREATE',
            name: 'usercreate',
            component: UserCreatePage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/usercreate/:formCode/edit/:id?',
            hideInMenu: true,
            component: UserCreatePageEdit,
          },
        ],
      },
      // 根据path判断是否是全自定义表单
      // 自定义表单查看详情
      // path
      {
        path: '/detailpage/:id',
        hideInMenu: true,
        component: DetailPage,
      },
      // 自定义表单查看详情
      // path
      {
        path: '/editpage/:id?',
        hideInMenu: true,
        component: EditPage,
      },
      // quality 安全管理
      {
        path: '/quality',
        name: 'quality',
        icon: 'quality',
        routes: [
          // 质量检查
          {
            path: '/quality/qualityCheck',
            name: 'quality',
            formCode: 'QualityCheck',
            componentPath: 'Check',
            params: { category: 1 },
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/quality/qualityCheck/edit/:id?',
            hideInMenu: true,
            formCode: 'QualityCheck',
            componentPath: 'Check',
            component: CommonPageEdit,
          },
          // 待我检查
          {
            path: '/quality/checkWaiting',
            name: 'qualitycheckWaiting',
            formCode: 'QualityCheck',
            componentPath: 'CheckWaiting',
            params: { category: 1, status: '0' },
            component: CommonPage,
          },
          // 质量整改
          {
            path: '/quality/rectification',
            name: 'qualityreform',
            formCode: 'Reform',
            operations: ['EDIT', 'DELETE'],
            params: { category: 1 },
            componentPath: 'Reform',
            component: CommonPage,
          },
          {
            path: '/quality/rectification/edit/:id?',
            hideInMenu: true,
            formCode: 'Reform',
            componentPath: 'Reform',
            component: CommonPageEdit,
          },
          // 奖惩
          {
            path: '/quality/incentive',
            name: 'qualityincentive',
            formCode: 'Incentive',
            operations: ['EDIT', 'DELETE'],
            params: { category: 1 },
            component: CommonPage,
          },
          {
            path: '/quality/incentive/edit/:id?',
            hideInMenu: true,
            formCode: 'Incentive',
            component: CommonPageEdit,
          },
          // 设置
          {
            path: '/quality/setting',
            params: { category: 1 },
            name: 'quality',
            component: './Check/Setting',
          },
          // 设置编辑
          {
            path: '/quality/setting/edit/:id?',
            params: { category: 1 },
            name: 'quality',
            component: './Check/Setting/edit',
          },
        ],
      },
      {
        path: '/safety',
        name: 'safety',
        icon: 'safety',
        routes: [
          // 安全检查
          {
            path: '/safety/safetyCheck',
            name: 'safety',
            formCode: 'QualityCheck',
            componentPath: 'Check',
            params: { category: 2 },
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/safety/safetyCheck/edit/:id?',
            hideInMenu: true,
            formCode: 'QualityCheck',
            componentPath: 'Check',
            component: CommonPageEdit,
          },
          // 待我检查
          {
            path: '/safety/checkWaiting',
            name: 'safetycheckWaiting',
            formCode: 'QualityCheck',
            componentPath: 'CheckWaiting',
            params: { category: 2, status: '0' },
            component: CommonPage,
          },
          // 安全整改
          {
            path: '/safety/rectification',
            name: 'safetyreform',
            formCode: 'Reform',
            params: { category: 2 },
            componentPath: 'Reform',
            operations: ['EDIT', 'DELETE'],
            component: CommonPage,
          },
          {
            path: '/safety/rectification/edit/:id?',
            hideInMenu: true,
            formCode: 'Reform',
            componentPath: 'Reform',
            component: CommonPageEdit,
          },
          // 奖惩
          {
            path: '/safety/incentive',
            name: 'safetyincentive',
            formCode: 'Incentive',
            params: { category: 2 },
            operations: ['EDIT', 'DELETE'],
            component: CommonPage,
          },
          {
            path: '/safety/incentive/edit/:id?',
            hideInMenu: true,
            formCode: 'Incentive',
            component: CommonPageEdit,
          },
          // 设置
          {
            path: '/safety/setting',
            name: 'setting',
            params: { category: 2 },
            component: './Check/Setting',
          },
          // 设置编辑
          {
            path: '/safety/setting/edit/:id?',
            params: { category: 2 },
            name: 'setting',
            component: './Check/Setting/edit',
          },
        ],
      },
      {
        path: '/approvepage',
        hideInMenu: true,
        component: './ApprovePage',
      },
      {
        path: '/labor',
        name: 'labor',
        icon: 'lw',
        routes: [
          // 劳务班组
          {
            path: '/labor/laborteam',
            name: 'laborteam',
            formCode: 'classGroup',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/labor/laborteam/edit/:id?',
            hideInMenu: true,
            formCode: 'classGroup',
            component: CommonPageEdit,
          },
        ],
      },
      {
        path: '/projectFund',
        name: 'labor',
        icon: 'lw',
        routes: [
          // 资金计划模版
          {
            path: '/projectFund/fundModel',
            name: 'fundModel',
            formCode: 'FundDetail',
            component: CommonPage,
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/projectFund/fundModel/edit/:id?',
            hideInMenu: true,
            formCode: 'FundDetail',
            component: CommonPageEdit,
          },
          // 资金计划
          {
            path: '/projectFund/fundPlan',
            name: 'fundPlan',
            formCode: 'project_fund_plan',
            component: CommonPage,
            componentPath: 'ProjectFund',
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/projectFund/fundPlan/edit/:id?',
            hideInMenu: true,
            formCode: 'project_fund_plan',
            component: CommonPageEdit,
            componentPath: 'ProjectFund',
          },
          {
            path: '/projectFund/fundReport',
            name: 'fundreport',
            formCode: 'FundReport',
            component: CommonPage,
            componentPath: 'ProjectFundReport',
            operations: ['WRITE']
          },
          {
            path: '/projectFund/fundReport/edit/:id?',
            hideInMenu: true,
            formCode: 'FundReport',
            component: CommonPageEdit,
            componentPath: 'ProjectFundReport',
          },
        ],
      },
      {
        path: '/projectProcess',
        name: 'process',
        icon: 'lw',
        routes: [
          // 进度计划
          {
            path: '/projectProcess/processPlan',
            name: 'processPlan',
            component: './ProjectPlan',
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/projectProcess/processPlan/edit/:id?',
            hideInMenu: true,
            component: './ProjectPlan/Edit',
          },
          {
            path: '/projectProcess/processPlan/detail/:id?',
            hideInMenu: true,
            component: "./ProjectPlan/Detail",
          },
          {
            path: '/projectProcess/processPlanDetails/edit/:id',
            hideInMenu: true,
            component: './ProjectPlanDetails',
          },
          // 进度填报
          {
            path: '/projectProcess/processReport',
            name: 'processReport',
            component: './ProcessReport',
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/projectProcess/processReport/edit/:id?',
            hideInMenu: true,
            component: "./ProcessReport/Edit",
          },
          {
            path: '/projectProcess/processReport/detail/:id?',
            hideInMenu: true,
            component: "./ProcessReport/Detail",
          },

        ],
      },
      {
        path: '/projectMaterial',
        name: 'projectMaterial',
        icon: 'projectMaterial',
        routes: [
          // 物料计划
          {
            path: '/projectMaterial/materialPlan',
            name: 'materialPlan',
            formCode: 'materialPlan',
            component: CommonPage,
            componentPath: 'MaterialPlan',
            operations: ['WRITE', 'EDIT', 'DELETE']
          },
          {
            path: '/projectMaterial/materialPlan/edit/:id?',
            hideInMenu: true,
            formCode: 'materialPlan',
            component: CommonPageEdit,
            componentPath: 'MaterialPlan',
          },

          // 物资填报
          {
            path: '/projectMaterial/materialReport',
            name: 'materialReport',
            formCode: 'materialReport',
            component: CommonPage,
            operations: ['WRITE'],
            componentPath: 'MaterialReport',
          },
          {
            path: '/projectMaterial/materialReport/edit/:id?',
            hideInMenu: true,
            formCode: 'materialReport',
            component: CommonPageEdit,
            componentPath: 'MaterialReport',
          },
        ],
      },
      // 智慧报表路径与reportCode一一对应
      //  ReportCode = "projectFee" | "inContract" | "outContract" | "quality" | "safety" | "purchaseApply" | "depotIn" | "depotOut" | "depotTransfer" | "receipt" | "payment";
      {
        path: '/report',
        name: '/Statistic',
        icon: '/report',
        component: "./Statistic",
      },
      {
        path: '/report/:reportCode',
        name: 'reportdetail',
        component: "./Statistic/Detail",
      },
    ],
  },
  // exception
  {
    name: 'exception',
    path: '/exception',
    hideInMenu: true,
    routes: [
      // {
      //   path: '/exception/403',
      //   name: 'not-permission',
      //   component: './Exception/403',
      // },
      {
        path: '/exception/404',
        name: 'not-find',
        component: './NotFound/index',
      },
      // {
      //   path: '/exception/500',
      //   name: 'server-error',
      //   component: './Exception/500',
      // },
      // {
      //   path: '/exception/trigger',
      //   name: 'trigger',
      //   hideInMenu: true,
      //   component: './Exception/TriggerException',
      // },
    ],
  },
  {
    component: './NotFound/index',
  },
];
