import keycode from 'keycode'

export const isValidCommand = (command: string): boolean => {
  if (!command) return false

  const keys = command.split('+')

  for (let i = 0; i < keys.length; i++) {
    if (!keycode(keys[i])) return false
  }

  return true
}

export const getCommandHash = (command: string): string | undefined => {
  if (!isValidCommand(command)) return undefined

  const keys = command.split('+')
  return keys.map(key => keycode(key)).join('+')
}

export const isValidHash = (hash: string): boolean => {
  if (!hash) return false

  const keys = hash.split('+')

  for (let i = 0; i < keys.length; i++) {
    const code = parseInt(keys[i])

    if (code === NaN) return false

    if (!keycode(code)) return false
  }

  return true
}

export const reverseHash = (hash: string): string | undefined => {
  if (!isValidHash(hash)) return undefined

  const keys = hash.split('+')
  return keys.map(key => keycode(parseInt(key))).join('+')
}
