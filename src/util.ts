import type { any, check, never, nonempty, some } from "any-ts";
import { filter, map } from "./polymorphic.js"

export { map } from "./polymorphic.js"

declare namespace part {
  type readonly<type>
    = { [k in keyof type as keep<k,
      { [_ in k]: type[k] },
      { readonly [_ in k]: type[k] }
    >]: type[k] }

  type writeable<type>
    = { [k in keyof type as discard<k,
      { [_ in k]: type[k] },
      { readonly [_ in k]: type[k] }
    >]: type[k] }

  type keep<onEqual, t, u> =
    (<fix>() => fix extends t ? 0 : 1) extends
    (<fix>() => fix extends u ? 0 : 1) ? onEqual : never

  type discard<onNotEqual, t, u> =
    (<fix>() => fix extends t ? 0 : 1) extends
    (<fix>() => fix extends u ? 0 : 1) ? never : onNotEqual
}

const arrayLet
  : <const xs extends any.array>(...xs: xs) => { -readonly [ix in keyof xs]: xs[ix] }
  = (...xs) => xs as never

const arrayConst
  : <const xs extends any.array>(...xs: xs) => xs
  = (...xs) => xs

const arrayIncludes
  : <const xs extends any.array>(xs: xs) => any.typeguard<unknown, xs[number]>
  = (xs) => (u): u is never => xs.includes(u)


declare namespace indexOf {
  type nonfinite<ix extends any.index, xs extends any.array<any.indexableBy<ix>>> = never | { [x in (xs[number]) as x[ix]]?: x }
  type finite<ix extends any.index, xs extends any.array<any.indexableBy<ix>>> = never | { [x in (xs[number]) as x[ix]]: x }
}

function indexOf<ix extends any.index>(ix: ix): {
  <const xs extends check.isTuple<xs, any.array<any.indexableBy<ix>>>>(xs: xs): indexOf.finite<ix, xs>
  <const xs extends check.isNonFiniteArray<xs, any.array<any.indexableBy<ix>>>>(xs: xs): indexOf.nonfinite<ix, xs>
}
// impl.
function indexOf<ix extends any.index>(ix: ix) {
  return <const xs extends any.array<any.indexableBy<ix>>>(xs: xs) => xs.reduce((acc, x) => ({ ...acc, [x[ix]]: x }), {})
}

export declare namespace array {
  export {
    arrayConst as const,
    arrayIncludes as includes,
    arrayLet as let,
    indexOf,
    map,
  }
}
export function array() { }
export namespace array {
  array.const = arrayConst
  array.let = arrayLet
  array.includes = arrayIncludes
  array.indexOf = indexOf
  array.map = map
}

const objectLet
  : <const type>(term: type) => { -readonly [ix in keyof type]: type[ix] }
  = fn.identity

const objectConst
  : <const type>(term: type) => type
  = fn.identity

function objectFromKeys<const keys extends any.keys>(...keys: keys): { [k in keys[number]]: k }
function objectFromKeys<const keys extends any.keys>(keys: keys): { [k in keys[number]]: k }
function objectFromKeys<const keys extends any.keys>(...keys: [keys] | (keys)) {
  return keys.flat(1).reduce(
    (acc, key) => ({ ...acc, [key]: key }),
    {}
  )
}

type invertObject<type extends any.invertible> = never | { [k in keyof type as type[k]]: k }
function invertObject<const type extends any.invertible>(term: type): { [k in keyof type as type[k]]: k }
function invertObject<const type extends any.invertible>(term: type) {
  return globalThis.Object
    .entries(term)
    .reduce((acc, [k, v]) => (acc[v] = k, acc), {} as any.struct)
}

type nonemptyKeys<T> = nonempty.array<keyof T>

type nonemptyObject<type>
  = [keyof type] extends [infer key]
  ? [key] extends [never] ? never
  : ((object))
  : never.close.inline_var<"key">

export namespace is {
  export const nonempty
    : some.predicate<object>
    = (object) => objectKeys(object).length > 0
}

const objectKeys
  : <const type>(term: type) => any.keysOf<type>
  = globalThis.Object.keys

const objectValues
  : <const type>(term: type) => any.array<type[keyof type]>
  = globalThis.Object.values

type objectEntries<type>
  = [keyof type] extends [any.keyof<type, infer key>]
  ? string extends key ? any.array<readonly [key: key, value: type[key]]>
  : number extends key ? any.array<readonly [key: key, value: type[key]]>
  : key extends key
  ? any.array<readonly [key: key, value: type[key]]>
  : never.close.distributive<"key">
  : never.close.inline_var<"key">
  ;

const objectUpsert
  : <key extends any.index>(key: key) => <const value>(value: value) => <const other extends object>(other: other) => key extends key ? { [k in key | keyof other]: k extends key ? value : other[k & keyof other] } : never
  = (key) => (value) => (other) => ({ ...other, [key]: value } as never)

