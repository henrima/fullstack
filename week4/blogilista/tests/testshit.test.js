const dummy = require('../utils/list_helper').dummy

describe('dummy', () => {

    test('houston we are live', () => {
      const result = dummy({
        "title": "pertsan postaus",
        "author": "pertsa",
        "url": "http://pertsa.com",
        "likes": "42"
      })
      expect(result).toBe(1)
    })

})