import { z } from "../src/schema"
import * as vi from "vitest"

vi.describe("z", () => {
  const input = z.object({ abc: z.union([z.number(), z.literal("xyz")]), def: z.array(z.unknown()) })

  vi.describe("z.reify", () => {
    const expected = ["object", {
      abc: ["union", [["number"], ["literal", "xyz"]]],
      def: ["array", ["unknown"]]
    }] as const
    const actual = z.reify(input)

    vi.it("reifies", () => {
      vi.assert.deepEqual(expected, actual)
      vi.assertType<z.reify<typeof input>>(actual)
    })
  })

  vi.describe("z.toJsonSchema", () => {
    vi.it("handles primitive schemas", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.string()),
        { type: "string" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.number()),
        { type: "number" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.boolean()),
        { type: "boolean" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.null()),
        { type: "null" }
      )
    })

    vi.it("handles literal schemas", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.literal(123)),
        { type: "number", const: 123 }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.literal(null)),
        { type: "null", const: null }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.literal(undefined)),
        { type: "null", const: undefined }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.literal(false)),
        { type: "boolean", const: false }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.literal("hey")),
        { type: "string", const: "hey" }
      )
    })

    vi.it("handles array schemas", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.array(z.null())),
        { type: "array", items: { type: "null" } },
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.array(z.string())),
        { type: "array", items: { type: "string" } },
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.array(z.number())),
        { type: "array", items: { type: "number" } },
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.array(z.boolean())),
        { type: "array", items: { type: "boolean" } },
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.array(z.boolean())),
        { type: "array", items: { type: "boolean" } },
      )

      vi.assert.deepEqual(
        z.toJsonSchema(z.array(z.union([z.boolean(), z.number()]))),
        { type: "array", items: { anyOf: [{ type: "boolean" }, { type: "number" }] } },
      )
    })

    vi.it("handles object schemas", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.tuple([z.string()])),
        { type: "array", items: [{ type: "string" }] }
      )
    })

    vi.it("handles optional properties", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.object({ abc: z.string() })),
        { type: "object", required: ["abc"], properties: { abc: { type: "string" } } }
      )
    })

    vi.it("handles schemas with optional properties", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.object({ abc: z.ostring(), def: z.string() })),
        {
          type: "object",
          required: ["def"],
          properties: {
            abc: { type: "string" },
            def: { type: "string" },
          }
        }
      )
    })

    vi.it("handles intersections", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(
          z.object({ abc: z.string(), def: z.string() }).and(
            z.object({ ghi: z.boolean(), jkl: z.literal(0) })
          )
        ),
        {
          allOf: [
            {
              type: 'object',
              required: ["abc", "def"],
              properties: {
                abc: { type: "string" },
                def: { type: "string" },
              },
            },
            {
              type: 'object',
              required: ["ghi", "jkl"],
              properties: {
                ghi: { type: "boolean" },
                jkl: { type: "number", const: 0 },
              },
            }
          ]
        }
      )

      vi.assert.deepEqual(
        z.toJsonSchema(
          z.object({ abc: z.ostring(), def: z.string() }).and(
            z.object({ ghi: z.boolean(), jkl: z.literal(0).optional() })
          )
        ),
        {
          allOf: [
            {
              type: 'object',
              required: ["def"],
              properties: {
                abc: { type: "string" },
                def: { type: "string" },
              },
            },
            {
              type: 'object',
              required: ["ghi"],
              properties: {
                ghi: { type: "boolean" },
                jkl: { type: "number", const: 0 },
              },
            }
          ]
        }
      )

      vi.assert.deepEqual(
        z.toJsonSchema(
          z.intersection(
            z.object({ abc: z.string(), def: z.string() }),
            z.object({ ghi: z.boolean(), jkl: z.literal(0) }),
          )
        ),
        z.toJsonSchema(
          z.object({ abc: z.string(), def: z.string() }).and(
            z.object({ ghi: z.boolean(), jkl: z.literal(0) })
          )
        )
      )
    })

    vi.it("handles unions", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(
          z.union([
            z.number(),
            z.string(),
          ])
        ),
        { anyOf: [{ type: "number" }, { type: "string" }] },
      )

      vi.assert.deepEqual(
        z.toJsonSchema(
          z.union([
            z.object({ a: z.number(), b: z.ostring(), c: z.array(z.literal(1)) }),
            z.object({ d: z.string() }),
            z.array(z.literal(3)),
          ])
        ),
        {
          anyOf: [
            {
              type: 'object',
              required: ["a", "c"],
              properties: {
                a: { type: "number" },
                b: { type: "string" },
                c: {
                  type: "array",
                  items: { type: "number", const: 1 }
                }
              },
            },
            {
              type: 'object',
              required: ["d"],
              properties: { d: { type: "string" } },
            },
            {
              type: 'array',
              items: { type: "number", const: 3 },
            }
          ]
        }
      )
    })

    vi.it("handles disjoint unions", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(
          z.disjoint("type", [
            z.object({ type: z.literal("abc"), ghi: z.number() }),
            z.object({ type: z.literal("def"), jkl: z.string() }),
          ])
        ),
        {
          oneOf: [
            {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  const: "abc"
                },
                ghi: { type: "number" },
              },
              required: [
                "type",
                "ghi",
              ],
            },
            {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  const: "def"
                },
                jkl: { type: "string" },
              },
              required: [
                "type",
                "jkl",
              ],
            }
          ]
        }
      )

      vi.assert.deepEqual(
        z.toJsonSchema(
          z.union([
            z.object({ a: z.number(), b: z.ostring(), c: z.array(z.literal(1)) }),
            z.object({ d: z.string() }),
            z.array(z.literal(3)),
          ])
        ),
        {
          anyOf: [
            {
              type: 'object',
              required: ["a", "c"],
              properties: {
                a: { type: "number" },
                b: { type: "string" },
                c: {
                  type: "array",
                  items: { type: "number", const: 1 }
                }
              },
            },
            {
              type: 'object',
              required: ["d"],
              properties: { d: { type: "string" } },
            },
            {
              type: 'array',
              items: { type: "number", const: 3 },
            }
          ]
        }
      )
    })

    vi.it("handles string formats", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().email()),
        { format: "email", type: "string" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().ip()),
        { type: "string", format: "ipv4" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().ip({ version: "v4" })),
        { type: "string", format: "ipv4" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().ip({ version: "v6" })),
        { type: "string", format: "ipv6" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().date()),
        { type: "string", format: "date" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().datetime()),
        { type: "string", format: "date-time" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().time()),
        { type: "string", format: "time" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().url()),
        { type: "string", format: "uri" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().duration()),
        { type: "string", format: "duration" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().min(1)),
        { type: "string", minLength: 1 }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().max(10)),
        { type: "string", maxLength: 10 }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().min(1).max(10)),
        { type: "string", minLength: 1, maxLength: 10 }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.string().uuid()),
        { type: "string", format: "uuid" }
      )
    })

    vi.it("handles number formats", () => {
      vi.assert.deepEqual(
        z.toJsonSchema(z.number().max(100)),
        { maximum: 100, type: "number" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.number().min(1)),
        { minimum: 1, type: "number" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.number().multipleOf(2)),
        { type: "number", multipleOf: 2 }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.number().int()),
        { type: "integer" }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.number().int().max(100_000)),
        { type: "integer", maximum: 100_000 }
      )
      vi.assert.deepEqual(
        z.toJsonSchema(z.number().int().min(-200_000).max(100_000)),
        { type: "integer", minimum: -200_000, maximum: 100_000 }
      )
    })

  })

})
