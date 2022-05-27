import { getCommandHash } from './command-hash';
import Hotkeys from './index';

test('should add the event', () => {
  const hotkeys = new Hotkeys()
  const command = 'ctrl+c'
  const hash = getCommandHash(command)
  hotkeys.on(command, jest.fn())
  expect(hotkeys.events[hash!].length).toBe(1)
})

test('should remove added event', () => {
  const hotkeys = new Hotkeys()
  const command = 'ctrl+c'
  const hash = getCommandHash(command)
  const copyEvent = jest.fn()
  hotkeys.on(command, copyEvent)
  expect(hotkeys.events[hash!].length).toBe(1)
  hotkeys.off(command, copyEvent)
  expect(hotkeys.events[hash!]).toBeUndefined()
})

test('should remove added event and keep the others', () => {
  const hotkeys = new Hotkeys()
  const command = 'escape'
  const hash = getCommandHash(command)
  const firstEvent = jest.fn()
  const secondEvent = jest.fn()
  hotkeys.on(command, firstEvent)
  expect(hotkeys.events[hash!].length).toBe(1)
  hotkeys.on(command, secondEvent)
  expect(hotkeys.events[hash!].length).toBe(2)
  hotkeys.off(command, firstEvent)
  expect(hotkeys.events[hash!].length).toBe(1)
  expect(hotkeys.events[hash!][0]).toBe(secondEvent)
})

test('should trigger the event', () => {
  const hotkeys = new Hotkeys()
  let triggered = false
  hotkeys.on('c', () => triggered = true)
  const event = new KeyboardEvent('keydown', { 'key': 'c' })
  document.dispatchEvent(event)
  expect(triggered).toBe(true)
})
