import type {
  AnyZodObject,
  AnyZodTuple,
  ArrayCardinality,
  ArrayKeys,
  AssertArray,
  AsyncParseReturnType,
  CatchallInput,
  CatchallOutput,
  CustomErrorParams,
  DenormalizedError,
  Effect,
  EnumLike,
  EnumValues,
  ErrorMapCtx,
  FilterEnum,
  Indices,
  InnerTypeOfFunction,
  InputTypeOfTuple,
  InputTypeOfTupleWithRest,
  IpVersion,
  IssueData,
  KeySchema,
  ObjectPair,
  OuterTypeOfFunction,
  OutputTypeOfTuple,
  OutputTypeOfTupleWithRest,
  ParseContext,
  ParseInput,
  ParseParams,
  ParsePath,
  ParsePathComponent,
  ParseResult,
  ParseReturnType,
  PassthroughType,
  PreprocessEffect,
  Primitive,
  ProcessedCreateParams,
  RawCreateParams,
  RecordType,
  Refinement,
  RefinementCtx,
  RefinementEffect,
  SafeParseError,
  SafeParseReturnType,
  SafeParseSuccess,
  Scalars,
  SomeZodObject,
  StringValidation,
  SuperRefinement,
  SyncParseReturnType,
  TransformEffect,
  TypeOf,
  UnknownKeysParam,
  Values,
  Writeable,
  ZodAnyDef,
  ZodArrayDef,
  ZodBigIntCheck,
  ZodBigIntDef,
  ZodBooleanDef,
  ZodBrandedDef,
  ZodCatchDef,
  ZodCustomIssue,
  ZodDateCheck,
  ZodDateDef,
  ZodDefaultDef,
  ZodDiscriminatedUnionDef,
  ZodDiscriminatedUnionOption,
  ZodEffectsDef,
  ZodEnumDef,
  ZodErrorMap,
  ZodFirstPartySchemaTypes,
  ZodFormattedError,
  ZodFunctionDef,
  ZodIntersectionDef,
  ZodInvalidArgumentsIssue,
  ZodInvalidDateIssue,
  ZodInvalidEnumValueIssue,
  ZodInvalidIntersectionTypesIssue,
  ZodInvalidLiteralIssue,
  ZodInvalidReturnTypeIssue,
  ZodInvalidStringIssue,
  ZodInvalidTypeIssue,
  ZodInvalidUnionDiscriminatorIssue,
  ZodInvalidUnionIssue,
  ZodIssue,
  ZodIssueBase,
  ZodIssueOptionalMessage,
  ZodLazyDef,
  ZodLiteralDef,
  ZodMapDef,
  ZodNaNDef,
  ZodNativeEnumDef,
  ZodNeverDef,
  ZodNonEmptyArray,
  ZodNotFiniteIssue,
  ZodNotMultipleOfIssue,
  ZodNullDef,
  ZodNullableDef,
  ZodNullableType,
  ZodNumberCheck,
  ZodNumberDef,
  ZodObjectDef,
  ZodOptionalDef,
  ZodOptionalType,
  ZodPipelineDef,
  ZodPromiseDef,
  ZodRawShape,
  ZodReadonlyDef,
  ZodRecordDef,
  ZodSetDef,
  ZodStringCheck,
  ZodStringDef,
  ZodSymbolDef,
  ZodTooBigIssue,
  ZodTooSmallIssue,
  ZodTupleDef,
  ZodTupleItems,
  ZodTypeAny,
  ZodTypeDef,
  ZodUndefinedDef,
  ZodUnionDef,
  ZodUnionOptions,
  ZodUnknownDef,
  ZodUnrecognizedKeysIssue,
  ZodVoidDef,
} from "zod"

import type {
  arrayOutputType,
  baseObjectInputType,
  baseObjectOutputType,
  deoptional,
  infer,
  inferFlattenedErrors,
  inferFormattedError,
  input,
  mergeTypes,
  noUnrecognized,
  objectInputType,
  objectOutputType,
  output,
  typeToFlattenedError,
  typecast,
} from "zod"

import {
  ParseStatus,
  Schema,
  ZodAny,
  ZodArray,
  ZodBigInt,
  ZodBoolean,
  ZodBranded,
  ZodCatch,
  ZodDate,
  ZodDefault,
  ZodDiscriminatedUnion,
  ZodEffects,
  ZodEnum,
  ZodFirstPartyTypeKind,
  ZodFunction,
  ZodIntersection,
  ZodIssueCode,
  // ZodError,
  ZodLazy,
  ZodLiteral,
  ZodMap,
  ZodNaN,
  ZodNativeEnum,
  ZodNever,
  ZodNull,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodParsedType,
  ZodPipeline,
  ZodPromise,
  ZodReadonly,
  ZodSchema,
  ZodSet,
  ZodRecord,
  ZodString,
  ZodSymbol,
  ZodTransformer,
  ZodTuple,
  ZodType,
  ZodUndefined,
  ZodUnion,
  ZodUnknown,
  ZodVoid,
  BRAND,
  DIRTY,
  EMPTY_PATH,
  INVALID,
  NEVER,
  OK,
} from "zod"

import {
  boolean,
  bigint,
  symbol,
  addIssueToContext,
  // any,
  coerce,
  custom,
  date,
  defaultErrorMap,
  discriminatedUnion,
  effect,
  getErrorMap,
  getParsedType,
  intersection,
  isAborted,
  isAsync,
  isDirty,
  isValid,
  late,
  lazy,
  literal,
  makeIssue,
  nan,
  nativeEnum,
  never,
  nullable,
  objectUtil,
  oboolean,
  onumber,
  optional,
  ostring,
  pipeline,
  preprocess,
  promise,
  quotelessJson,
  record,
  set,
  setErrorMap,
  strictObject,
  // string,
  transformer,
  // tuple,
  // union,
  unknown,
  util,
  z as Z,
} from "zod"

