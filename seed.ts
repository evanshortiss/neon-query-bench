import { seed } from './src/index'

seed()
  .then(() => {
    console.log('Seed operation complete')
  })
  .catch((err) => {
    console.error('Seed operation failed')
    console.error(err)
  })
