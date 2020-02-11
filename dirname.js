import path from 'path'
import url from 'url'

// see https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default __dirname
