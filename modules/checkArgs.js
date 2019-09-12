module.exports = (passedArgs, argArray) =>
  passedArgs.map(arg => {
    if (!argArray.includes(arg)) {
      throw new Error(`Invalid Argument: "${arg}"`)
    } else {
      return arg
    }
  })
