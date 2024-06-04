import type { any, never, some } from "any-ts"

type indexof<type> = keyof type & (type extends any.array ? number : keyof type)
type valueof<type> = never | type[indexof<type>]

type parseInt<type, distributive = never>
  = [distributive] extends [never]
  ? [type] extends [`${infer x extends number}`] ? x : never
  : type extends type ? parseInt<type, never>
  : never.close.distributive<"type">
  ;

declare namespace Universal {
  type get<type, key extends any.index> = type[keyOf<type, key>]
  type keyOf<type, key extends any.index = keyof type> = (key extends any.key ? (`${key}` | parseInt<key>) : key) & keyof type
  type key<k> = `${k & any.showable}` | Exclude<k, any.showable>
}

/** 
 * {@link map `map [overload 1/2]`} ("data-last")
 * 
 * [TypeScript playground](https://tsplay.dev/weA2Yw)
 * 
 * {@link map `map`} takes two arguments:
 * 1. a function
 * 2. a composite data structure that contains zero or more targets to apply the function to
 * 
 * A unique feature of this implementation is its polymorphism: it doesn't are whether the
 * composite data structure is an array, or whether it's an object. It will apply the argument
 * to each of the children, and will preserve the structure of the original shape.
 * 
 * **Trade-off:** the data-last overload of {@link map `map`} is optimized for function composition. 
 * It works best when used inside a call to {@link fn.pipe `fn.pipe`} or {@link fn.flow `fn.flow`}.
 * It comes with greater potential for code re-use, at the cost of slightly slower performance.
 * 
 * **Ergonomics:** if you'd prefer to provide both arguments at the same time, see overload #2.
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function map<const xs, target>
  (fn: (x: valueof<xs>, ix: indexof<xs>, xs: xs) => target): (xs: xs) => { [ix in keyof xs]: target }
/** 
 * {@link map `map [overload 2/2]`} ("data-first")
 * 
 * [TypeScript playground](https://tsplay.dev/weA2Yw)
 *
 * {@link map `map`} is a polymorphic function that accepts a function and a data structure (such 
 * as an array or object) to apply the function to.
 * 
 * A unique feature of this implementation is its ability to abstract away the type of the data 
 * structure it maps the function over; whether you pass it an object or an array, it will handle 
 * applying the function to the data strucuture's values and returning a data structure whose type 
 * corresponds 1-1 with the type of input.
 * 
 * **Trade-off:** the data-first overload of {@link map `map`} is evaluates eagerly. It comes with 
 * slightly better performance than the data-last overload, at the cost of reusability.
 * 
 * **Ergonomics:** if you'd prefer to use {@link map `map`} in a pipeline, see overload #1.
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function map<const xs, target>
  (xs: xs, fn: (x: valueof<xs>, ix: indexof<xs>, xs: xs) => target): { [ix in keyof xs]: target }
// impl.
export function map<const xs, target>(
  ...args:
    | [fn: (x: valueof<xs>, ix: indexof<xs>, xs: xs) => target]
    | [xs: xs, fn: (x: valueof<xs>, ix: indexof<xs>, xs: xs) => target]
) {
  if (args.length === 1) return (xs: xs) => map(xs, args[0])
  else {
    const [xs, fn] = args
    if (Array.isArray(xs)) return xs.map(fn as never)
    else {
      let out: any.struct = {}
      for (const k in xs)
        out[k] = fn(xs[k] as never, k as never, xs)
      return out
    }
  }
}

/**
 * TODO: docs
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
declare namespace filter {
  export type keys<t, bound> = never
    | { [k in Universal.key<keyof t> as k extends bound ? k : never]: Universal.get<t, k> }
    ;

  type eval<t> = never | { [k in keyof t]: t[k] }
  export type { object_ as object }
  type object_<t, bound> =
    | never
    | eval<
      filter.valuesSatisfy<t, bound> &
      filter.valuesPartiallySatisfy<t, bound> &
      filter.valuesMightSatisfy<t, bound>
    >

  export type cast<type, invariant, distribute = never> = [distribute] extends [never]
    ? (type extends invariant ? type : never) extends infer narrow
    ? [narrow] extends [never]
    ? invariant
    : narrow
    : never
    : type extends type
    ? filter.cast<type, invariant, never>
    : never

  export type allSatisfy<t, bound> = (
    bound extends bound
    ? (t extends t & bound ? t : never) extends infer out
    ? out
    : never
    : never
  ) extends infer out
    ? [t, out] extends [out, t]
    ? true
    : false
    : never

  export type onlySomeSatisfy<t, bound> = filter.allSatisfy<t, bound> extends true
    ? false
    : [bound extends bound ? (t extends bound ? true : never) : never] extends [never]
    ? false
    : true

  export type mightSatisfy<t, bound> = [t] extends [bound]
    ? never
    : [t extends t ? (bound extends t ? true : never) : never] extends [never]
    ? false
    : true

  export type valuesSatisfy<t, bound> = {
    -readonly [k in keyof t as filter.allSatisfy<t[k], bound> extends true ? k : never]: t[k]
  }

  export type valuesPartiallySatisfy<t, bound> = {
    -readonly [k in keyof t as filter.onlySomeSatisfy<t[k], bound> extends true ? k : never]+?: t[k]
  }

  export type valuesMightSatisfy<t, bound> = {
    -readonly [k in keyof t as filter.mightSatisfy<t[k], bound> extends true ? k : never]+?: filter.cast<
      t[k],
      bound
    >
  }
}

/**
 * @category selectors
 * 
 * TODO: docs
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function filter(nonnullableOverload: BooleanConstructor):
  <const T extends object>(object: T) => { [K in keyof T]: globalThis.NonNullable<T[K]> }

/**
 * @category selectors
 * 
 * TODO: docs
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function filter<A, B>(guard: any.typeguard<A, B>): <const T extends any.dict<A>>(object: T) => filter.object<T, B>

/**
 * @category selectors
 * 
 * TODO: docs
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function filter<A>(predicate: some.predicate<A>): <const T extends any.dict<A>>(object: T) => filter.object<T, A>

/**
 * @category selectors
 * 
 * TODO: docs
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function filter<A, B, const T extends any.dict<A>>(object: T, guard: any.typeguard<A, B>): filter.object<T, B>

/**
 * @category selectors
 * 
 * TODO: docs
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function filter<A extends valueof<T>, const T>(object: T, predicate: some.predicate<A>): filter.object<T, A>

/** impl. */
export function filter<A extends valueof<T>, B, const T extends {}>(
  ...args:
    | [predicate: some.predicate<A>]
    | [guard: any.typeguard<A, B>]
    | [object: T, predicate: some.predicate<A>]
) {
  if (args.length === 1) return (object: T) => filter(object, args[0])
  else {
    const [object, predicate] = args
    const keep = globalThis.Object.entries(object).filter(([k, v]) => predicate(v as never))
    /**
     * **Optimization:**
     * If applying the filter did not remove any keys, we want to
     * _preserve the original reference_: just return the original object
     */
    if (globalThis.Object.keys(object).length === keep.length) return object
    else return Object.fromEntries(keep)
  }
}
