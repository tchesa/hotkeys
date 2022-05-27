import { getCommandHash, isValidCommand, isValidHash, reverseHash } from './command-hash'

describe('should validate command as expected', () => {
  test.each([
    ['alt+s', true],
    ['foo+s', false]
  ])('for %p it should return %p', (command, ans) => {
    const result = isValidCommand(command)
    expect(result).toEqual(ans)
  })
})

describe('should return expected hash', () => {
  test.each([
    ['ctrl+c', '17+67'],
    ['ctrl+v', '17+86']
  ])('for %p it should return %p', (command, ans) => {
    const result = getCommandHash(command)
    expect(result).toEqual(ans)
  })
})

describe('should validate hash as expected', () => {
  test.each([
    ['', false],
    ['17+67', true],
    ['17+86', true],
    ['invalid', false],
    ['invalid+2', false],
    ['3+invalid', false],
    ['invalid+invalid', false],
  ])('for %p it should return %p', (command, ans) => {
    const result = isValidHash(command)
    expect(result).toEqual(ans)
  })
})

describe('should return expected command', () => {
  test.each([
    ['17+67', 'ctrl+c'],
    ['17+86', 'ctrl+v']
  ])('for %p it should return %p', (command, ans) => {
    const result = reverseHash(command)
    expect(result).toEqual(ans)
  })
})
