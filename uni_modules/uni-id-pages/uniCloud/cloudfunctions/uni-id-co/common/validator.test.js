const assert = require('assert')
const {
  Validator
} = require('./validator')
const {
  ERROR
} = require('./error')
const {
  getType
} = require('./utils')

const testCaseList = [{
  value: {
    username: 'uname'
  },
  schema: {
    username: 'username'
  },
  expected: undefined
}, {
  value: {
    username: '123456'
  },
  schema: {
    username: 'username'
  },
  expected: {
    errCode: ERROR.INVALID_USERNAME
  }
}, {
  value: {
    username: '数字天堂'
  },
  schema: {
    username: 'username'
  },
  expected: {
    errCode: ERROR.INVALID_USERNAME
  }
}, {
  value: {
    password: '123456abc'
  },
  schema: {
    password: 'password'
  }
}, {
  value: {
    password: '123456def'
  },
  schema: {
    password: 'password'
  },
  mixin: [{
    type: 'password',
    handler: function (password) {
      if (typeof password !== 'string' || password.length < 10) {
        return {
          errCode: ERROR.INVALID_PASSWORD
        }
      }
    }
  }],
  expected: {
    errCode: ERROR.INVALID_PASSWORD
  }
}, {
  value: {
    numberOrString: '123456'
  },
  schema: {
    numberOrString: 'number|string'
  }
}, {
  value: {
    numberOrString: 123456
  },
  schema: {
    numberOrString: 'number|string'
  }
}, {
  value: {
    numberOrString: '123456'
  },
  schema: {
    numberOrString: 'string|number'
  }
}, {
  value: {
    numberOrString: 123456
  },
  schema: {
    numberOrString: 'string|number'
  }
}, {
  value: {
    numberOrString: ['123456']
  },
  schema: {
    numberOrString: 'array<number|string>'
  }
}, {
  value: {
    numberOrString: [123456]
  },
  schema: {
    numberOrString: 'array<number|string>'
  }
}, {
  value: {
    numberOrString: [123456, '123456']
  },
  schema: {
    numberOrString: 'array<number|string>'
  }
}, {
  value: {
    numberOrString: ['123456']
  },
  schema: {
    numberOrString: 'array<string|number>'
  }
}, {
  value: {
    numberOrString: [123456]
  },
  schema: {
    numberOrString: 'array<string|number>'
  }
}, {
  value: {
    numberOrString: [123456, '123456']
  },
  schema: {
    numberOrString: 'array<string|number>'
  }
}, {
  value: {
    numberOrString: ['123456']
  },
  mixin: [{
    type: '1to6',
    handler: function (val) {
      if (val !== '123456') {
        return {
          errCode: ERROR.INVALID_PARAM
        }
      }
    }
  }],
  schema: {
    numberOrString: 'array<number|1to6>'
  }
}]

function execTestCase ({
  value = {},
  schema = {},
  mixin = [],
  expected = undefined,
  error = ''
} = {}) {
  const validator = new Validator()
  for (let i = 0; i < mixin.length; i++) {
    const {
      type,
      handler
    } = mixin[i]
    validator.mixin(type, handler)
  }
  let validateResult,
    validateError
  try {
    validateResult = validator.validate(value, schema)
  } catch (err) {
    validateError = err
  }
  const tag = JSON.stringify({ value, schema })
  if (error) {
    if (typeof error === 'string') {
      assert.strictEqual(validateError.message.indexOf(error) > -1, true, `[${tag}] error message error`)
    } else if (getType(error) === 'regexp') {
      assert.strictEqual(error.test(validateError), true, `[${tag}] error message error`)
    } else {
      throw new Error(`[${tag}] invalid test case`)
    }
    return
  }
  if (expected === undefined) {
    assert.strictEqual(validateResult, undefined, `[${tag}] validate result error`)
    return
  }
  const expectedKeys = Object.keys(expected)
  let passResultCheck = true
  for (let i = 0; i < expectedKeys.length; i++) {
    const key = expectedKeys[i]
    if (expected[key] !== validateResult[key]) {
      passResultCheck = false
      break
    }
  }
  assert.strictEqual(passResultCheck, true, `[${tag}] validate result error`)
}

for (let i = 0; i < testCaseList.length; i++) {
  console.log(`test case: ${i}`)
  execTestCase(testCaseList[i])
  console.log(`test case: ${i}, pass`)
}
