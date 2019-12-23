# react-native-rxemitter

`广播`

`$ npm install react-native-rxemitter --save`

```js
//init 
RXEmitter.init();

//- - - - 
// add listener (componentDidMount)
RXEmitter..addListener(this, 'gotoHome', ()=>{
  // ...
});
// remove listener (componentWillUnmount)
RXEmitter.remove(this, 'gotoHome');

//- - - - 
//send eitter
RXEmitter.emit('gotoHome');
```