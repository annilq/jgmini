const commonColumns = [
  {
    dataIndex: "detailQty",
    title: "检查明细总数",
  },
  {
    title: "检查结果",
    children: [
      {
        dataIndex: "passQty",
        title: "通过",
      },
      {
        dataIndex: "warnQty",
        title: "口头警告",
      },
      {
        dataIndex: "notPassQty",
        title: "未通过",
      },
    ]
  },
  {
    dataIndex: "reformQty",
    title: "整改单数量",
  },
  {
    title: "奖惩",
    children: [
      {
        dataIndex: "awardQty",
        title: "奖励数量",
      },
      {
        dataIndex: "punishQty",
        title: "惩罚数量",
      }
    ]
  },
]
export default commonColumns