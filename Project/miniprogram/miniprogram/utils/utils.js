
export const convertToCastString = args => {
  // return  args[0].data.map(item => item.name).join(',')
  let result = ''
  if (args.length == 1) {
    result = args[0].data.map(item => item.name).join(',')
    console.log('rseult=1', result)
  } else {
    // result = args.map(itemArr => (itemArr.data.filter(item => item.lang=="Cn"&&item.name))).map(item => item[0].name).join('/')
    result = args.map(itemArr => (itemArr.data.filter(item => item.lang=="Cn"&&item.name))).slice(0,4).map(item => item[0].name).join('/')
    console.log('result>1', result)
  }
  return result
}

export const convertToCastInfos = args => {
  return args.map(itemArr => (itemArr.data.filter(item => item.lang=="Cn"&&item.name))).map(item => item.name)
}