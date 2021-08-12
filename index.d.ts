declare module 'react-native-rxemitter' {
  /**
   * add
   * @in `componentDidMount`
   */
  export function addListener(
    ref: any, //not null, Suggestion string
    name: string,
    callback: (args: object | null) => void
  ): void;

  /**
   * remove
   * @in anywhere
   */
  export function removeLister(
    ref: any, //not null, Suggestion string
    name?: string,
  ): void;

  /**
   * emit send
   * @in anywhere
   */
  export function emit(
    name: string, //not null
    obj?: any  //any
  ): void;
}