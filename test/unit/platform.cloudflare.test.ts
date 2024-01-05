import assert from "assert"
import { before, describe, it } from "node:test"
import { getPlatformUtils } from "../../src/platform"

describe('getPlatformUtils (cloudflare)', () => {
  /**
   * I'll end up in JavaScript jail for this, but it works ¯\_(ツ)_/¯
   * 
   * The reason it's in a separate file is because each file is execueted as
   * a Node.js child process. We can mess with globals here without affecting
   * other test cases in other files.
   */
  before(() => {
    delete (global as any).process

    global.WebSocketPair = {}
    global.cache = {
      default: {}
    }
  })

  it('should detect cloudflare', () => {
    const utils = getPlatformUtils({})
    assert(utils.getPlatformName() === 'cloudflare')
  })
})
