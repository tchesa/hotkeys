# hotkeys [![npm version](https://img.shields.io/npm/v/@tchesa/hotkeys)](https://www.npmjs.com/package/@tchesa/hotkeys)
A javascript library to handle keybindings as event triggers

### Install:

* `yarn add @tchesa/hotkeys`
* `npm install --save @tchesa/hotkeys`

### Example:

```javascript
  import Hotkeys from '@tchesa/hotkeys'
  const hotkeys = new Hotkeys()

  const action = () => {
    console.log('this is my action')
  }

  hotkeys.on('ctrl+c', action) // register an action
```

### Removing the action:

```javascript
  hotkeys.off('ctrl+c', action) // removing added action
```
