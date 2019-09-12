module.exports = obj => obj.reduce((x, y) => ({ ...x, ...y }), {})
