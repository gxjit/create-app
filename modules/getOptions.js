module.exports = (argsArray, argsObjs) =>
  Object.keys(argsObjs).map(key => argsArray.includes(key) && argsObjs[key])
