import { array, fn, object } from "./util.js"
import { toJsonSchema } from "./toJsonSchema.js"
import { reify } from "./reify.js"

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
  symbol,
  addIssueToContext,
  // any,
  coerce,
  custom,
  date,
  defaultErrorMap,
  getErrorMap,
  getParsedType,
  isAborted,
  isAsync,
  isDirty,
  isValid,
  late,
  lazy,
  makeIssue,
  nan,
  nativeEnum,
  never,
  nullable,
  objectUtil,
  oboolean,
  onumber,
  ostring,
  pipeline,
  preprocess,
  promise,
  quotelessJson,
  set,
  setErrorMap,
  strictObject,
  // string,
  transformer,
  util,
  z as Z,
} from "zod"

import type { any, mut, nonempty, some } from "any-ts"

export { z }

const Tags = array.let(
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

const Tag = object.fromKeys(Tags)
//    ^?
type Tag = typeof Tag[keyof typeof Tag]
//    ^?

export { Tag as ZodlessTag }

type ZodTag = typeof ZodTag[keyof typeof ZodTag]
//    ^?
const ZodTag = ZodFirstPartyTypeKind
//    ^?

type zodKindByType = typeof zodKindByType
//    ^?
const zodKindByType = {
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

const adaptor = object.invert(zodKindByType)
//    ^?
type adaptor = typeof adaptor
//    ^?

type intersection_<left extends z.any = z.any, right extends z.any = z.any> = never | ZodIntersection<left, right>
declare namespace intersection_ {
  export type get<type extends z.intersection> = [left: type["_def"]["left"], right: type["_def"]["right"]]
  export type getLeft<type extends z.intersection> = type["_def"]["left"]
  export type getRight<type extends z.intersection> = type["_def"]["right"]
}
function intersection_
  <L extends z.any, R extends z.any>(left: L, right: R, params?: RawCreateParams)
  : z.intersection<L, R> { return Z.intersection(left, right, params) }
namespace intersection_ {
  export const is
    : <L extends z.any, R extends z.any>(u: unknown) => u is z.intersection<L, R>
    = (u): u is never => hasTypeName(u, ZodTag.ZodIntersection)
    ;
  export const get
    : <L extends z.any, R extends z.any>(schema: z.intersection<L, R>) => [left: L, right: R]
    = (schema) => [schema._def.left, schema._def.right]
    ;
  export const getLeft
    : <L extends z.any, R extends z.any>(schema: z.intersection<L, R>) => L
    = (schema) => schema._def.left
    ;
  export const getRight
    : <R extends z.any, L extends z.any>(schema: z.intersection<L, R>) => R
    = (schema) => schema._def.right
    ;
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
    typeName,
    toJsonSchema,
    reify,
    ZodTag as tag,
  }

  export {
    any_ as any,
    array_ as array,
    bigint_ as bigint,
    boolean_ as boolean,
    discriminatedUnion_ as discriminatedUnion,
    discriminatedUnion_ as disjoint,
    effect_ as effect,
    enum_ as enum,
    function_ as function,
    instanceof_ as instanceof,
    intersection_ as intersection,
    literal_ as literal,
    map_ as map,
    number_ as number,
    null_ as null,
    object_ as object,
    optional_ as optional,
    readonly_ as readonly,
    record_ as record,
    string_ as string,
    symbol_ as symbol,
    tuple_ as tuple,
    undefined_ as undefined,
    union_ as union,
    unknown_ as unknown,
    void_ as void,
  }

  export {
    addIssueToContext,
    coerce,
    /** TODO: wrap `z.custom` */
    custom,
    /** TODO: wrap `z.lazy` */
    date,
    defaultErrorMap,
    deoptional,
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
    /** TODO: wrap `z.lazy` */
    lazy,
    makeIssue,
    mergeTypes,
    nan,
    /** TODO: wrap `z.lazy` */
    nativeEnum,
    /** TODO: wrap `z.lazy` */
    never,
    noUnrecognized,
    /** TODO: wrap `z.nullable` */
    nullable,
    objectInputType,
    objectOutputType,
    objectUtil,
    /** TODO: wrap `z.oboolean` */
    oboolean,
    /** TODO: wrap `z.onumber` */
    onumber,
    /** TODO: wrap `z.ostring` */
    ostring,
    output,
    /** TODO: wrap `z.pipeline` */
    pipeline,
    preprocess,
    /** TODO: wrap `z.promise` */
    promise,
    quotelessJson,
    /** TODO: wrap `z.set` */
    set,
    setErrorMap,
    strictObject,
    transformer,
    typeToFlattenedError,
    typecast,
    util,
    ParseStatus,
    Schema,
    ZodBranded,
    ZodCatch,
    ZodDate,
    ZodDefault,
    ZodFunction,
    ZodLazy,
    ZodNaN,
    ZodNativeEnum,
    ZodNever,
    ZodNullable,
    ZodParsedType,
    ZodPipeline,
    ZodPromise,
  }
}

function z() { }
namespace z {
  /** TODO: write `toJsonSchema` handler for `z.any` */
  z.any = any_
  z.array = array_
  z.boolean = boolean_
  z.bigint = bigint_
  z.date = date_
  z.discriminatedUnion = discriminatedUnion_
  z.disjoint = discriminatedUnion_
  z.effect = effect_
  /** TODO: write `toJsonSchema` handler for `z.enum` */
  z.enum = enum_
  z.function = function_
  z.intersection = intersection_
  z.instanceof = instanceof_
  z.literal = literal_
  z.map = map_
  z.null = null_
  z.number = number_
  z.object = object_
  z.optional = optional_
  z.readonly = readonly_
  z.record = record_
  z.string = string_
  z.tuple = tuple_
  z.undefined = undefined_
  z.union = union_
  z.symbol = symbol_
  z.void = void_
  /** TODO: write `toJsonSchema` handler for `z.unknown` */
  z.unknown = unknown_

  // custom helpers, schemas, etc.
  z.tag = ZodTag
  z.typeName = typeName
  z.issue = issue
  z.issues = issues
  z.error = error
  z.adaptor = adaptor
  z.primitive = primitive
  /// interpreters
  z.toJsonSchema = toJsonSchema
  z.reify = reify

  z.addIssueToContext = addIssueToContext
  z.coerce = coerce
  z.custom = custom
  z.defaultErrorMap = defaultErrorMap
  z.getErrorMap = getErrorMap
  z.getParsedType = getParsedType
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
  export type shape<type extends ZodRawShape = ZodRawShape> = type
  export type key<type extends KeySchema = KeySchema> = type
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

  export type leaf<type extends z.primitive | z.tuple<[]> | z.object<{}> = z.primitive | z.tuple<[]> | z.object<{}>> = type

  export type set<
    discriminator extends string = string,
    type extends
    | nonempty.mut.array<Z.ZodDiscriminatedUnionOption<discriminator>>
    = nonempty.mut.array<Z.ZodDiscriminatedUnionOption<discriminator>>
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
}

type hasTypeName<typeName extends z.tag = z.tag> = never | { _def: { typeName: typeName } }
function hasTypeName(u: unknown): u is hasTypeName
function hasTypeName<name extends string>(u: unknown, typeName: name): u is hasTypeName<name & z.tag>
function hasTypeName<const names extends any.strings>(
  u: unknown,
  ...typeNames: names
): u is hasTypeName<names[number] & z.tag>
// impl.
function hasTypeName(u: unknown, ...typeNames: any.strings): u is never {
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
  : <T extends z.tag>(schema: hasTypeName<T>) => T
  = (schema) => schema._def.typeName

const softGetTypeName
  : (u: unknown) => string | undefined
  = (u) => typeof u === "object" && u !== null
    ? (hasTypeName(u) ? getTypeName(u) : void 0)
    : void 0

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

namespace enum_ {
  export const is
    : <T extends nonempty.mut.array<string>>(u: unknown) => u is ZodEnum<T>
    = (u): u is never => hasTypeName(u, ZodTag.ZodEnum)
}

type void_ = never | ZodVoid
function void_(params?: RawCreateParams) { return Z.void(params) }
namespace void_ {
  export const is
    : any.typeguard<unknown, ZodVoid>
    = (u): u is never => hasTypeName(u, ZodTag.ZodVoid)
}

type symbol_ = never | ZodSymbol
function symbol_(params?: RawCreateParams) { return Z.symbol(params) }
namespace symbol_ {
  export const is
    : any.typeguard<unknown, ZodSymbol>
    = (u): u is never => hasTypeName(u, ZodTag.ZodSymbol)
}

type date_ = never | ZodDate
function date_(params?: RawCreateParams) { return Z.date(params) }
declare namespace date_ {
  export type arguments = never | (
    & {
      errorMap?: ZodErrorMap
      invalid_type_error?: string
      required_error?: string
      message?: string
      description?: string
    }
    & { coerce?: boolean }
  )
}
namespace date_ {
  export const is
    : any.typeguard<unknown, ZodSymbol>
    = (u): u is never => hasTypeName(u, ZodTag.ZodDate)
}

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

type map_ = never | ZodMap
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
function optional_<S extends z.any>(type: S, params?: RawCreateParams): ZodOptional<S> { return Z.optional(type, params) }
declare namespace optional_ {
  type get<type extends z.optional> = type["_def"]["innerType"]
}
namespace optional_ {
  export const get: <T extends z.any>(t: ZodOptional<T>) => T = (xs) => xs._def.innerType
  export const is: <T extends z.any>(u: unknown) => u is ZodOptional<T> = (u): u is never =>
    hasTypeName(u, ZodTag.ZodOptional)
}

type readonly_<schema extends z.any = z.any> = ZodReadonly<schema>
function readonly_<S extends z.any>(type: S): ZodReadonly<S> { return type.readonly() }
declare namespace readonly_ {
  type get<type extends z.readonly> = type["_def"]["innerType"]
}
namespace readonly_ {
  export const get
    : <T extends z.any>(type: z.readonly<T>) => T
    = (type) => type._def.innerType
  export const is
    : <T extends z.any>(u: unknown) => u is z.readonly<T>
    = (u): u is never => hasTypeName(u, ZodTag.ZodReadonly)
}

type tuple_<items extends z.any.items = z.any.items> = ZodTuple<items, null>
function tuple_
  <S extends z.any.items>(schemas: S, params?: RawCreateParams): z.tuple<S> { return Z.tuple(schemas, params) }
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
  export { any_ as any }
  export type any_ = ZodRecord<z.any.key, z.any>
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
    : <T extends z.any.shape, excess extends UnknownKeysParam, catchall extends z.any>(u: unknown) => u is ZodObject<T, excess, catchall>
    = (u): u is never => hasTypeName(u, ZodTag.ZodObject)
}
declare namespace object_ {
  export type fromShape<shape extends z.any.shape> = never |
    ZodObject<shape, "strip", z.any, projectOut<shape>, projectIn<shape>>

  export { any_ as any }
  export type any_ = ZodObject<z.any.shape, UnknownKeysParam, z.any, {}, {}>

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

type discriminatedUnion_<
  discriminator extends string = string,
  set extends z.any.set<discriminator> = z.any.set<discriminator>
> = never | ZodDiscriminatedUnion<discriminator, set>
function discriminatedUnion_
  <D extends string, Set extends z.any.set<D>>(discriminator: D, options: Set, params?: RawCreateParams) { return Z.discriminatedUnion(discriminator, options, params) }
declare namespace discriminatedUnion_ {
  type get<type extends z.discriminatedUnion<disc>, disc extends string = string> = type["_def"]["options"]
  type getDiscriminator<type extends z.discriminatedUnion> = type["_def"]["discriminator"]
  /** TODO: does it make sense to support `z.discriminatedUnion.getMap`? */
  // type getMap<type extends z.discriminatedUnion<disc>, disc extends string = string> = type["_def"]["optionsMap"]
}
namespace discriminatedUnion_ {
  export const get
    : <D extends string, S extends z.any.set<D>>(schema: z.discriminatedUnion<D, S>) => S
    = (schema) => schema._def.options
  export const getDiscriminator
    : <D extends string, S extends z.any.set<D>>(schema: z.discriminatedUnion<D, S>) => D
    = (schema) => schema._def.discriminator
  export const is
    : <D extends string, S extends z.any.set<D>>(u: unknown) => u is z.discriminatedUnion<D, S>
    = (u): u is never => hasTypeName(u, ZodTag.ZodDiscriminatedUnion)
  /** TODO: does it make sense to support `z.discriminatedUnion.getMap`? */
  // export const getMap
  //   : <D extends string, S extends z.any.set<D>>(schema: z.discriminatedUnion<D, S>) => S
  //   = (schema) => schema._def.optionsMap
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

  export const is
    : <V extends string | number | boolean | null | undefined | bigint>(u: unknown) => u is ZodLiteral<V>
    = (u): u is never => hasTypeName(u, ZodTag.ZodLiteral)
}

interface CustomParams extends CustomErrorParams { fatal?: boolean }

type instanceof_<T extends some.class<any>> = ZodType<globalThis.InstanceType<T>, ZodTypeDef, globalThis.InstanceType<T>>
function instanceof_<T extends some.class<any>>(class_: T, params?: CustomParams) { return Z.instanceof(class_, params) }
// namespace instanceof_ {
/** TODO: is there a way to write a typeguard for `z.instanceof`? without a tag, will require some creativity */
// export const is
// }

type function_ = typeof Z.function
function function_(): ZodFunction<ZodTuple<[], ZodUnknown>, ZodUnknown>
function function_<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>>(args: T): ZodFunction<T, ZodUnknown>
function function_<T extends AnyZodTuple, U extends ZodTypeAny>(args: T, returns: U): ZodFunction<T, U>
function function_<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>, U extends ZodTypeAny = ZodUnknown>(args: T, returns: U, params?: RawCreateParams): ZodFunction<T, U>
function function_(
  ...args:
    | []
    | [args: ZodTuple<[], ZodUnknown>]
    | [args: z.any.tuple, returns: z.any, params?: RawCreateParams]
): unknown {
  return args.length === 0 ? Z.function()
    : args.length === 1 ? Z.function(...args)
      : Z.function(...args)
}
declare namespace function_ {
  export { any_ as any }
  export type any_ = Z.ZodFunction<ZodTuple<any, any>, z.any>
}
namespace function_ {
  export const is
    : <I extends ZodTuple<any, any>, O extends z.any>(u: unknown) => u is ZodFunction<I, O>
    = (u): u is never => hasTypeName(u, ZodTag.ZodFunction)
    ;
  export const get
    : <I extends ZodTuple<any, any>, O extends z.any>(schema: ZodFunction<I, O>) => [args: I, returns: O]
    = (schema) => [schema._def.args, schema._def.returns]
    ;
  export const getArguments
    : <I extends ZodTuple<any, any>>(schema: ZodFunction<I, z.any>) => I
    = (schema) => schema._def.args
    ;
  export const getReturn
    : <O extends z.any>(schema: ZodFunction<any, O>) => O
    = (schema) => schema._def.returns
    ;
}

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

function primitive(params?: RawCreateParams) { return Z.union([Z.string(), Z.number(), Z.boolean(), Z.null(), Z.undefined(), Z.bigint()], params) }
namespace primitive {
  export const is = (u: unknown): u is z.primitive => hasTypeName(u, ...primitiveTypeNames)
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