import {
  // array as array_,
  // enum as enum_, 
  // function as function_,
  // map as map_,
  // number as number_,
  // null as null_,
  // undefined as undefined_,
  // instanceof as instanceof_,
  // void as void_,
  // object as object_,
} from "zod"


// import { array, fn, map, type number, object, type to } from "@hotelengine/data"
import type { any, mut, nonempty } from "any-ts"

export { z }

const Tags = array.of(
  "optional",
  "readonly",
  "record",
  "nullable",
  "bigint",
  "string",
  "number",
  "boolean",
  "undefined",
  "null",
  "symbol",
  "date",
  "literal",
  "array",
  "tuple",
  "object",
  "intersection",
  "union",
  "disjoint",
  "enum",
  "any",
  "unknown",
  "never",
  "any",
  "void",
  "function",
  "branded",
  "catch",
  "default",
  "effects",
  "lazy",
  "map",
  "NaN",
  "native_enum",
  "pipeline",
  "promise",
  "set",
)
export const Tag = object.fromKeys(Tags)
//           ^?
export type Tag = typeof Tag[keyof typeof Tag]
//           ^?

type ZodTag = typeof ZodTag[keyof typeof ZodTag]
const ZodTag = ZodFirstPartyTypeKind

// const handlerMap = {
//   [ZodTag.ZodOptional]: UNIMPLEMENTED,
//   [ZodTag.ZodReadonly]: UNIMPLEMENTED,
//   [ZodTag.ZodNullable]: UNIMPLEMENTED,
//   [ZodTag.ZodAny]: { type: Tag.any, children: null, },
//   [ZodTag.ZodUnknown]: { type: Tag.unknown, children: null, },
//   [ZodTag.ZodNever]: { type: Tag.never, children: null, },
//   [ZodTag.ZodVoid]: { type: Tag.void, children: null },
//   [ZodTag.ZodFunction]: { type: Tag.function, children: null },
//   [ZodTag.ZodBigInt]: { type: Tag.bigint, children: null },
//   [ZodTag.ZodString]: { type: Tag.string, children: null },
//   [ZodTag.ZodNumber]: { type: Tag.number, children: null },
//   [ZodTag.ZodBoolean]: { type: Tag.boolean, children: null },
//   [ZodTag.ZodUndefined]: { type: Tag.undefined, children: null },
//   [ZodTag.ZodNull]: { type: Tag.null, children: null },
//   [ZodTag.ZodSymbol]: { type: Tag.symbol, children: null },
//   [ZodTag.ZodDate]: { type: Tag.date, children: null },
//   [ZodTag.ZodLiteral]: { 
//     type: Tag.literal, 
//     children: <T extends any.primitive>(schema: ZodLiteral<T>): T => schema.value 
//   },
//   [ZodTag.ZodArray]: {
//     type: Tag.array,
//     children: <T extends z.any>(schema: z.array<T>): T => schema._def.type,
//   },
//   [ZodTag.ZodTuple]: {
//     type: Tag.tuple,
//     children: <T extends z.any.items>(schema: z.tuple<T>): T => schema.items,
//   },
//   [ZodTag.ZodObject]: {
//     type: Tag.object,
//     children: <T extends z.any.shape>(schema: z.object<T>): T => schema.shape,
//   },
//   [ZodTag.ZodRecord]: { 
//     type: Tag.record, 
//     children: <K extends z.any.key, V extends z.any>(schema: z.record<V, K>) => ({ key: schema.keySchema, value: schema.valueSchema, }) 
//   },
//   [ZodTag.ZodIntersection]: {
//     type: Tag.intersection,
//     children: <L extends z.any, R extends z.any>({ _def }: z.intersection<L, R>): any.pair<L, R> => [_def.left, _def.right],
//   },
//   [ZodTag.ZodUnion]: {
//     type: Tag.union,
//     children: <T extends z.any.members>(schema: z.union<T>): T => schema.options,
//   },
//   [ZodTag.ZodDiscriminatedUnion]: {
//     type: Tag.disjoint,
//     children: <D extends string, T extends any.array<ZodDiscriminatedUnionOption<D>>>(schema: ZodDiscriminatedUnion<D, [...T]>): T => schema.options,
//   },
//   [ZodTag.ZodEnum]: {
//     type: Tag.enum,
//     children: <T extends nonempty.array<string>>(schema: ZodEnum<[...T]>): T => schema.options
//   },
//   [ZodTag.ZodBranded]: UNIMPLEMENTED,
//   [ZodTag.ZodCatch]: UNIMPLEMENTED,
//   [ZodTag.ZodDefault] : UNIMPLEMENTED,
//   [ZodTag.ZodEffects]: UNIMPLEMENTED,
//   [ZodTag.ZodLazy]: UNIMPLEMENTED,
//   [ZodTag.ZodMap]: UNIMPLEMENTED,
//   [ZodTag.ZodNaN]: UNIMPLEMENTED,
//   [ZodTag.ZodNativeEnum]: UNIMPLEMENTED,
//   [ZodTag.ZodPipeline]: UNIMPLEMENTED,
//   [ZodTag.ZodPromise]: UNIMPLEMENTED,
//   [ZodTag.ZodSet]: UNIMPLEMENTED,
// } as const satisfies Record<keyof typeof ZodTag, any>


