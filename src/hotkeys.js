import keymap from './keymap'

function Hotkeys() {
  this.pressed = []
  this.events = {}

  document.addEventListener('keydown', e => {
    const key = e.which || e.keyCode
    if (this.pressed.indexOf(key) === -1) {
      this.pressed.push(key)
    }
    // console.log(this.pressed)
    // console.log(this.getHash(this.pressed))
    this.trigger(e)
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

Hotkeys.prototype.getHash = function (keycodes) {
  return keycodes.sort((a, b) => a < b? -1: 1).join('+')
}

Hotkeys.prototype.trigger = function (e) {
  const hash = this.getHash(this.pressed)
  if (this.events[hash]) {
    this.events[hash].forEach(event => event(e))
  }
}

Hotkeys.prototype.on = function (command, callback) {
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

Hotkeys.prototype.off = function (command, callback) {
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

Hotkeys.prototype.commandToKeycodes = function (command) {
  const keys = command.toLowerCase().split('+')
  const codes = []
  keys.forEach(key => {
    if (keymap[key]) codes.push(keymap[key])
    else return null
  })
  return codes
}

export default Hotkeys
