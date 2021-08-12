/**
 * @this Emitter
 *
 * =========================
 * React-Native
 * en
 * `addListener 'can only be added here in `componentDidMount`
 *
 * -------------------------
 * zh
 * `addListener` 添加监听，只能在 `componentDidMount` 这里
 *
 * =========================
 * Vue / Nuxt
 *
 */

export default class RXEmitter {
  /**
   * init <-> setter / getter
   */
  static get store() {
    if (!this._store) {
      this._store = {};
    }
    return this._store;
  }

  static set store(val = null) {
    if (!this._store) {
      this._store = {};
    }
    this._store = val;
  }

  static get refMapOfName() {
    if (!this._refMapOfName) {
      this._refMapOfName = {};
    }
    return this._refMapOfName;
  }

  static set refMapOfName(val = null) {
    if (!this._refMapOfName) {
      this._refMapOfName = {};
    }
    this._refMapOfName = val;
  }

  /**
   *  add lister
   * @param {*} ref
   * @param {*} name
   * @param {*} callback
   */
  static addListener(ref = null, name = '', callback = null) {
    if (!ref) {
      this._log('react-native-rxemitter `addListener` ref = null');
      return;
    }

    if (!name || typeof name !== 'string') {
      this._log('react-native-rxemitter `addListener` name = null');
      return;
    }

    if (!callback || typeof callback !== 'function') {
      this._log('react-native-rxemitter `addListener` callback = null');
      return;
    }
    const refMap = this.store[name] || {};
    refMap[ref] = callback;
    this.store[name] = refMap;

    const nameArray = this.refMapOfName[ref] || [];
    nameArray.push(name);
    this.refMapOfName[ref] = nameArray;
  }

  /**
   * remove lister
   * @param {*} ref
   * @param {*} name
   */
  static removeLister(ref = null, name = null) {
    if (!ref) {
      this._log('react-native-rxemitter `removeLister` ref = null');
      return;
    }

    if (name) {
      this._removeLisForName(ref, name);
    } else {
      // remove `name` all
      const nameArray = this.refMapOfName[ref] || [];
      for (const key in nameArray) {
        const name = nameArray[key];
        this._removeLisForName(ref, name);
      }
    }
  }

  /**
   * send lister
   * @param {*} name
   * @param {*} obj
   */
  static emit(name = '', obj = null) {
    if (!name || typeof name !== 'string') {
      this._log('react-native-rxemitter `emit` name = null');
      return;
    }

    const refMap = this.store[name] || {};
    for (const key in refMap) {
      const callback = refMap[key];
      if (obj) {
        callback(obj);
      } else {
        callback();
      }
    }
  }

  // private function
  static _removeLisForName(ref = '', name = '') {
    let refMap = this.store[name] || {};
    if (refMap[ref]) {
      delete refMap[ref];
      refMap = refMap || {};
      if (JSON.stringify(refMap) === '{}') {
        delete this.store[name];
      } else {
        this.store[name] = refMap;
      }

      let nameArray = this.refMapOfName[ref] || [];
      if (nameArray && Array.isArray(nameArray) && nameArray.length) {
        nameArray.remove && nameArray.remove(name);
      }
      nameArray = nameArray || [];
      if (nameArray.length) {
        delete this.refMapOfName[ref];
      } else {
        this.refMapOfName[ref] = nameArray;
      }
    }
  }

  static _log(msg = '') {
    if (this._env_development()) {
      console.error('RXEmitter', msg);
    }
  }

  /* eslint-disable */
  static _env_development() {
    try {
      const env = process.env || { NODE_ENV: 'production' };
      const envDevelopment = env.NODE_ENV || 'production';
      if (envDevelopment === 'development') {
        // Vue / Nuxt -> development
        return true;
      } else if (__DEV__) {
        // React-Native -> development
        return true;
      }
    } catch (error) {
      // console.log('react-native-rxemitter `_env_development` error=', error)
    }
    return false;
  }
  /* eslint-disable */
}