export type zodKindByType = typeof zodKindByType
//           ^?
export const zodKindByType = {
  [Tag.bigint]: ZodTag.ZodBigInt,
  [Tag.boolean]: ZodTag.ZodBoolean,
  [Tag.readonly]: ZodTag.ZodReadonly,
  [Tag.record]: ZodTag.ZodRecord,
  [Tag.catch]: ZodTag.ZodCatch,
  [Tag.branded]: ZodTag.ZodBranded,
  [Tag.date]: ZodTag.ZodDate,
  [Tag.default]: ZodTag.ZodDefault,
  [Tag.disjoint]: ZodTag.ZodDiscriminatedUnion,
  [Tag.effects]: ZodTag.ZodEffects,
  [Tag.enum]: ZodTag.ZodEnum,
  [Tag.function]: ZodTag.ZodFunction,
  [Tag.intersection]: ZodTag.ZodIntersection,
  [Tag.lazy]: ZodTag.ZodLazy,
  [Tag.literal]: ZodTag.ZodLiteral,
  [Tag.map]: ZodTag.ZodMap,
  [Tag.native_enum]: ZodTag.ZodNativeEnum,
  [Tag.never]: ZodTag.ZodNever,
  [Tag.null]: ZodTag.ZodNull,
  [Tag.nullable]: ZodTag.ZodNullable,
  [Tag.number]: ZodTag.ZodNumber,
  [Tag.object]: ZodTag.ZodObject,
  [Tag.optional]: ZodTag.ZodOptional,
  [Tag.pipeline]: ZodTag.ZodPipeline,
  [Tag.promise]: ZodTag.ZodPromise,
  [Tag.set]: ZodTag.ZodSet,
  [Tag.string]: ZodTag.ZodString,
  [Tag.symbol]: ZodTag.ZodSymbol,
  [Tag.tuple]: ZodTag.ZodTuple,
  [Tag.undefined]: ZodTag.ZodUndefined,
  [Tag.union]: ZodTag.ZodUnion,
  [Tag.unknown]: ZodTag.ZodUnknown,
  [Tag.void]: ZodTag.ZodVoid,
  [Tag.any]: ZodTag.ZodAny,
  [Tag.array]: ZodTag.ZodArray,
  [Tag.NaN]: ZodTag.ZodNaN,
} as const

type adaptor = typeof adaptor
const adaptor = object.invert(zodKindByType)

type getBoth<type extends z.intersection>
  = [left: type["_def"]["left"], right: type["_def"]["right"]]
function getBoth<L extends z.any, R extends z.any>(schema: z.intersection<L, R>): [left: L, right: R] {
  return [schema._def.left, schema._def.right]
}

type intersection_<left extends z.any = z.any, right extends z.any = z.any> = never | ZodIntersection<left, right>
declare namespace intersection_ {
  export type getLeft<type extends z.intersection> = type["_def"]["left"]
  export type getRight<type extends z.intersection> = type["_def"]["right"]
  export {
    isIntersection as is,
    getBoth,
  }
}

function isIntersection<L extends z.any, R extends z.any>(u: unknown): u is z.intersection<L, R> {
  return hasTypeName(u, ZodTag.ZodIntersection)
}
function intersection_
  <L extends z.any, R extends z.any>(left: L, right: R, params?: RawCreateParams): z.intersection<L, R> { return Z.intersection(left, right, params) }


namespace intersection_ {
  intersection_.is = isIntersection
  intersection_.getBoth = getBoth

  // export const is
  //   : <L extends z.any, R extends z.any>(u: unknown) => u is ZodIntersection<L, R> 
  //   = (u): u is never =>
  //   hasTypeName(u, ZodTag.ZodIntersection)
  export const getLeft
    : <L extends z.any, R extends z.any>(schema: z.intersection<L, R>) => L
    = (schema) => schema._def.left
  export const getRight
    : <R extends z.any, L extends z.any>(schema: z.intersection<L, R>) => R
    = (schema) => schema._def.right
}


declare namespace z {
  export type {
    AnyZodObject,
    AnyZodTuple,
    ArrayCardinality,
    ArrayKeys,
    AssertArray,
    AsyncParseReturnType,
    CatchallInput,
    CatchallOutput,
    CustomErrorParams,
    DenormalizedError,
    Effect,
    EnumLike,
    EnumValues,
    ErrorMapCtx,
    FilterEnum,
    Indices,
    InnerTypeOfFunction,
    InputTypeOfTuple,
    InputTypeOfTupleWithRest,
    IpVersion,
    IssueData,
    KeySchema,
    ObjectPair,
    OuterTypeOfFunction,
    OutputTypeOfTuple,
    OutputTypeOfTupleWithRest,
    ParseContext,
    ParseInput,
    ParseParams,
    ParsePath,
    ParsePathComponent,
    ParseResult,
    ParseReturnType,
    PassthroughType,
    PreprocessEffect,
    Primitive,
    ProcessedCreateParams,
    RawCreateParams,
    RecordType,
    Refinement,
    RefinementCtx,
    RefinementEffect,
    SafeParseError,
    SafeParseReturnType,
    SafeParseSuccess,
    Scalars,
    SomeZodObject,
    StringValidation,
    SuperRefinement,
    SyncParseReturnType,
    TransformEffect,
    TypeOf,
    UnknownKeysParam,
    Values,
    Writeable,
    ZodAnyDef,
    ZodArrayDef,
    ZodBigIntCheck,
    ZodBigIntDef,
    ZodBooleanDef,
    ZodBrandedDef,
    ZodCatchDef,
    ZodCustomIssue,
    ZodDateCheck,
    ZodDateDef,
    ZodDefaultDef,
    ZodDiscriminatedUnionDef,
    ZodDiscriminatedUnionOption,
    ZodEffectsDef,
    ZodEnumDef,
    ZodErrorMap,
    ZodFirstPartySchemaTypes,
    ZodFormattedError,
    ZodFunctionDef,
    ZodIntersectionDef,
    ZodInvalidArgumentsIssue,
    ZodInvalidDateIssue,
    ZodInvalidEnumValueIssue,
    ZodInvalidIntersectionTypesIssue,
    ZodInvalidLiteralIssue,
    ZodInvalidReturnTypeIssue,
    ZodInvalidStringIssue,
    ZodInvalidTypeIssue,
    ZodInvalidUnionDiscriminatorIssue,
    ZodInvalidUnionIssue,
    ZodIssue,
    ZodIssueBase,
    ZodIssueOptionalMessage,
    ZodLazyDef,
    ZodLiteralDef,
    ZodMapDef,
    ZodNaNDef,
    ZodNativeEnumDef,
    ZodNeverDef,
    ZodNonEmptyArray,
    ZodNotFiniteIssue,
    ZodNotMultipleOfIssue,
    ZodNullDef,
    ZodNullableDef,
    ZodNullableType,
    ZodNumberCheck,
    ZodNumberDef,
    ZodObjectDef,
    ZodOptionalDef,
    ZodOptionalType,
    ZodPipelineDef,
    ZodPromiseDef,
    ZodRawShape,
    ZodReadonlyDef,
    ZodRecordDef,
    ZodSetDef,
    ZodStringCheck,
    ZodStringDef,
    ZodSymbolDef,
    ZodTooBigIssue,
    ZodTooSmallIssue,
    ZodTupleDef,
    ZodTupleItems,
    ZodTypeAny,
    ZodTypeDef,
    ZodUndefinedDef,
    ZodUnionDef,
    ZodUnionOptions,
    ZodUnknownDef,
    ZodUnrecognizedKeysIssue,
    ZodVoidDef,
  }

