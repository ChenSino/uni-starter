
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "role_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "唯一ID"
  },
  "role_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "名称"
  },
  "permission": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "label": "权限"
  },
  "comment": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "备注"
  },
  "create_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  }
}

const enumConverter = {}

export { validator, enumConverter }
