import Hotkeys from './hotkeys'

(function () {
  var hotkeys = new Hotkeys()

  const myCommand = () => {
    console.log('myCommand')
  }
  hotkeys.on('ctrl+c', myCommand)
  hotkeys.on('ctrl+v', () => {
    hotkeys.off('ctrl+c', myCommand)
  })
})()
