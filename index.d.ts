declare module 'react-native-rxemitter' {
  export class RXEmitter {
    /**  */
    static addListener: (
      ref: JSX.Element, 
      name: string, 
      callback: function
    ) => void;

    /**  */
    static removeLister: (
      ref: JSX.Element, 
      name?: string, 
    ) => void;

    /**  */
    static emit: (
      name: string, 
      obj?: T<any>  //map 、 Dictionary 、null
    ) => void;

  }
}