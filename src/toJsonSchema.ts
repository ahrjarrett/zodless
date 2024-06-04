import type { any, never } from "any-ts"

import { z } from "./schema.js"
import { array, fn, map, object } from "./util.js"
import { Parser } from "./parser.js"

namespace Invariant {
  export const ExpectedPrimitiveValue = <T>(value: T, inFn?: string) => fn.throw({
    msg: "Expected a primitive value",
    got: value,
    ...(inFn && { in: inFn }),
  })
}

export namespace JsonSchema {
  export type Tag = typeof Tag[keyof typeof Tag]
  export declare namespace Tag {
    type Number = typeof Tag.Number
    type Integer = typeof Tag.Integer
    type String = typeof Tag.String
    type Object = typeof Tag.Object
    type Array = typeof Tag.Array
    type Boolean = typeof Tag.Boolean
    type Null = typeof Tag.Null
  }
  export const Tag = {
    Number: "number",
    Integer: "integer",
    Object: "object",
    Array: "array",
    String: "string",
    Boolean: "boolean",
    Null: "null",
  } as const

  export namespace Numeric {
    export type Node =
      | Numeric.Number
      | Numeric.Integer
      ;
    export interface Integer extends Numeric.Base { type: "integer" }
    export interface Number extends Numeric.Base { type: "number" }
    export interface Base {
      minimum?: number
      exclusiveMinimum?: number
      maximum?: number
      exclusiveMaximum?: number
      multipleOf?: number
    };
    export interface BigInt {
      type: "integer"
      minimum?: bigint
      exclusiveMinimum?: bigint
      maximum?: bigint
      exclusiveMaximum?: bigint
      multipleOf?: bigint
    }
  }

  export namespace String {
    export interface Node {
      type: "string";
      minLength?: number;
      maxLength?: number;
      format?: Format
      pattern?: string;
      /** TODO: decide if/how you want to handle these properties */
      // allOf?: any.array<{ pattern: string }>
      // anyOf?: any.array<{ format: string }>
      // contentEncoding?: string
    }
    export type Format = typeof Format[keyof typeof Format]
    export const Format = {
      Email: "email",
      URI: "uri",
      UUID: "uuid",
      DateTime: "date-time",
      IPv4: "ipv4",
      IPv6: "ipv6",
      Date: "date",
      Time: "time",
      Duration: "duration",
      /** TODO: look into supporting this format */
      IdnEmail: "idn-email",
    } as const

    export const format
      : (checks: array.indexOf.nonfinite<"kind", z.ZodStringCheck[]>) => null | { format: Format }
      = (checks) => {
        switch (true) {
          case globalThis.Boolean(checks.email): return { format: Format.Email }
          case globalThis.Boolean(checks.url): return { format: Format.URI }
          case globalThis.Boolean(checks.uuid): return { format: Format.UUID }
          case globalThis.Boolean(checks.datetime): return { format: Format.DateTime }
          case globalThis.Boolean(checks.date): return { format: Format.Date }
          case globalThis.Boolean(checks.time): return { format: Format.Time }
          case globalThis.Boolean(checks.duration): return { format: Format.Duration }
          case globalThis.Boolean(checks.ip): return { format: checks.ip?.version === "v6" ? Format.IPv6 : Format.IPv4 }
          default: return null
        }
      }
  }
  export namespace Const {
    const typeOf
      : (value: any.primitive) => "string" | "number" | "bigint" | "boolean" | "symbol" | "null"
      = (value) =>
        value == null ? "null"
          : ["object", "function"].includes(typeof value)
            ? Invariant.ExpectedPrimitiveValue(value, `Const.typeOf`)
            : typeof value as never

    export const type
      : (s: z.literal) => "string" | "number" | "bigint" | "boolean" | "symbol" | "null"
      = (s) => typeOf(s.value)
  }

  export const fromNullCodec = (_: z.null) => ({ type: Tag.Null })
  export const fromUndefinedCodec = (_: z.undefined) => ({ type: Tag.Null })
  export const fromBooleanCodec = (_: z.boolean) => ({ type: Tag.Boolean })
  export const fromLiteralCodec = (s: z.literal) => ({ type: JsonSchema.Const.type(s), const: z.literal.get(s) })

