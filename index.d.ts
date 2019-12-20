declare module 'react-native-rxemitter' {
  import React from 'react'

  export class RXEmitter {
    /**  */
    static init: () => void;

    /**  */
    static addListener: (
      ref: JSX.Element, 
      name: string, 
      callback: function
    ) => void;

    /**  */
    static removeLister: (
      ref: JSX.Element, 
      name: string, 
    ) => void;

    /**  */
    static emit: (
      name: string, 
      obj: T<any>  //map 、 Dictionary
    ) => void;

  }
}