  export {
    adaptor,
    new_ as new,
    error,
    issue,
    issues,
    primitive,
    reify,
    typeName,
    ZodTag as tag,
    toJsonSchema,
    tree,
  }

  export {
    any_ as any,
    array_ as array,
    bigint_ as bigint,
    boolean_ as boolean,
    effect_ as effect,
    enum_ as enum,
    intersection_ as intersection,
    literal_ as literal,
    map_ as map,
    number_ as number,
    null_ as null,
    object_ as object,
    optional_ as optional,
    record_ as record,
    string_ as string,
    tuple_ as tuple,
    undefined_ as undefined,
    union_ as union,
    unknown_ as unknown,

    // function_ as function,
    // instanceof_ as instanceof,
    // void_ as void,
  }

  export {
    symbol,
    addIssueToContext,
    coerce,
    custom,
    date,
    defaultErrorMap,
    deoptional,
    discriminatedUnion,
    getErrorMap,
    getParsedType,
    infer,
    inferFlattenedErrors,
    inferFormattedError,
    input,
    isAborted,
    isAsync,
    isDirty,
    isValid,
    late,
    lazy,
    makeIssue,
    mergeTypes,
    nan,
    nativeEnum,
    never,
    noUnrecognized,
    nullable,
    objectInputType,
    objectOutputType,
    objectUtil,
    oboolean,
    onumber,
    ostring,
    output,
    pipeline,
    preprocess,
    promise,
    quotelessJson,
    set,
    setErrorMap,
    strictObject,
    transformer,
    typeToFlattenedError,
    typecast,
    util,
  }
}

function z() { }
namespace z {
  z.any = any_
  z.array = array_
  z.boolean = boolean_
  z.bigint = bigint_
  z.effect = effect_
  z.enum = enum_
  z.intersection = intersection_
  z.literal = literal_
  z.map = map_
  z.null = null_
  z.number = number_
  z.object = object_
  z.optional = optional_
  z.record = record_
  z.string = string_
  z.tuple = tuple_
  z.undefined = undefined_
  z.union = union_
  z.unknown = unknown_

  z.tag = ZodTag
  z.typeName = typeName
  z.issue = issue
  z.issues = issues
  z.error = error
  z.adaptor = adaptor
  z.primitive = primitive
  z.reify = reify
  z.toJsonSchema = toJsonSchema

  z.symbol = symbol
  z.addIssueToContext = addIssueToContext
  z.coerce = coerce
  z.custom = custom
  z.date = date
  z.defaultErrorMap = defaultErrorMap
  z.discriminatedUnion = discriminatedUnion
  z.getErrorMap = getErrorMap
  z.getParsedType = getParsedType
  z.intersection = intersection
  z.isAborted = isAborted
  z.isAsync = isAsync
  z.isDirty = isDirty
  z.isValid = isValid
  z.late = late
  z.lazy = lazy
  z.makeIssue = makeIssue
  z.nan = nan
  z.nativeEnum = nativeEnum
  z.never = never
  z.nullable = nullable
  z.oboolean = oboolean
  z.onumber = onumber
  z.ostring = ostring
  z.pipeline = pipeline
  z.preprocess = preprocess
  z.promise = promise
  z.quotelessJson = quotelessJson
  z.set = set
  z.setErrorMap = setErrorMap
  z.strictObject = strictObject
  z.transformer = transformer
  z.util = util
}

type evaluate<type> = never | { [k in keyof type]: type[k] }
type intersect<members extends any.array<z.any>, acc extends z.any = members[0]>
  = [members] extends [nonempty.arrayOf<z.any, infer head, infer tail>]
  ? intersect<tail, ZodIntersection<acc, head>>
  : acc

const primitiveTypeNames = [
  ZodTag.ZodString,
  ZodTag.ZodNumber,
  ZodTag.ZodBoolean,
  ZodTag.ZodNull,
  ZodTag.ZodUndefined,
  ZodTag.ZodBigInt
] as const

