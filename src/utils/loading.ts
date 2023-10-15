import ora from 'ora'
export const wrapLoading = async (message, fn) => {
  const spinner = ora(message)
  spinner.start()
  const res = await fn() // aop 将用户的逻辑包裹loading效果
  spinner.succeed()
  return res
}
