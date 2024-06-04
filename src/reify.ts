import type { any, mut } from "any-ts"
import { z, ZodlessTag } from "./schema.js"
import { fn, map } from "./util.js"

/**
 * {@link reify `reify`} is a function that takes a zod schema, and 
 * produces a concrete (or "reified") data structure that is more 
 * amenable to parsing.
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export type reify<T extends z.any> = mut<reify.go<T>>
export declare namespace reify {
  type leaf<type extends z.any.primitive> = never | [z.adaptor[type["_def"]["typeName"]]]
  type go<type>
    = [type] extends [z.primitive] ? leaf<type>
    : [type] extends [z.unknown] ? [TAG: typeof ZodlessTag.unknown]
    : [type] extends [z.literal] ? [TAG: typeof ZodlessTag.literal, VALUE: z.literal.get<type>]
    : [type] extends [z.optional] ? [TAG: typeof ZodlessTag.optional, INNER_TYPE: go<z.optional.get<type>>]
    : [type] extends [z.readonly] ? [TAG: typeof ZodlessTag.readonly, INNER_TYPE: go<z.readonly.get<type>>]
    : [type] extends [z.array] ? [TAG: typeof ZodlessTag.array, ELEMENTS: go<z.array.get<type>>]
    : [type] extends [z.record] ? [TAG: typeof ZodlessTag.record, KEY: z.record.getIndex<type>, VALUE: go<z.record.get<type>>]
    : [type] extends [z.object] ? [TAG: typeof ZodlessTag.object, PROPERTIES: { [k in keyof type["shape"]]: go<type["shape"][k]> }]
    : [type] extends [z.intersection<infer left, infer right>] ? [TAG: typeof ZodlessTag.intersection, LEFT: go<left>, RIGHT: go<right>]
    : [type] extends [z.tuple<infer items>] ? [TAG: typeof ZodlessTag.tuple, ITEMS: { [ix in keyof items]: go<items[ix]> }]
    : [type] extends [z.union<[z.any<infer fst>, z.any<infer snd>, ...infer rest extends z.any[]]>]
    ? [fst, snd, ...rest] extends any.list<infer xs>
    ? [tag: typeof ZodlessTag.union, MEMBERS: { [ix in keyof xs]: go<xs[ix]> }]
    : never
    : [UNIMPLEMENTED: type]
    ;
}

/**
 * {@link reify `reify`} is a function that takes a zod schema, and 
 * produces a concrete (or "reified") data structure that is more 
 * amenable to parsing.
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function reify<const T extends z.any>(schema: T): reify<T>
export function reify<const T extends z.any>(schema: T) {
  const loop = fn.loop<z.any, unknown>((s, next) => {
    const typeName = z.typeName.get(s)
    const tag = z.adaptor[typeName]
    const wrap = (u: unknown) => [tag, u] as const
    switch (true) {
      case z.primitive.is(s): return [tag]
    }
    switch (tag) {
      case ZodlessTag.bigint: return [tag]
      case ZodlessTag.boolean: return [tag]
      case ZodlessTag.number: return [tag]
      case ZodlessTag.string: return [tag]
      case ZodlessTag.null: return [tag]
      case ZodlessTag.undefined: return [tag]
      case ZodlessTag.unknown: return [tag]
      case ZodlessTag.array:
        return !z.array.is(s)
          ? fn.throw("In `reify`, expected an array schema, got:", s)
          : fn.pipe(
            s.element,
            next,
            wrap,
          )
      case ZodlessTag.tuple:
        return !z.tuple.is(s)
          ? fn.throw("In `reify`, expected a tuple schema, got:", s)
          : fn.pipe(
            s.items,
            map(next),
            wrap,
          )
      case ZodlessTag.object:
        return !z.object.is(s)
          ? fn.throw("In `reify`, expected an object schema, got:", s)
          : fn.pipe(
            s.shape,
            map(next),
            wrap,
          )
      case ZodlessTag.union:
        return !z.union.is(s)
          ? fn.throw("In `reify`, expected a union schema, got:", s)
          : fn.pipe(
            z.union.get(s),
            map(next),
            wrap,
          )
      case ZodlessTag.intersection:
        return !z.intersection.is(s)
          ? fn.throw("In `reify`, expected an intersection schema, got:", s)
          : fn.pipe(
            [next(s._def.left), next(s._def.right)],
            wrap,
          )
      case ZodlessTag.literal:
        return !z.literal.is(s)
          ? fn.throw("In `reify`, expected a literal schema, got:", s)
          : fn.pipe([ZodlessTag.literal, z.literal.get(s)])
      default: return fn.throw(s)
    }
  })
  return loop(schema)
}