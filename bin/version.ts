import * as FileSystem from "node:fs"
import * as Path from "node:path"
import * as OS from "node:os"

import { $ } from "./cli.js"

function log(...args: readonly unknown[]) {
  console.log()
  console.log(`\t✨`, ...args)
}

namespace log {
  export const error = (taskName: string, ...args: readonly unknown[]) => {
    console.log()
    console.error(`🚫\t`, `Execution failed with message:\n ❌\t${taskName}`)
    if (args.length > 0) console.info(`🫥\t`, `Additional context:`, ...args)
  }

  export const thenDie = (taskName: string, ...args: readonly unknown[]) => {
    log.error(taskName, ...args)
    return process.exit(1)
  }
}

function run<fns extends readonly (() => unknown)[]>(...fns: fns): { [ix in keyof fns]: globalThis.ReturnType<fns[ix]> }
function run(...fns: (() => unknown)[]) { return fns.map(fn => fn()) }

const versionFile = Path.join(Path.resolve(), "src", "version.ts")
console.log("\nversionFile", versionFile)

declare namespace Cause {
  interface PathNotFound<path extends string = string> {
    readonly tag: "PathNotFound";
    readonly message: `Path not found, received: \`${path}\`` | `Path not found`
  }
}
namespace Cause {
  export const PathNotFound = (path: unknown): PathNotFound => ({
    tag: "PathNotFound",
    message: typeof path === "string" ? `Path not found, received: \`${path}\`` : `Path not found`
  })
}

function readFile(filepath: string): string | Cause.PathNotFound {
  try { return FileSystem.readFileSync(filepath).toString("utf-8") }
  catch (err) { return Cause.PathNotFound(err) }
}

function writeFile(filepath: string): (contents: string) => void | Cause.PathNotFound {
  return (contents) => {
    try { return FileSystem.writeFileSync(filepath, contents) }
    catch (err) { return Cause.PathNotFound(err) }
  }
}

const hasVersion
  = (u: unknown): u is globalThis.NonNullable<{ version: string }> =>
    u !== null &&
    typeof u === "object" &&
    "version" in u &&
    typeof u.version === "string"
  ;

const readPackageVersion = (): string => {
  const manifest = readFile(Path.join(Path.resolve(), "package.json"))
  if (typeof manifest === "object") throw ["Expected manifest to be a string", manifest]
  const json: {} | null | undefined = JSON.parse(manifest)
  if (hasVersion(json)) return json.version
  else throw ["Expected manifest to have a version", json]
}

const versionTemplate: (version: string) => string
  = (version) => [
    `export const ZODLESS_VERSION = "${version}" as const`,
    `export type ZODLESS_VERSION = typeof ZODLESS_VERSION`,
  ].join(OS.EOL)

/**
 * Reads the package version from `package.json` and writes it as
 * a value to `src/version.ts`.
 * 
 * This function is called by the script that publishes the package,
 * and makes sure that the `ZODLESS_VERSION` identifier that ships
 * with `zodless` stays up to date with the actual version that's 
 * published.
 */
const writeVersion = (v: string): void => {
  return void (v && v.length > 0 && writeFile(versionFile)(versionTemplate(v)))
}

function commitWorktree(version: string): void {
  return void run(
    $.exec(`git add -A`),
    $.exec(`git commit -m "bump: v${version}"`),
  )
}

function checkCleanWorktree(): void {
  // return void 
  try {
    run(
      $.exec(`git add --all`),
      $.exec(`git diff-index --exit-code HEAD`),
    )
  } catch (e) {
    log.thenDie(`Failure: unclean worktree -- commit or discard your changes before attempting to version package`)
  }
}

function commitVersion(version: string) {
  run($.exec(`git add src/version.ts && git commit -m "automated: writes version ${version} to 'src/version.ts'"`))
}

const main = () => {
  const prev = readPackageVersion()

  run(
    checkCleanWorktree,
    // $.exec(`pnpm run changes`),
    $.exec(`pnpm changeset version`),
  )

  const next = readPackageVersion()

  if (prev === next) {
    log.error(`No version change detected`)
    log.thenDie(`Compared previous version (\`v${prev}\`) with the current version (\`v${next}\`)`)
  }

  else {
    log(`Writing package version \`v${next}\` to:${OS.EOL}\t${versionFile}`)
    writeVersion(next)

    log(`Committing with changes to ${versionFile}`)
    commitWorktree(next)

    log(`kicking off build script`)
    try { run($.exec(`pnpm run build`)) }
    catch (e) { log.thenDie(`pnpm build`, e) }

    log(`Done! Run ${OS.EOL}${OS.EOL}\tpnpm publish${OS.EOL}${OS.EOL}to push things to npm.`)
  }
}

run(main)
