/**
 * @this Emitter
 * 
 * =========================
 * en
 * `addListener 'can only be added here in `componentDidMount`
 * 
 * -------------------------
 * zh
 * `addListener` 添加监听，只能在 `componentDidMount` 这里
 * 
 */

export default class RXEmitter {
  /**
   * init <-> setter / getter
   */
  static get store() {
    if(!this._store) {
      this._store = {};
    }
    return this._store;
  }

  static set store(val=null) {
    if(!this._store) {
      this._store = {};
    }
    this._store = val;
  }

  static get refMapOfName() {
    if(!this._refMapOfName) {
      this._refMapOfName = {};
    }
    return this._refMapOfName;
  }

  static set refMapOfName(val=null) {
    if(!this._refMapOfName) {
      this._refMapOfName = {};
    }
    this._refMapOfName = val;
  }

  /**
   *  add lister
   * 
   * @param {*} ref 
   * @param {*} name 
   * @param {*} callback 
   */
  static addListener(ref=null, name='', callback=null) {
    if(!ref) {
      this._log('react-native-rxemitter `addListener` ref = null');
      return;
    }

    if(!name || typeof name !== 'string') {
      this._log('react-native-rxemitter `addListener` name = null');
      return;
    }

    if(!callback || typeof callback !== 'function') {
      this._log('react-native-rxemitter `addListener` callback = null');
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
    if(!ref) {
      this._log('react-native-rxemitter `removeLister` ref = null');
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
      this._log('react-native-rxemitter `emit` name = null');
      return;
    }
    
    var refMap = this.store[name] || {};
    for(let key in refMap) {
      let callback = refMap[key];
      callback(obj);
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

  static _log(msg='') {
    if(__DEV__) {
      console.error(msg);
    }
    else {
      console.warn('msg')
    }
  }
}
