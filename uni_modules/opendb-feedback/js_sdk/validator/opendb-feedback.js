
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "user_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "create_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  },
  "content": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "imgs": {
    "rules": [
      {
        "format": "array"
      }
    ]
  },
  "is_reply": {
    "rules": [
      {
        "format": "bool"
      }
    ]
  },
  "feedback_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "contact": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "mobile": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "reply_count": {
    "rules": [
      {
        "format": "int"
      }
    ]
  }
}

const enumConverter = {}

export { validator, enumConverter }