const objectBind
  : <key extends any.index>(key: key) => <const value>(value: value) => key extends key ? { [k in key]: value } : never
  = (key) => (value) => ({ [key]: value } as never)

const objectEntries
  : <const type>(term: type) => objectEntries<type>
  = globalThis.Object.entries as never

export declare namespace object {
  export {
    nonempty,
    objectBind as bind,
    objectUpsert as upsert,
    objectConst as const,
    objectEntries as entries,
    objectFromKeys as fromKeys,
    invertObject as invert,
    objectKeys as keys,
    objectLet as let,
    objectValues as values,
    filter,
    map,
  }

  export namespace keyset {
    export { nonemptyKeys as nonempty }
    // export type readonly<type> = part.readonly<type>
    // export type writable<type> = keyof part.readonly<type>
    export type required<T> = globalThis.Exclude<keyof T, keyset.optional<T>>
    export type optional<type> = keyof type extends infer key
      ? key extends keyof type
      ? {} extends globalThis.Pick<type, key>
      ? key
      : never.as.empty
      : never.close.distributive<"key">
      : never.close.inline_var<"key">
  }
}

export function object() { }
export namespace object {
  object.bind = objectBind
  object.upsert = objectUpsert
  object.const = objectConst
  object.entries = objectEntries
  object.fromKeys = objectFromKeys
  object.invert = invertObject
  object.keys = objectKeys
  object.let = objectLet
  object.values = objectValues
  object.filter = filter
  object.map = map

  export namespace keyset {
    export const nonempty
      : <const type extends nonemptyObject<type>>(term: type) => keyset.nonempty<type>
      = (term, keys = objectKeys(term)) => [keys[0]!, ...keys.slice(1)]
  }
}

const fnThrow
  : <const xs extends any.array>(...xs: xs) => never
  = (...xs) => { throw xs }

const fnIdentity
  : <const type>(term: type) => type
  = (term) => term

const fnApply
  : <const a>(x: a) => <b>(f: (a: a) => b) => b
  = (x) => (f) => f(x)

const fnLoop
  : <a, b>(f: (a: a, k: (a: a) => b) => b) => (a: a) => b
  = (f) => (a) => {
    const next = (a_: typeof a) => f(a_, next)
    return f(a, next)
  }

type fn = any.function
type _ = unknown

/**
 * Adapted from:
 * {@link https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L416-L689 `fp-ts`}
 */