  export const fromStringCodec
    : (schema: z.string) => JsonSchema.String.Node
    = (schema) => fn.pipe(
      array.indexOf("kind")(schema._def.checks),
      (checks) => ({
        type: Tag.String,
        ...(JsonSchema.String.format(checks) ?? {}),
        ...(checks.min && { minLength: checks.min.value }),
        ...(checks.max && { maxLength: checks.max.value }),
        /** TODO: figure out how you want to parse a RegExp into a string */
        // ...(checks.regex && { pattern: checks.regex.regex })
      }),
    )

  export const fromNumberCodec
    : (schema: z.number) => JsonSchema.Numeric.Node
    = (schema) => fn.pipe(
      array.indexOf("kind")(schema._def.checks),
      ({ int, max, min, multipleOf }) => ({
        type: int ? Tag.Integer : Tag.Number,
        ...(min && (min.inclusive ? { minimum: min.value } : { exclusiveMinimum: min.value })),
        ...(max && (max.inclusive ? { maximum: max.value } : { exclusiveMaximum: max.value })),
        ...(multipleOf && { multipleOf: multipleOf.value }),
      }),
    )

  export const fromBigIntCodec
    : (schema: z.bigint) => JsonSchema.Numeric.BigInt
    = (schema) => fn.pipe(
      array.indexOf("kind")(schema._def.checks),
      ({ max, min, multipleOf }) => ({
        type: Tag.Integer,
        ...(min && (min.inclusive ? { minimum: min.value } : { exclusiveMinimum: min.value })),
        ...(max && (max.inclusive ? { maximum: max.value } : { exclusiveMaximum: max.value })),
        ...(multipleOf && { multipleOf: multipleOf.value }),
      }),
    )

  export const fromArrayCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.array) => { type: "array", items: O }
    = (continuation) =>
      fn.flow(
        z.array.get,
        continuation,
        object.bind("items"),
        object.upsert("type")(JsonSchema.Tag.Array),
      )

  export const fromOptionalCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.optional) => O
    = (continuation) =>
      fn.flow(
        z.optional.get,
        continuation,
      )

  export const fromReadonlyCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.readonly) => O
    = (continuation) =>
      fn.flow(
        z.readonly.get,
        continuation,
      )

  export const fromUnionCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.union) => { anyOf: [O, O, ...O[]] }
    = (continuation) =>
      fn.flow(
        z.union.get,
        map(continuation),
        object.bind("anyOf"),
      )

  export const fromIntersectionCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.intersection) => { allOf: [O, O, ...O[]] }
    = (continuation) =>
      fn.flow(
        z.intersection.get,
        map(continuation),
        object.bind("allOf"),
      )

  export const fromDisjointCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.disjoint) => { oneOf: [O, ...O[]] }
    = (continuation) =>
      fn.flow(
        z.discriminatedUnion.get,
        map(continuation),
        x => x,
        object.bind("oneOf"),
      )

  export const fromRecordCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.record.any) => { type: "object", additionalProperties: O }
    = (continuation) =>
      fn.flow(
        z.record.get,
        continuation,
        object.bind("additionalProperties"),
        object.upsert("type")(JsonSchema.Tag.Object),
      )

  export const fromTupleCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.tuple) => { type: "array", items: [] | [O, ...O[]] }
    = (continuation) =>
      fn.flow(
        z.tuple.get,
        map(continuation),
        object.bind("items"),
        object.upsert("type")(JsonSchema.Tag.Array),
      )

  export const fromObjectCodec
    : <O>(continuation: (_: z.any) => O) => (schema: z.object.any) => { type: "object", properties: any.dict<O>, required: any.array<any.index> }
    = (continuation) => (schema) => fn.pipe(
      schema,
      z.object.get,
      map(continuation),
      (properties) => ({
        properties,
        required: fn.pipe(
          z.object.get(schema),
          object.filter(
            fn.flow(
              z.typeName.get,
              (name) => name !== z.tag.ZodOptional,
            )
          ),
          object.keys,
        )
      }),
      object.upsert("type")(JsonSchema.Tag.Object)
    )
}

export type toJsonSchemaPrimitive<schema extends z.primitive>
  = [schema] extends [z.number] ? { type: JsonSchema.Tag.Number }
  : [schema] extends [z.string] ? { type: JsonSchema.Tag.String }
  : [schema] extends [z.boolean] ? { type: JsonSchema.Tag.Boolean }
  : [schema] extends [z.null] ? { type: JsonSchema.Tag.Null }
  : [schema] extends [z.undefined] ? { type: JsonSchema.Tag.Null }
  : never.close.unmatched_expr
  ;

