function Keybindings() {
  this.pressed = []
  this.events = {}

  document.addEventListener('keydown', e => {
    const key = e.which || e.keyCode
    if (this.pressed.indexOf(key) === -1) {
      this.pressed.push(key)
    }
    // console.log(this.pressed)
    // console.log(this.getHash(this.pressed))
    this.trigger()
  })

  document.addEventListener('keyup', e => {
    const key = e.which || e.keyCode
    if (this.pressed.indexOf(key) !== -1) this.pressed.splice(this.pressed.indexOf(key), 1)
    // console.log(this.pressed)
  })

  document.addEventListener('blur', () => {
    this.pressed = []
    // console.log(this.pressed)
  })

  window.addEventListener('blur', () => {
    this.pressed = []
    // console.log(this.pressed)
  })
}

Keybindings.prototype.getHash = function (keycodes) {
  return keycodes.sort((a, b) => a < b? -1: 1).join('+')
}

Keybindings.prototype.trigger = function () {
  const hash = this.getHash(this.pressed)
  if (this.events[hash]) {
    this.events[hash].forEach(event => event())
  }
}

Keybindings.prototype.on = function (command, callback) {
  const keycodes = this.commandToKeycodes(command)
  if (!keycodes) {
    console.error('Invalid command')
    return
  }

  const hash = this.getHash(keycodes)
  if (!this.events[hash]) this.events[hash] = []
  if (this.events[hash].indexOf(callback === -1)) {
    this.events[hash].push(callback)
    // console.log('event added')
  }
}

Keybindings.prototype.off = function (command, callback) {
  const keycodes = this.commandToKeycodes(command)
  if (!keycodes) {
    console.error('Invalid command')
    return
  }

  const hash = this.getHash(keycodes)
  if (this.events[hash]) {
    const index = this.events[hash].indexOf(callback)
    if (index !== -1) {
      this.events[hash].splice(index, 1)
      // console.log('event removed')
      if (this.events[hash].length === 0) delete this.events[hash]
    }
  }
}

// https://gist.github.com/tylerbuchea/8011573
Keybindings.prototype.keyCodes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause': 19,
  'capslock': 20,
  'escape': 27,
  'pageup': 33,
  'pagedown': 34,
  'end': 35,
  'home': 36,
  'leftarrow': 37,
  'uparrow': 38,
  'rightarrow': 39,
  'downarrow': 40,
  'insert': 45,
  'delete': 46,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  'leftwin': 91,
  'rightwin': 92,
  'select': 93,
  'numpad0': 96,
  'numpad1': 97,
  'numpad2': 98,
  'numpad3': 99,
  'numpad4': 100,
  'numpad5': 101,
  'numpad6': 102,
  'numpad7': 103,
  'numpad8': 104,
  'numpad9': 105,
  'multiply': 106,
  'add': 107,
  'subtract': 109,
  'decimalpoint': 110,
  'divide': 111,
  'f1': 112,
  'f2': 113,
  'f3': 114,
  'f4': 115,
  'f5': 116,
  'f6': 117,
  'f7': 118,
  'f8': 119,
  'f9': 120,
  'f10': 121,
  'f11': 122,
  'f12': 123,
  'numlock': 144,
  'scrolllock': 145,
  'semicolon': 186,
  'equal': 187,
  'comma': 188,
  'dash': 189,
  'period': 190,
  'forwardslash': 191,
  'graveaccent': 192,
  'openbracket': 219,
  'backslash': 220,
  'closebraket': 221,
  'singlequote': 222,
}

Keybindings.prototype.commandToKeycodes = function (command) {
  const keys = command.toLowerCase().split('+')
  const codes = []
  for (let i = 0; i < keys.length; i++) {
    if (this.keyCodes[keys[i]]) codes.push(this.keyCodes[keys[i]])
    else return null
  }
  return codes
}

export default Keybindings
