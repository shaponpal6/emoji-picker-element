import { readFile } from './fs.js'
import { replaceInReadme } from './replaceInReadme.js'

const START_MARKER = '<!-- i18n options start -->'
const END_MARKER = '<!-- i18n options end -->'

// Take the current English i18n object and inject it into the README
async function main () {
  const i18n = JSON.parse(await readFile('./src/picker/i18n/en.json', 'utf8'))
  const sortedI18n = Object.fromEntries(Object.entries(i18n).sort((a, b) => a[0] < b[0] ? -1 : 1))
  const replacement = '```json\n' + JSON.stringify(sortedI18n, null, 2) + '\n```'
  await replaceInReadme(START_MARKER, END_MARKER, replacement)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
