import Keybindings from './keybindings';

test('should add the event', () => {
  const keybindings = new Keybindings()
  const command = 'ctrl+c'
  const keycodes = keybindings.commandToKeycodes(command)
  const hash = keybindings.getHash(keycodes)
  keybindings.on(command, () => console.log('copy'))
  expect(keybindings.events[hash].length).toBe(1)
})

test('should remove added event', () => {
  const keybindings = new Keybindings()
  const command = 'ctrl+c'
  const keycodes = keybindings.commandToKeycodes(command)
  const hash = keybindings.getHash(keycodes)
  const copyEvent = () => console.log('copy')
  keybindings.on(command, copyEvent)
  expect(keybindings.events[hash].length).toBe(1)
  keybindings.off(command, copyEvent)
  expect(keybindings.events[hash]).toBeUndefined()
})

test('should remove added event and keep the others', () => {
  const keybindings = new Keybindings()
  const command = 'escape'
  const keycodes = keybindings.commandToKeycodes(command)
  const hash = keybindings.getHash(keycodes)
  const firstEvent = () => console.log('first event')
  const secondEvent = () => console.log('second event')
  keybindings.on(command, firstEvent)
  expect(keybindings.events[hash].length).toBe(1)
  keybindings.on(command, secondEvent)
  expect(keybindings.events[hash].length).toBe(2)
  keybindings.off(command, firstEvent)
  expect(keybindings.events[hash].length).toBe(1)
  expect(keybindings.events[hash][0]).toBe(secondEvent)
})

test('should trigger the event', () => {
  const keybindings = new Keybindings()
  let triggered = false
  keybindings.on('c', () => triggered = true)
  const event = new KeyboardEvent('keydown', { 'keyCode': 67 }) // keycode for key 'C'
  document.dispatchEvent(event)
  expect(triggered).toBe(true)
})
