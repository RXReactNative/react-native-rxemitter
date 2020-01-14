declare module 'react-native-rxemitter' {
  export class RXEmitter {
    /**
     * @add
     * in `componentDidMount`
     */
    static addListener: (
      ref: any, //not null
      name: string, 
      callback: function
    ) => void;

    /** 
     * @remove
     * in anywhere
     */
    static removeLister: (
      ref: any, //not null
      name?: string, 
    ) => void;

    /** 
     * @emit @send
     * in anywhere
     */
    static emit: (
      name: string, //not null
      obj?: any  //any
    ) => void;

  }
}