declare namespace new_ {
  export type record = ZodRecord<ZodString, z.any>
  export type array<node> = [node] extends [z.any<infer items>] ? ZodArray<items> : never
  export type tuple<node extends {}> = [node] extends [z.any.items<infer items>] ? ZodTuple<items> : never
  export type allOf<node extends {}> = [node] extends [any.arrayOf<z.any, infer schemas>]
    ? intersect<schemas>
    : never
  export type intersection<
    left extends z.any = z.any,
    right extends z.any = z.any
  > = ZodIntersection<left, right>
}


function any_(params?: RawCreateParams): ZodAny { return Z.any(params) }
type any_<type extends ZodTypeAny = ZodTypeAny> = type
declare namespace any_ {
  export { primitive }
  export { object_ as object }
  export type object_<type extends AnyZodObject = AnyZodObject> = type
  export type array<type extends ZodArray<any> = ZodArray<any>> = type
  export type tuple<type extends AnyZodTuple = AnyZodTuple> = type
  export type union<type extends z.union.new = z.union.new> = type
  export type intersection<
    type extends
    | z.new.intersection
    = z.new.intersection
  > = type
  export type record<
    type extends
    | z.new.record
    = z.new.record
  > = type
  export type dict<
    type extends z.any = z.any,
  > = ZodRecord<ZodString, type>
  export type leaf<
    type extends
    | z.primitive
    | z.tuple<[]>
    | z.object<{}>
    // | z.array 
    = z.primitive
    | z.tuple<[]>
    | z.object<{}>
  // | z.array
  > = type
  export type items<
    type extends
    | [] | nonempty.mut.array<z.any>
    = [] | nonempty.mut.array<z.any>
  > = type
  export type members<
    type extends
    | [z.any, z.any, ...z.any[]]
    = [z.any, z.any, ...z.any[]]
  > = type
  export type shape<type extends ZodRawShape = ZodRawShape> = type
  export type key<type extends KeySchema = KeySchema> = type
}

export type hasTypeName<typeName extends Tag = Tag> = never | { _def: { typeName: typeName } }
export function hasTypeName(u: unknown): u is hasTypeName
export function hasTypeName<name extends string>(u: unknown, typeName: name): u is hasTypeName<name & Tag>
export function hasTypeName<const names extends any.strings>(
  u: unknown,
  ...typeNames: names
): u is hasTypeName<names[number] & Tag>
// impl.
export function hasTypeName(u: unknown, ...typeNames: any.strings): u is never {
  return (
    typeof u === "object" &&
    u !== null &&
    "_def" in u &&
    typeof u._def === "object" &&
    u._def !== null &&
    "typeName" in u._def &&
    typeof u._def.typeName === "string" &&
    (typeNames.length === 0 ? true : typeNames.includes(u._def.typeName))
  )
}

const getTypeName
  : <S extends { _def: { typeName: keyof typeof Tag } }>(schema: S) => S["_def"]["typeName"]
  = (schema) => schema._def.typeName

const softGetTypeName
  : (u: unknown) => string | undefined
  = (u) => typeof u === "object" && u !== null
    ? (hasTypeName(u) ? getTypeName(u) : void 0)
    : void 0

const UNIMPLEMENTED = { type: "UNIMPLEMENTED", children: "UNIMPLEMENTED" } as const

namespace Guard {
  export const fromSchema
    : <S extends ZodSchema>(schema: S) => any.typeguard<z.input<S>, z.infer<S>>
    = (schema) => (u): u is never => schema.safeParse(u).success
}

declare namespace typeName {
  type has = { _def: { typeName: z.tag } }
  type get<type extends typeName.has> = type["_def"]["typeName"]
  type softGet<type> = ["_def"] extends [keyof type]
    ? type["_def"][Extract<"typeName", keyof type["_def"]>]
    : never
}
function typeName() { }
namespace typeName {
  export const has = hasTypeName
  export const get = getTypeName
  export const softGet = softGetTypeName
}

type array_<schema extends z.any = z.any> = never | ZodArray<schema, "many">
function array_<S extends z.any>(schema: S, params?: RawCreateParams): z.array<S> { return Z.array(schema, params) }
declare namespace array_ {
  type get<type extends z.array> = type["_def"]["type"]
}
namespace array_ {
  export const get: <S extends z.any>(xs: ZodArray<S>) => S = (xs) => xs._def.type
  export const is: <T extends z.any>(u: unknown) => u is ZodArray<T> = (u: unknown): u is never =>
    hasTypeName(u, ZodTag.ZodArray)
}

type enum_<T extends nonempty.array<string>> = never | ZodEnum<{ -readonly [k in keyof T]: T[k] }>
function enum_
  <const SS extends nonempty.array<string>>(values: SS, params?: RawCreateParams): z.enum<SS> { return Z.enum(values, params) }

type boolean_ = never | ZodBoolean
function boolean_
  (params?: boolean_.arguments): ZodBoolean { return Z.boolean(params) }
declare namespace boolean_ {
  type arguments = never | (
    & {
      errorMap?: ZodErrorMap
      invalid_type_error?: string
      required_error?: string
      description?: string
    }
    & { coerce?: boolean }
  )
}
namespace boolean_ {
  export const is = (u: object): u is ZodBoolean => hasTypeName(u, ZodTag.ZodBoolean)
}

type number_ = never | ZodNumber
function number_
  (params?: number_.arguments): ZodNumber { return Z.number(params) }
declare namespace number_ {
  type arguments = never | (
    & {
      errorMap?: ZodErrorMap
      invalid_type_error?: string
      required_error?: string
      description?: string
    }
    & { coerce?: boolean }
  )
}
namespace number_ {
  export const is = (u: object): u is ZodNumber => hasTypeName(u, ZodTag.ZodNumber)
}

