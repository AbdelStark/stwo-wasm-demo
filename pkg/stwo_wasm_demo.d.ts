/* tslint:disable */
/* eslint-disable */
/**
* @param {number} log_size
* @param {number} claim
* @returns {FibonacciResult}
*/
export function run_fibonacci_example(log_size: number, claim: number): FibonacciResult;
/**
*/
export class FibonacciResult {
  free(): void;
/**
*/
  readonly message: string;
/**
*/
  readonly success: boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_fibonacciresult_free: (a: number) => void;
  readonly fibonacciresult_success: (a: number) => number;
  readonly fibonacciresult_message: (a: number, b: number) => void;
  readonly run_fibonacci_example: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
