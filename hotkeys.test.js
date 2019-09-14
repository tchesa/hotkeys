import Hotkeys from './hotkeys';

test('should add the event', () => {
  const hotkeys = new Hotkeys()
  const command = 'ctrl+c'
  const keycodes = hotkeys.commandToKeycodes(command)
  const hash = hotkeys.getHash(keycodes)
  hotkeys.on(command, () => console.log('copy'))
  expect(hotkeys.events[hash].length).toBe(1)
})

test('should remove added event', () => {
  const hotkeys = new Hotkeys()
  const command = 'ctrl+c'
  const keycodes = hotkeys.commandToKeycodes(command)
  const hash = hotkeys.getHash(keycodes)
  const copyEvent = () => console.log('copy')
  hotkeys.on(command, copyEvent)
  expect(hotkeys.events[hash].length).toBe(1)
  hotkeys.off(command, copyEvent)
  expect(hotkeys.events[hash]).toBeUndefined()
})

test('should remove added event and keep the others', () => {
  const hotkeys = new Hotkeys()
  const command = 'escape'
  const keycodes = hotkeys.commandToKeycodes(command)
  const hash = hotkeys.getHash(keycodes)
  const firstEvent = () => console.log('first event')
  const secondEvent = () => console.log('second event')
  hotkeys.on(command, firstEvent)
  expect(hotkeys.events[hash].length).toBe(1)
  hotkeys.on(command, secondEvent)
  expect(hotkeys.events[hash].length).toBe(2)
  hotkeys.off(command, firstEvent)
  expect(hotkeys.events[hash].length).toBe(1)
  expect(hotkeys.events[hash][0]).toBe(secondEvent)
})

test('should trigger the event', () => {
  const hotkeys = new Hotkeys()
  let triggered = false
  hotkeys.on('c', () => triggered = true)
  const event = new KeyboardEvent('keydown', { 'keyCode': 67 }) // keycode for key 'C'
  document.dispatchEvent(event)
  expect(triggered).toBe(true)
})
