/**
 * @this Monitor_Emitter
 * 
 * =========================
 * en
 * `init` can be added anywhere
 * `addListener 'can only be added here in `componentDidMount`
 * 
 * -------------------------
 * zh
 * `init` 可以添加任何地方
 * `addListener` 添加监听，只能在 `componentDidMount` 这里
 * 
 */
import React from 'react';

export default class RXEmitter {
  
  /**
   * init 
   */
  static init() { //在app Root(index.js) 里面添加的
    this.store = {};
    this.refMapOfName = {};
  }

  /**
   *  add lister
   * 
   * @param {*} ref 
   * @param {*} name 
   * @param {*} callback 
   */
  static addListener(ref=null, name='', callback=null) {
    if(!ref || !React.isValidElement(ref)) {
      console.error('MonitorEmitter `addListener` ref = null');
      return;
    }

    if(!name || typeof name !== 'string') {
      console.error('MonitorEmitter `addListener` name = null');
      return;
    }

    if(!callback || typeof callback !== 'function') {
      console.error('MonitorEmitter `addListener` callback = null');
      return;
    }
    let refMap = this.store[name] || {};
    refMap[ref] = callback;
    this.store[name] = refMap;

    let nameArray = this.refMapOfName[ref] || [];
    nameArray.push(name);
    this.refMapOfName[ref] = nameArray;
  }

  /**
   * remove lister 
   * 
   * @param {*} ref 
   * @param {*} name 
   */
  static removeLister(ref=null, name=null) {
    if(!ref || !React.isValidElement(ref)) {
      console.error('MonitorEmitter `removeLister` ref = null');
      return;
    }

    if(name) {
      this._removeLisForName(name);
    }
    else {
      // remove `name` all
      var nameArray = this.refMapOfName[ref] || [];
      for(let key in nameArray) {
        let name = nameArray(key);
        this._removeLisForName( name );
      }
    }
  }

  /**
   * send lister
   * 
   * @param {*} name 
   * @param {*} obj 
   */
  static emit(name='', obj={}) {
    if(!name || typeof name !== 'string') {
      console.error('MonitorEmitter `emit` name = null');
      return;
    }
    
    var refMap = this.store[name] || {};
    for(let key in refMap) {
      let ref = refMap[key];
      ref.callback(obj);
    }
  }




 // private function
 static _removeLisForName(name='') {
    var refMap = this.store[name] || {};
      if(refMap[ref]) {
        delete refMap[ref];
        refMap = refMap || {};
        if (JSON.stringify(refMap) === '{}') {
          delete this.store[name];
        }
        else {
          this.store[name] = refMap;
        }

        var nameArray = this.refMapOfName[ref] || [];
        nameArray.remove(name);
        nameArray = nameArray || [];
        if(nameArray.length) {
          delete this.refMapOfName[ref];
        }
        else {
          this.refMapOfName[ref] = nameArray;
        }
      }
  }
}