function pipe<const a>(a: a): a
function pipe<const a, b>(a: a, ab: (a: a) => b): b
function pipe<const a, b, c>(a: a, ab: (a: a) => b, bc: (b: b) => c): c
function pipe<const a, b, c, d>(a: a, ab: (a: a) => b, bc: (b: b) => c, cd: (c: c) => d): d
function pipe<const a, b, c, d, e>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
): e
function pipe<const a, b, c, d, e, f>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
): f
function pipe<const a, b, c, d, e, f, g>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
): g
function pipe<const a, b, c, d, e, f, g, h>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
): h
function pipe<const a, b, c, d, e, f, g, h, i>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
): i
function pipe<const a, b, c, d, e, f, g, h, i, j>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
): j
function pipe<const a, b, c, d, e, f, g, h, i, j, k>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
): k
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
): l
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
): m
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m, n>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
  mn: (m: m) => n,
): n
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m, n, o>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
  mn: (m: m) => n,
  no: (n: n) => o,
): o
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
  mn: (m: m) => n,
  no: (n: n) => o,
  op: (o: o) => p,
): p
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
  mn: (m: m) => n,
  no: (n: n) => o,
  op: (o: o) => p,
  pq: (p: p) => q,
): q
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
  mn: (m: m) => n,
  no: (n: n) => o,
  op: (o: o) => p,
  pq: (p: p) => q,
  qr: (q: q) => r,
): r
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
  mn: (m: m) => n,
  no: (n: n) => o,
  op: (o: o) => p,
  pq: (p: p) => q,
  qr: (q: q) => r,
  rs: (r: r) => s,
): s
function pipe<const a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t>(
  a: a,
  ab: (a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
  jk: (j: j) => k,
  kl: (k: k) => l,
  lm: (l: l) => m,
  mn: (m: m) => n,
  no: (n: n) => o,
  op: (o: o) => p,
  pq: (p: p) => q,
  qr: (q: q) => r,
  rs: (r: r) => s,
  st: (s: s) => t,
): t
function pipe(
  ...a:
    | [a: _]
    | [a: _, ab: fn]
    | [a: _, ab: fn, bc: fn]
    | [a: _, ab: fn, bc: fn, cd: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn, fg: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn, fg: fn, gh: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn, fg: fn, gh: fn, hi: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn, fg: fn, gh: fn, hi: fn, ij: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn, fg: fn, gh: fn, hi: fn, ij: fn, jk: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn, fg: fn, gh: fn, hi: fn, ij: fn, jk: fn, kl: fn]
    | [a: _, ab: fn, bc: fn, cd: fn, de: fn, ef: fn, fg: fn, gh: fn, hi: fn, ij: fn, jk: fn, kl: fn, lm: fn]
    | [
      a: _,
      ab: fn,
      bc: fn,
      cd: fn,
      de: fn,
      ef: fn,
      fg: fn,
      gh: fn,
      hi: fn,
      ij: fn,
      jk: fn,
      kl: fn,
      lm: fn,
      mn: fn,
    ]
    | [
      a: _,
      ab: fn,
      bc: fn,
      cd: fn,
      de: fn,
      ef: fn,
      fg: fn,
      gh: fn,
      hi: fn,
      ij: fn,
      jk: fn,
      kl: fn,
      lm: fn,
      mn: fn,
      no: fn,
    ]
    | [
      a: _,
      ab: fn,
      bc: fn,
      cd: fn,
      de: fn,
      ef: fn,
      fg: fn,
      gh: fn,
      hi: fn,
      ij: fn,
      jk: fn,
      kl: fn,
      lm: fn,
      mn: fn,
      no: fn,
      op: fn,
    ]
    | [
      a: _,
      ab: fn,
      bc: fn,
      cd: fn,
      de: fn,
      ef: fn,
      fg: fn,
      gh: fn,
      hi: fn,
      ij: fn,
      jk: fn,
      kl: fn,
      lm: fn,
      mn: fn,
      no: fn,
      op: fn,
      pq: fn,
    ]
    | [
      a: _,
      ab: fn,
      bc: fn,
      cd: fn,
      de: fn,
      ef: fn,
      fg: fn,
      gh: fn,
      hi: fn,
      ij: fn,
      jk: fn,
      kl: fn,
      lm: fn,
      mn: fn,
      no: fn,
      op: fn,
      pq: fn,
      qr: fn,
    ]
    | [
      a: _,
      ab: fn,
      bc: fn,
      cd: fn,
      de: fn,
      ef: fn,
      fg: fn,
      gh: fn,
      hi: fn,
      ij: fn,
      jk: fn,
      kl: fn,
      lm: fn,
      mn: fn,
      no: fn,
      op: fn,
      pq: fn,
      qr: fn,
      rs: fn,
    ]
    | [
      a: _,
      ab: fn,
      bc: fn,
      cd: fn,
      de: fn,
      ef: fn,
      fg: fn,
      gh: fn,
      hi: fn,
      ij: fn,
      jk: fn,
      kl: fn,
      lm: fn,
      mn: fn,
      no: fn,
      op: fn,
      pq: fn,
      qr: fn,
      rs: fn,
      st: fn,
    ]
): unknown {
  switch (true) {
    case a.length === 1:
      return a[0]
    case a.length === 2:
      return a[1](a[0])
    case a.length === 3:
      return a[2](a[1](a[0]))
    case a.length === 4:
      return a[3](a[2](a[1](a[0])))
    case a.length === 5:
      return a[4](a[3](a[2](a[1](a[0]))))
    case a.length === 6:
      return a[5](a[4](a[3](a[2](a[1](a[0])))))
    case a.length === 7:
      return a[6](a[5](a[4](a[3](a[2](a[1](a[0]))))))
    case a.length === 8:
      return a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))
    case a.length === 9:
      return a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0]))))))))
    case a.length === 10:
      return a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))))
    case a.length === 11:
      return a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0]))))))))))
    case a.length === 12:
      return a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))))))
    case a.length === 13:
      return a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0]))))))))))))
    case a.length === 14:
      return a[13](a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))))))))
    case a.length === 15:
      return a[14](a[13](a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0]))))))))))))))
    case a.length === 16:
      return a[15](
        a[14](a[13](a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))))))))),
      )
    case a.length === 17:
      return a[16](
        a[15](a[14](a[13](a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0]))))))))))))))),
      )
    case a.length === 18:
      return a[17](
        a[16](
          a[15](
            a[14](a[13](a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))))))))),
          ),
        ),
      )
    case a.length === 19:
      return a[18](
        a[17](
          a[16](
            a[15](
              a[14](a[13](a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))))))))),
            ),
          ),
        ),
      )
    case a.length === 20:
      return a[19](
        a[18](
          a[17](
            a[16](
              a[15](
                a[14](a[13](a[12](a[11](a[10](a[9](a[8](a[7](a[6](a[5](a[4](a[3](a[2](a[1](a[0])))))))))))))),
              ),
            ),
          ),
        ),
      )
    default: {
      const args: any.array<any.function> = a
      let ret: unknown = args[0]
      for (let ix = 1; ix < args.length; ix++) ret = args[ix]!(ret)
      return ret
    }
  }
}
/**
 * Adapted from:
 * {@link https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L236-L342 `fp-ts`}
 */
