function wrap <T extends Function> (value: T, wrapper: (value: T, ...args: any[]) => any) {
  return function (...args: any[]) {
    return wrapper(value, ...args)
  }
}

export default wrap
export { wrap }