type bigint_ = never | ZodBigInt
function bigint_(params?: bigint_.arguments): ZodBigInt { return Z.bigint(params) }
declare namespace bigint_ {
  type arguments = never | (
    & {
      errorMap?: ZodErrorMap
      invalid_type_error?: string
      required_error?: string
      description?: string
    }
    & { coerce?: boolean }
  )
}
namespace bigint_ {
  export const is = (u: object): u is ZodBigInt => hasTypeName(u, ZodTag.ZodBigInt)
}

type string_ = never | ZodString
function string_
  (params?: string_.arguments): ZodString { return Z.string(params) }
namespace string_ {
  export const is = (u: object): u is ZodString => hasTypeName(u, ZodTag.ZodString)
}
declare namespace string_ {
  type arguments = never | (
    & {
      errorMap?: ZodErrorMap
      invalid_type_error?: string
      required_error?: string
      description?: string
    }
    & { coerce?: true }
  )
}

// <Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny>(keyType: Key, valueType: Value, params?: RawCreateParams) => ZodMap<Key, Value>

function map_<K extends z.any = z.any, V extends z.any = z.any>(keyType: K, valueType: V, params?: RawCreateParams): ZodMap<K, V> {
  return Z.map(keyType, valueType, params)
}
namespace map_ {
  export const is
    : (u: object) => u is ZodMap
    = (u): u is ZodMap => hasTypeName(u, ZodTag.ZodMap)
}

type null_ = never | ZodNull
function null_
  (params?: RawCreateParams): ZodNull { return Z.null(params) }
namespace null_ {
  export const is
    : any.typeguard<object, ZodNull>
    = (u): u is ZodNull => hasTypeName(u, ZodTag.ZodNull)
}

type undefined_ = never | ZodUndefined
function undefined_
  (params?: RawCreateParams): ZodUndefined { return Z.undefined(params) }
namespace undefined_ {
  export const is = (u: object): u is ZodUndefined => hasTypeName(u, ZodTag.ZodUndefined)
}

type unknown_ = never | ZodUnknown
function unknown_
  (params?: RawCreateParams) { return Z.unknown(params) }

namespace unknown_ {
  export const is
    : any.typeguard<object, ZodUnknown>
    = (u): u is ZodUnknown => hasTypeName(u, ZodTag.ZodUnknown)
}

type optional_<schema extends z.any = z.any> = ZodOptional<schema>
function optional_
  <S extends z.any>(type: S, params?: RawCreateParams): ZodOptional<S> { return Z.optional(type, params) }
declare namespace optional_ {
  type get<type extends z.optional> = type["_def"]["innerType"]
}
namespace optional_ {
  export const get: <T extends z.any>(t: ZodOptional<T>) => T = (xs) => xs._def.innerType
  export const is: <T extends z.any>(u: unknown) => u is ZodOptional<T> = (u): u is never =>
    hasTypeName(u, ZodTag.ZodOptional)
}

type tuple_<items extends z.any.items = z.any.items> = ZodTuple<items, null>
function tuple_
  <SS extends z.any.items>(schemas: SS, params?: RawCreateParams): z.tuple<SS> { return Z.tuple(schemas, params) }
namespace tuple_ {
  export const get: <T extends z.any.items>(t: ZodTuple<T>) => T = (xs) => xs._def.items
  export const is: <T extends z.any.items>(u: unknown) => u is ZodTuple<T> = (u): u is never =>
    hasTypeName(u, ZodTag.ZodTuple)
}

type record_<value extends z.any = z.any, key extends z.any.key = z.string> = ZodRecord<key, value>
function record_<V extends z.any>(valueType: V, params?: RawCreateParams): ZodRecord<ZodString, V>
function record_<K extends z.any.key, V extends z.any>(keySchema: K, valueType: V, params?: RawCreateParams): ZodRecord<K, V>
function record_(
  ...args:
    | [valueType: z.any, params?: RawCreateParams]
    | [keySchema: z.any.key, valueType: z.any, params?: RawCreateParams]
) {
  return (
    args.length === 1 ? Z.record(args[0])
      : args.length === 2 ? Z.record(args[0], args[1])
        : args.length === 3 ? Z.record(args[0], args[1], args[2])
          : fn.throw(args)
  )
}
declare namespace record_ {
  export { new_ as new }
  export type new_ = ZodRecord<ZodString, z.any>
  export type get<type extends z.record> = type["valueSchema"]["_type"]
  export type getIndex<type extends z.record> = type["keySchema"]["_type"]
  export type getEntries<type extends z.record>
    = [key: type["keySchema"]["_type"], value: type["valueSchema"]["_type"]]
}
namespace record_ {
  export const is
    : <V extends z.any, K extends z.any.key>(u: unknown) => u is z.record<V, K>
    = (u): u is never => hasTypeName(u, ZodTag.ZodRecord)
  export const get
    : <V extends z.any>(record: z.record<V, z.any.key>) => V
    = (record) => record.valueSchema
  export const getIndex
    : <K extends z.any.key>(record: z.record<z.any, K>) => K
    = (record) => record.keySchema
  export const getEntries
    : <V extends z.any, K extends z.any.key>(record: z.record<V, K>) => [key: K, value: V]
    = (record) => [record.keySchema, record.valueSchema]
}

type object_<shape extends z.any.shape = z.any.shape> = never | ZodObject<shape, "strip", z.any, object_.projectOut<shape>, object_.projectIn<shape>>
function object_<S extends z.any.shape>(shape: S, params?: RawCreateParams): object_<S>
function object_<S extends z.any.shape>(shape: S, params?: RawCreateParams) { return Z.object(shape, params) }
namespace object_ {
  export const get
    : <T extends { shape: z.any.shape }>(o: T) => T["shape"]
    = (o) => o.shape
  export const is
    : <T extends z.any.shape>(u: unknown) => u is ZodObject<T>
    = (u): u is never => hasTypeName(u, ZodTag.ZodObject)
}
declare namespace object_ {
  export type fromShape<shape extends z.any.shape> = never |
    ZodObject<shape, "strip", z.any, projectOut<shape>, projectIn<shape>>

