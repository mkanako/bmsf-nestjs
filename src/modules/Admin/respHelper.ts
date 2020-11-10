export function succ (data = '', msg = 'success', code = 0) {
  return {
    data,
    msg,
    code,
  }
}

export function err (msg = 'error', code = 1) {
  return {
    msg,
    code,
  }
}