export type toJson<value extends any.primitive>
  = [value] extends [number] ? { type: JsonSchema.Tag.Number, const: value }
  : [value] extends [string] ? { type: JsonSchema.Tag.String, const: value }
  : [value] extends [boolean] ? { type: JsonSchema.Tag.Boolean, const: value }
  : [value] extends [null] ? { type: JsonSchema.Tag.Null, const: null }
  : [value] extends [undefined] ? { type: JsonSchema.Tag.Null, const: undefined }
  : [value] extends [symbol] ? { type: JsonSchema.Tag.Null, const: value }
  : never.close.unmatched_expr
  ;

/**
 * {@link toJsonSchema `z.toJsonSchema`} takes a zod schema as input
 * and poops out well-formed JSON Schema.
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
type toJsonSchema<schema extends z.any>
  = [schema] extends [z.primitive] ? toJsonSchemaPrimitive<schema>
  : [schema] extends [z.literal<infer value>] ? toJson<value>
  : [schema] extends [z.optional<infer s>] ? toJsonSchema<s>
  : [schema] extends [z.union<infer members>]
  ? ({ anyOf: { [ix in keyof members]: toJsonSchema<members[ix]> } })
  : [schema] extends [z.intersection<infer left, infer right>]
  ? ({ allOf: [toJsonSchema<left>, toJsonSchema<right>] })
  : [schema] extends [z.disjoint<string, infer set>]
  ? ({ oneOf: { [ix in keyof set]: toJsonSchema<set[ix]> } })
  : [schema] extends [z.array<infer elements>]
  ? ({ type: JsonSchema.Tag.Array, items: toJsonSchema<elements> })
  : [schema] extends [z.tuple<infer items>]
  ? ({ type: JsonSchema.Tag.Array, items: { [ix in keyof items]: toJsonSchema<items[ix]> } })
  : [schema] extends [z.record<infer values>]
  ? ({ type: JsonSchema.Tag.Array, additionalProperties: any.dict<toJsonSchema<values>> })
  : [schema] extends [z.object<infer props>] ?
  ({
    type: JsonSchema.Tag.Object,
    properties: { [k in keyof props]: toJsonSchema<props[k]> }
    required: [keyof props] extends [any.keyof<props, infer k>]
    ? [k] extends [never] ? []
    : any.array<
      k extends k
      ? undefined extends props[k]["_output"] ? never
      : k
      : never.close.distributive<"k">
    >
    : never.close.inline_var<"k">
  })
  : never.close.unmatched_expr
  ;

/**
 * {@link toJsonSchema `z.toJsonSchema`} takes a zod schema as input
 * and poops out well-formed JSON Schema.
 * 
 * ###### 📦 with ᯓᡣ𐭩 by [`ahrjarrett`](https://github.com/ahrjarrett)
 */
export function toJsonSchema<S extends z.ZodTypeAny, skipTypes = never>(schema: S, skipTypes?: skipTypes):
  [skipTypes] extends [never] ? toJsonSchema<S> : {}
export function toJsonSchema<S extends z.ZodTypeAny>(schema: S) {
  return Parser.new({
    array: () => JsonSchema.fromArrayCodec,
    bigint: () => JsonSchema.fromBigIntCodec,
    boolean: () => JsonSchema.fromBooleanCodec,
    disjoint: () => JsonSchema.fromDisjointCodec,
    intersection: () => JsonSchema.fromIntersectionCodec,
    literal: () => JsonSchema.fromLiteralCodec,
    null: () => JsonSchema.fromNullCodec,
    number: () => JsonSchema.fromNumberCodec,
    object: () => JsonSchema.fromObjectCodec,
    record: () => JsonSchema.fromRecordCodec,
    string: () => JsonSchema.fromStringCodec,
    tuple: () => JsonSchema.fromTupleCodec,
    undefined: () => JsonSchema.fromUndefinedCodec,
    union: () => JsonSchema.fromUnionCodec,
    optional: () => JsonSchema.fromOptionalCodec,
    readonly: () => JsonSchema.fromReadonlyCodec,
  })(schema)
}
