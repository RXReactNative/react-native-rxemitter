# react-native-rxemitter

React-Native / Vue / Nuxt <br>
: `Broadcast notification` - `广播`

<br>

```sh
    npm install react-native-rxemitter --save-dev

    # or
    yarn add react-native-rxemitter --dev
```

## Usage

```js
//- - - -
// add listener (React -> componentDidMount)
//              (Vue/Nuxt -> created)
RXEmitter.addListener(this, 'gotoHome', ()=>{
  // ...
});

// remove listener (React -> componentWillUnmount)
//                 (Vue/Nuxt -> destroyed)
RXEmitter.remove(this, 'gotoHome');

//- - - -
// send eitter (anywhere)
RXEmitter.emit('gotoHome');
```