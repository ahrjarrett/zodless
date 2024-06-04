import { z } from "./schema.js"
import { fn } from "./util.js"
import type { any } from "any-ts"

namespace Invariant {
  export const UnsupportedSchemaType = (got: z.any, inFn?: string) => fn.throw({
    msg: "Schema type unsupported",
    got,
    ...(inFn && { in: inFn })
  })
}

interface Context { }

interface LeafHandlers {
  null(ctx: Context): (node: z.null) => any.nonnullable
  undefined(ctx: Context): (node: z.undefined) => any.nonnullable
  string(ctx: Context): (node: z.string) => any.nonnullable
  number(ctx: Context): (node: z.number) => any.nonnullable
  boolean(ctx: Context): (node: z.boolean) => any.nonnullable
  bigint(ctx: Context): (node: z.bigint) => any.nonnullable
  literal(ctx: Context): (node: z.literal) => any.nonnullable
}

interface CompositeHandlers {
  array(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.array) => any.nonnullable
  tuple(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.tuple) => any.nonnullable
  record(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.record.any) => any.nonnullable
  object(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.object.any) => any.nonnullable
  union(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.union) => any.nonnullable
  intersection(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.intersection) => any.nonnullable
  disjoint(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.disjoint) => any.nonnullable
  readonly(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.readonly) => O
  optional(ctx: Context): <O>(continuation: (_: z.any) => O) => (node: z.optional) => O
}

interface Handlers extends LeafHandlers, CompositeHandlers { }

/**
 * {@link createParser `Parser.new`} gives users a structured way to do any arbitrary
 * thing, given a zod schema.
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
function createParser<handlers extends globalThis.Partial<Handlers>>
  (handlers: handlers): <S extends z.any>(schema: S) => {}
// impl.
function createParser<handlers extends globalThis.Partial<Handlers>>(handlers: handlers) {
  return <S extends z.any>(schema: S) => {
    const loop = fn.loop<z.any, {}>((s, next) => {
      switch (true) {
        /// leaves:
        case z.null.is(s): return (handlers.null ?? fallbacks.null)({})(s)
        case z.undefined.is(s): return (handlers.undefined ?? fallbacks.undefined)({})(s)
        case z.number.is(s): return (handlers.number ?? fallbacks.number)({})(s)
        case z.string.is(s): return (handlers.string ?? fallbacks.string)({})(s)
        case z.boolean.is(s): return (handlers.boolean ?? fallbacks.boolean)({})(s)
        case z.literal.is(s): return (handlers.literal ?? fallbacks.literal)({})(s)
        /// composites:
        case z.optional.is(s): return (handlers.optional ?? fallbacks.optional)({})(next)(s)
        case z.readonly.is(s): return (handlers.readonly ?? fallbacks.readonly)({})(next)(s)
        case z.union.is(s): return (handlers.union ?? fallbacks.union)({})(next)(s)
        case z.intersection.is(s): return (handlers.intersection ?? fallbacks.intersection)({})(next)(s)
        case z.disjoint.is(s): return (handlers.disjoint ?? fallbacks.disjoint)({})(next)(s)
        case z.record.is(s): return (handlers.record ?? fallbacks.record)({})(next)(s)
        case z.array.is(s): return (handlers.array ?? fallbacks.array)({})(next)(s)
        case z.tuple.is(s): return (handlers.tuple ?? fallbacks.tuple)({})(next)(s)
        case z.object.is(s): return (handlers.object ?? fallbacks.object)({})(next)(s)
        default: return Invariant.UnsupportedSchemaType(s, `z.createParser`)
      }
    })
    return loop(schema)
  }
}

const defineHandlers
  : <handlers extends Partial<Handlers>>(handlers: handlers) => handlers
  = fn.identity

const fallbacks = defineHandlers({
  // leaves
  null: () => fn.identity,
  undefined: () => fn.identity,
  string: () => fn.identity,
  number: () => fn.identity,
  boolean: () => fn.identity,
  bigint: () => fn.identity,
  // unary
  literal: () => fn.identity,
  readonly: () => fn.identity,
  optional: () => fn.identity,
  // binary
  array: () => () => fn.identity,
  tuple: () => () => fn.identity,
  record: () => () => fn.identity,
  object: () => () => fn.identity,
  union: () => () => fn.identity,
  intersection: () => () => fn.identity,
  disjoint: () => () => fn.identity,
})

export declare namespace Parser {
  export {
    createParser as new,
    defineHandlers,
  }
}
export function Parser() { }
export namespace Parser {
  Parser.new = createParser
  Parser.defineHandlers = defineHandlers
}
