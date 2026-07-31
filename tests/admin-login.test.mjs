import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { pathToFileURL } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'

async function renderAdminLoginPage() {
  const sourcePath = path.join(process.cwd(), 'app', 'admin', 'login', 'page.tsx')
  const source = fs.readFileSync(sourcePath, 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: sourcePath,
  }).outputText.replace("import Image from 'next/image';", 'const Image = (props) => _jsx("img", props);')
  const tempDir = fs.mkdtempSync(path.join(process.cwd(), '.admin-login-test-'))
  const tempFile = path.join(tempDir, 'page.mjs')
  fs.writeFileSync(tempFile, output, 'utf8')
  try {
    const pageModule = await import(`${pathToFileURL(tempFile).href}?${Date.now()}`)
    return renderToStaticMarkup(await pageModule.default({ searchParams: Promise.resolve({}) }))
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
}

test('admin login submits to the customer-domain route handler', async () => {
  const previousAdminUrl = process.env.NEXT_PUBLIC_ADMIN_URL
  process.env.NEXT_PUBLIC_ADMIN_URL = 'https://admin.globle-trade.com'
  try {
    const html = await renderAdminLoginPage()
    const formTag = html.match(/<form\b[^>]*>/)?.[0] || ''
    assert.match(formTag, /action="\/api\/auth\/login"/)
    assert.match(formTag, /method="post"/)
  } finally {
    if (previousAdminUrl === undefined) delete process.env.NEXT_PUBLIC_ADMIN_URL
    else process.env.NEXT_PUBLIC_ADMIN_URL = previousAdminUrl
  }
})
