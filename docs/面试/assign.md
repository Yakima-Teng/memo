## assign

``` javascript
function assign () {
  var args = [].slice.call(arguments)
  var target = args.shift()

  // invalid target: undefined, null, none-object
  if (!target || typeof target !== 'object') {
  throw new TypeError('You have passed in some wrong arguments.')
  }

  args = (function () {
  var tempArr = []
  for (var i = 0, len = args.length; i < len; i++) {
    if (args[i] && typeof args[i] === 'object') {
    tempArr.push(args[i])
    }
  }
  return tempArr
  })()

  args.forEach(function (item, idx) {
  for (var key in item) {
    if (item.hasOwnProperty(key)) {
    target[key] = item[key]
    }
  }
  })

  return target
}
```