  export { new_ as new }
  export type new_<node extends {}> = [node] extends [any.dict<z.any>] ? ZodObject<node> : never
  export type get<type extends z.object> = type["shape"]

  export type projectOut<shape extends any.dict<{ _output?: unknown }>> = evaluate<
    & { [k in keyof shape as undefined extends shape[k]["_output"] ? never : k]-?: shape[k]["_output"] }
    & { [k in keyof shape as undefined extends shape[k]["_output"] ? k : never]+?: shape[k]["_output"] }
  >
  export type projectIn<shape extends any.dict<{ _input?: unknown }>> = evaluate<
    & { [k in keyof shape as undefined extends shape[k]["_input"] ? never : k]-?: shape[k]["_input"] }
    & { [k in keyof shape as undefined extends shape[k]["_input"] ? k : never]+?: shape[k]["_input"] }
  >
}

type union_<members extends z.any.members = z.any.members> = never | ZodUnion<members>
function union_<S extends z.any.members>(types: S, params?: RawCreateParams): z.union<S> { return Z.union(types, params) }
declare namespace union_ {
  export { new_ as new }
  export type new_<
    fst extends z.any = z.any,
    snd extends z.any = z.any,
  // rest extends z.any.items = z.any.items,
  > = ZodUnion<[fst, snd, ...([] | mut.array<z.any>)]>
  export type get<type extends z.union> = type["options"]
}
namespace union_ {
  export const get
    : <S extends z.any.members>(schema: z.union<S>) => S
    = (schema) => schema.options

  export const is
    : <T extends z.any.members>(u: unknown) => u is z.union<T>
    = (u): u is never => hasTypeName(u, ZodTag.ZodUnion)
}

type literal_<primitive extends any.primitive = any.primitive> = never | ZodLiteral<primitive>
function literal_<V extends any.primitive>(value: V, params?: RawCreateParams): ZodLiteral<V> { return Z.literal(value, params) }
declare namespace literal_ {
  type get<type extends z.literal> = type["value"]
}
namespace literal_ {
  export const get
    : <V extends any.primitive>(schema: z.literal<V>) => V
    = (schema) => schema.value

  ///handlerMap[ZodTag.ZodLiteral].children
  export const is
    : <V extends string | number | boolean | null | undefined | bigint>(u: unknown) => u is ZodLiteral<V>
    = (u): u is never => hasTypeName(u, ZodTag.ZodLiteral)
}

type effect_<schema extends z.any = z.any> = ZodEffects<schema, schema["_output"], schema["_input"]>
function effect_
  <S extends z.any>(schema: S, effect: Effect<S["_output"]>, params?: RawCreateParams): ZodEffects<S, S["_output"], S["_input"]> { return Z.effect(schema, effect) }
declare namespace effect_ {
  type get<type extends z.effect> = type["_def"]["schema"]
}
namespace effect_ {
  export const get
    : <T extends z.any>(eff: ZodEffects<T>) => T
    = (eff) => eff._def.schema
  export const is
    : <T extends z.any>(u: unknown) => u is ZodEffects<T>
    = (u): u is never => hasTypeName(u, ZodTag.ZodEffects)
}

type issue<type extends Z.ZodIssue = Z.ZodIssue> = type
declare namespace issue {
  export { any_ as any }
  export type any_<type extends Z.ZodIssue = Z.ZodIssue> = type
}
namespace issue {
  export const schema = Z.object({
    code: Z.enum(object.keyset.nonempty(ZodIssueCode)),
    message: Z.string(),
    path: Z.array(Z.union([Z.string(), Z.number()])),
  })
  export const is = Guard.fromSchema(issue.schema)
}
declare namespace issues {
  export { any_ as any }
  export type any_<type extends any.array<Z.ZodIssue> = any.array<Z.ZodIssue>> = type
}
namespace issues {
  export const schema = Z.array(issue.schema)
  export const is = Guard.fromSchema(issues.schema)
}
namespace error {
  export const schema = Z.object({ issues: issues.schema })
  export const is = Guard.fromSchema(error.schema)
}

type tree =
  | z.primitive
  | { [x: string]: tree }

type primitive<
  type extends
  | ZodString
  | ZodNumber
  | ZodBoolean
  | ZodNull
  | ZodUndefined
  | ZodBigInt
  = ZodString
  | ZodNumber
  | ZodBoolean
  | ZodNull
  | ZodBigInt
  | ZodUndefined
> = type

function primitive() { }
namespace primitive {
  export const is = (u: object): u is z.any.primitive => hasTypeName(u, ...primitiveTypeNames)
}

////////////////////
/// interpreters ///
const typeof_ = (primitive: any.showable) => primitive === null ? "null" as const : ({
  boolean: "boolean",
  number: "number",
  string: "string",
  undefined: "null",
  bigint: "integer",
  symbol: fn.identity(primitive),
  object: fn.identity(primitive),
  function: fn.identity(primitive),
  // symbol: fn.throw("`jsonSchema.typeof` does not support symbols"),
  // object: fn.throw("`jsonSchema.typeof` does not support objects"),
  // function: fn.throw("`jsonSchema.typeof` does not support functions"),
} as const)[typeof primitive]

function jsonSchema() { }
declare namespace jsonSchema {
  export { typeof_ as typeof }
}
namespace jsonSchema {
  jsonSchema.typeof = typeof_
  export const zodLeafTags = [
    ZodTag.ZodString,
    ZodTag.ZodNumber,
    ZodTag.ZodBoolean,
    ZodTag.ZodNull,
  ] as const
  export const isZodLeafTag = array.includes(zodLeafTags)
  export const leafTags = [
    Tag.string,
    Tag.number,
    Tag.boolean,
    Tag.null,
  ] as const
  export const isLeafTag = array.includes(leafTags)
}

