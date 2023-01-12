const Checkbox = {
  baseStyle: {
    control: {
      borderColor: 'blackAlpha.600',
      _checked: {
        bg: 'primary.500',
        borderColor: 'primary.500',
        _hover: { bg: 'primary.500', borderColor: 'primary.500' },
      },
      _indeterminate: {
        bg: 'primary.500',
        borderColor: 'primary.500',
      },
    },
  },
}

export default Checkbox
