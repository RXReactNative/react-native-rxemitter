# react-native-rxemitter

React-Native : `Broadcast notification` - `广播`

`$ npm install react-native-rxemitter --save`

## Usage

```js
//- - - - 
// add listener (componentDidMount)
RXEmitter..addListener(this, 'gotoHome', ()=>{
  // ...
});
// remove listener (componentWillUnmount)
RXEmitter.remove(this, 'gotoHome');

//- - - - 
// send eitter (anywhere)
RXEmitter.emit('gotoHome');
```