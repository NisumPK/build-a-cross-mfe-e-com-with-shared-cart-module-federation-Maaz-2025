import { spawn } from 'node:child_process'

const command = process.argv[2]
const supportedCommands = new Set(['dev', 'preview'])

if (!supportedCommands.has(command)) {
  console.error(`Usage: node scripts/run-all.mjs <${[...supportedCommands].join('|')}>`)
  process.exit(1)
}

const workspaces = ['@mfe/catalog', '@mfe/cart', '@mfe/host']
const children = workspaces.map((workspace) => {
  const child = spawn('npm', ['run', command, '--workspace', workspace], {
    env: process.env,
    stdio: 'inherit',
  })

  child.on('error', (error) => {
    console.error(`[${workspace}] failed to start:`, error.message)
  })

  return child
})

let shuttingDown = false
let requestedExitCode = 0

const stopAll = (signal = 'SIGTERM') => {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) {
    if (!child.killed) child.kill(signal)
  }
}

process.on('SIGINT', () => {
  requestedExitCode = 0
  stopAll('SIGINT')
})
process.on('SIGTERM', () => {
  requestedExitCode = 0
  stopAll('SIGTERM')
})

await Promise.all(
  children.map(
    (child) =>
      new Promise((resolve) => {
        child.on('exit', (code, signal) => {
          if (!shuttingDown) {
            requestedExitCode = signal ? 1 : (code ?? 1)
            stopAll()
          }
          resolve()
        })
      }),
  ),
)

process.exitCode = requestedExitCode
