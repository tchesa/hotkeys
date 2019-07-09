(function () {
  function Keybindings() {
    this.pressed = []
    this.events = {}

    document.addEventListener('keydown', e => {
      const key = e.which || e.keyCode
      if (this.pressed.indexOf(key) === -1) {
        this.pressed.push(key)
      }
      console.log(this.pressed)
      console.log(this.getHash(this.pressed))
      this.eventLoop()
    })

    document.addEventListener('keyup', e => {
      const key = e.which || e.keyCode
      if (this.pressed.indexOf(key) !== -1) this.pressed.splice(this.pressed.indexOf(key), 1)
      // console.log(this.pressed)
    })

    document.addEventListener('blur', () => {
      this.pressed = []
      console.log(this.pressed)
    })
    window.addEventListener('blur', () => {
      this.pressed = []
      console.log(this.pressed)
    })
  }

  Keybindings.prototype.getHash = function (keycodes) {
    return keycodes.sort((a, b) => a < b? -1: 1).join('+')
  }

  Keybindings.prototype.eventLoop = function () {
    const hash = this.getHash(this.pressed)
    if (this.events[hash]) {
      this.events[hash].forEach(event => event())
    }
  }

  Keybindings.prototype.on = function (keycodes, callback) {
    const hash = this.getHash(keycodes)
    if (!this.events[hash]) this.events[hash] = []
    if (this.events[hash].indexOf(callback === -1)) {
      this.events[hash].push(callback)
      console.log('event added')
    }
  }

  Keybindings.prototype.off = function (keycodes, callback) {
    const hash = this.getHash(keycodes)
    if (this.events[hash]) {
      const index = this.events[hash].indexOf(callback)
      if (index !== -1) {
        this.events[hash].splice(index, 1)
        console.log('event removed')
        if (this.events[hash].length === 0) delete this.events[hash]
      }
    }
  }

  var keybindings = new Keybindings()

  const myCommand = () => {
    console.log('myCommand')
  }
  keybindings.on([16, 17, 65], myCommand)
  keybindings.on([16, 17, 83], () => {
    keybindings.off([16, 17, 65], myCommand)
  })
})()
