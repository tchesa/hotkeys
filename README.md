# hotkeys

A javascript library to handle keybindings as event triggers

### Run

* `npm start`

### Build

* `npm run dist`

### Example

```javascript
  import Keybindings from './keybindings'
  const keybindings = new Keybindings()

  const action = () => {
    console.log('this is my action')
  }

  keybindings.on('ctrl+c', action) // register an action
```

#### Removing the action:

```javascript
  keybindings.off('ctrl+c', action) // removing added action
```