function flow<a extends any.array, b>(ab: (...a: a) => b): (...a: a) => b
function flow<a extends any.array, b, c>(ab: (...a: a) => b, bc: (b: b) => c): (...a: a) => c
function flow<a extends any.array, b, c, d>(
  ab: (...a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
): (...a: a) => d
function flow<a extends any.array, b, c, d, e>(
  ab: (...a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
): (...a: a) => e
function flow<a extends any.array, b, c, d, e, f>(
  ab: (...a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
): (...a: a) => f
function flow<a extends any.array, b, c, d, e, f, g>(
  ab: (...a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
): (...a: a) => g
function flow<a extends any.array, b, c, d, e, f, g, h>(
  ab: (...a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
): (...a: a) => h
function flow<a extends any.array, b, c, d, e, f, g, h, i>(
  ab: (...a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
): (...a: a) => i
function flow<a extends any.array, b, c, d, e, f, g, h, i, j>(
  ab: (...a: a) => b,
  bc: (b: b) => c,
  cd: (c: c) => d,
  de: (d: d) => e,
  ef: (e: e) => f,
  fg: (f: f) => g,
  gh: (g: g) => h,
  hi: (h: h) => i,
  ij: (i: i) => j,
): (...a: a) => j
function flow(
  ...args:
    | [ab: fn]
    | [ab: Function, bc: Function]
    | [ab: Function, bc: Function, cd: Function]
    | [ab: Function, bc: Function, cd: Function, de: Function]
    | [ab: Function, bc: Function, cd: Function, de: Function, ef: Function]
    | [ab: Function, bc: Function, cd: Function, de: Function, ef: Function, fg: Function]
    | [ab: Function, bc: Function, cd: Function, de: Function, ef: Function, fg: Function, gh: Function]
    | [
      ab: Function,
      bc: Function,
      cd: Function,
      de: Function,
      ef: Function,
      fg: Function,
      gh: Function,
      hi: Function,
    ]
    | [
      ab: Function,
      bc: Function,
      cd: Function,
      de: Function,
      ef: Function,
      fg: Function,
      gh: Function,
      hi: Function,
      ij: Function,
    ]
): unknown {
  switch (true) {
    case args.length === 1:
      return args[0]
    case args.length === 2:
      return function (this: unknown) {
        // biome-ignore lint/style/noArguments: semantically necessary
        return args[1](args[0].apply(this, arguments))
      }
    case args.length === 3:
      return function (this: unknown) {
        // biome-ignore lint/style/noArguments: semantically necessary
        return args[2](args[1](args[0].apply(this, arguments)))
      }
    case args.length === 4:
      return function (this: unknown) {
        // biome-ignore lint/style/noArguments: semantically necessary
        return args[3](args[2](args[1](args[0].apply(this, arguments))))
      }
    case args.length === 5:
      return function (this: unknown) {
        return args[4](
          // biome-ignore lint/style/noArguments: semantically necessary
          args[3](args[2](args[1](args[0].apply(this, arguments)))),
        )
      }
    case args.length === 6:
      return function (this: unknown) {
        return args[5](
          // biome-ignore lint/style/noArguments: semantically necessary
          args[4](args[3](args[2](args[1](args[0].apply(this, arguments))))),
        )
      }
    case args.length === 7:
      return function (this: unknown) {
        return args[6](
          args[5](
            // biome-ignore lint/style/noArguments: semantically necessary
            args[4](args[3](args[2](args[1](args[0].apply(this, arguments))))),
          ),
        )
      }
    case args.length === 8:
      return function (this: unknown) {
        return args[7](
          args[6](
            args[5](
              args[4](
                // biome-ignore lint/style/noArguments: semantically necessary
                args[3](args[2](args[1](args[0].apply(this, arguments)))),
              ),
            ),
          ),
        )
      }
    case args.length === 9:
      return function (this: unknown) {
        return args[8](
          args[7](
            args[6](
              args[5](
                args[4](
                  // biome-ignore lint/style/noArguments: semantically necessary
                  args[3](args[2](args[1](args[0].apply(this, arguments)))),
                ),
              ),
            ),
          ),
        )
      }
    default:
      return void 0
  }
}


export declare namespace fn {
  export {
    fnApply as apply,
    fnThrow as throw,
    fnIdentity as identity,
    fnLoop as loop,
    pipe,
    flow,
  }
}
export function fn() { }
export namespace fn {
  fn.apply = fnApply
  fn.throw = fnThrow
  fn.identity = fnIdentity
  fn.loop = fnLoop
  fn.pipe = pipe
  fn.flow = flow
}
