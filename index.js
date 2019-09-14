import Hotkeys from './src/hotkeys'

var hotkeys = new Hotkeys()

const myCommand = () => {
  console.log('myCommand')
}

const cancelRefreshPage = event => {
  console.log('refresh page cancelled')
  event.preventDefault()
}

hotkeys.on('ctrl+c', myCommand)
hotkeys.on('ctrl+v', () => {
  hotkeys.off('ctrl+c', myCommand)
})
hotkeys.on('f5', cancelRefreshPage)
