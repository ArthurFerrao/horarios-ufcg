import { extendTheme } from '@chakra-ui/react'

import colors from './colors'
import Checkbox from './components/checkbox'

const theme = extendTheme({
  colors,
  components: { Checkbox },
})

export default theme