function toJsonSchema<S extends z.any>(schema: S): {} {
  const loop = fn.loop<z.any, {}>((s, loop) => {
    const typeName: ZodTag = getTypeName(s)
    const tag = adaptor[typeName]
    switch (true) {
      case jsonSchema.isLeafTag(tag): return { type: tag }
      case Tag.optional === tag && z.optional.is(s):
        return fn.pipe(
          z.optional.get(s),
          loop,
        )
      case Tag.literal === tag && z.literal.is(s):
        return fn.pipe(
          z.literal.get(s),
          (value) => ({ const: value, type: jsonSchema.typeof(value) })
        )
      case Tag.array === tag && z.array.is(s):
        return fn.pipe(
          z.array.get(s),
          loop,
          (items) => ({ items, type: Tag.array }),
        )
      case Tag.intersection === tag && isIntersection(s):
        return fn.pipe(
          getBoth(s),
          map(loop),
          (both) => ({ allOf: both })
        )
      case Tag.union === tag && z.union.is(s):
        return fn.pipe(
          z.union.get(s),
          map(loop),
          (options) => ({ anyOf: options }),
        )
      case Tag.tuple === tag && z.tuple.is(s):
        return fn.pipe(
          z.tuple.get(s),
          map(loop),
          (items) => ({ items, type: "array" }),
        )
      case Tag.object === tag && z.object.is(s):
        return fn.pipe(
          z.object.get(s),
          map(loop),
          (properties) => ({
            properties,
            type: Tag.object,
            required: object
              .keys(s.shape)
              .filter(k => z.typeName.get(s.shape[k]) !== ZodTag.ZodOptional)
          }),
        )
      default: return fn.throw("Schema type unsupported: ", { tag: tag, schema: s })
    }
  })
  return loop(schema)
}

type reify<T extends z.any> = mut<reify.go<T>>
declare namespace reify {
  type leaf<type extends z.any.primitive> = never | [z.adaptor[type["_def"]["typeName"]]]
  type go<type>
    = [type] extends [z.primitive] ? leaf<type>
    : [type] extends [z.unknown] ? [TAG: typeof Tag.unknown]
    : [type] extends [z.literal] ? [TAG: typeof Tag.literal, VALUE: z.literal.get<type>]
    : [type] extends [z.optional] ? [TAG: typeof Tag.optional, INNER_TYPE: go<z.optional.get<type>>]
    : [type] extends [z.array] ? [TAG: typeof Tag.array, ELEMENTS: go<z.array.get<type>>]
    : [type] extends [z.record] ? [TAG: typeof Tag.record, KEY: z.record.getIndex<type>, VALUE: go<z.record.get<type>>]
    : [type] extends [z.object] ? [TAG: typeof Tag.object, PROPERTIES: { [k in keyof type["shape"]]: go<type["shape"][k]> }]
    : [type] extends [z.intersection<infer left, infer right>] ? [TAG: typeof Tag.intersection, LEFT: go<left>, RIGHT: go<right>]
    : [type] extends [z.tuple<infer items>] ? [TAG: typeof Tag.tuple, ITEMS: { [ix in keyof items]: go<items[ix]> }]
    : [type] extends [z.union<[z.any<infer fst>, z.any<infer snd>, ...infer rest extends z.any[]]>]
    ? [fst, snd, ...rest] extends any.list<infer xs>
    ? [tag: typeof Tag.union, MEMBERS: { [ix in keyof xs]: go<xs[ix]> }]
    : never
    : [UNIMPLEMENTED: type]
    ;
}

function reify<const T extends z.any>(schema: T): reify<T>
function reify<const T extends z.any>(schema: T) {
  const go = fn.loop<z.any, unknown>((s, k) => {
    const typeName: ZodTag = getTypeName(s)
    const tag = adaptor[typeName]
    const wrap = (u: unknown) => [tag, u] as const
    switch (true) {
      case z.primitive.is(s): return [tag]
    }
    switch (tag) {
      case Tag.bigint: return [tag]
      case Tag.boolean: return [tag]
      case Tag.number: return [tag]
      case Tag.string: return [tag]
      case Tag.null: return [tag]
      case Tag.undefined: return [tag]
      case Tag.unknown: return [tag]
      case Tag.array:
        return !z.array.is(s) ? fn.throw("In `reify`, expected an array schema, got:", s) : fn.pipe(
          s.element,
          k,
          wrap,
        )
      case Tag.tuple:
        return !z.tuple.is(s) ? fn.throw("In `reify`, expected a tuple schema, got:", s) : fn.pipe(
          s.items,
          map(k),
          wrap,
        )
      case Tag.object:
        return !z.object.is(s) ? fn.throw("In `reify`, expected an object schema, got:", s) : fn.pipe(
          s.shape,
          map(k),
          wrap,
        )
      case Tag.union:
        return !z.union.is(s) ? fn.throw("In `reify`, expected a union schema, got:", s) : fn.pipe(
          s.options,
          map(k),
          wrap,
        )
      case Tag.intersection:
        return !isIntersection(s) ? fn.throw("In `reify`, expected an intersection schema, got:", s) : fn.pipe(
          [k(s._def.left), k(s._def.right)],
          wrap,
        )
      case Tag.literal:
        return !z.literal.is(s) ? fn.throw("In `reify`, expected a literal schema, got:", s) : fn.pipe(
          [Tag.literal, s.value]
        )
      default: return fn.throw(s)
    }
  })
  return go(schema)
}
