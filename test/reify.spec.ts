import { reify } from "../src/reify.js"
import { z } from "../src/schema.js"
import * as vi from "vitest"

vi.describe("reify", () => {
  const input = z.object({ abc: z.union([z.number(), z.literal("xyz")]), def: z.array(z.unknown()) })

  vi.it("reifies", () => {
    vi.describe("reify", () => {
      const expected = ["object", {
        abc: ["union", [["number"], ["literal", "xyz"]]],
        def: ["array", ["unknown"]]
      }] as const
      const actual = reify(input)

      vi.it("reifies", () => {
        vi.assert.deepEqual(expected, actual)
        vi.assertType<reify<typeof input>>(actual)
      })
    })

  })

})
