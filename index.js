import Keybindings from './keybindings'

(function () {
  var keybindings = new Keybindings()

  const myCommand = () => {
    console.log('myCommand')
  }
  keybindings.on('ctrl+c', myCommand)
  keybindings.on('ctrl+v', () => {
    keybindings.off('ctrl+c', myCommand)
  })
})()
