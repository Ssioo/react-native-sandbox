// https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-light-theme
// https://colors.eva.design/
// brand color: #B5D692
export const theme = {
  'color-primary-100': '#D6E4FF',
  'color-primary-200': '#ADC8FF',
  'color-primary-300': '#84A9FF',
  'color-primary-400': '#6690FF',
  'color-primary-500': '#3366FF', // 51,102,255
  'color-primary-600': '#254EDB',
  'color-primary-700': '#1939B7',
  'color-primary-800': '#102693',
  'color-primary-900': '#091A7A',
  'color-primary-transparent-100': 'rgba(51, 102, 255, 0.08)',
  'color-primary-transparent-200': 'rgba(51, 102, 255, 0.16)',
  'color-primary-transparent-300': 'rgba(51, 102, 255, 0.24)',
  'color-primary-transparent-400': 'rgba(51, 102, 255, 0.32)',
  'color-primary-transparent-500': 'rgba(51, 102, 255, 0.4)',
  'color-primary-transparent-600': 'rgba(51, 102, 255, 0.48)',
  'color-success-100': '#F4FDCE',
  'color-success-200': '#E8FB9F',
  'color-success-300': '#D3F36E',
  'color-success-400': '#BDE749',
  'color-success-500': '#9DD813',
  'color-success-600': '#80B90D',
  'color-success-700': '#669B09',
  'color-success-800': '#4E7D06',
  'color-success-900': '#3D6703',
  'color-success-transparent-100': 'rgba(157, 216, 19, 0.08)',
  'color-success-transparent-200': 'rgba(157, 216, 19, 0.16)',
  'color-success-transparent-300': 'rgba(157, 216, 19, 0.24)',
  'color-success-transparent-400': 'rgba(157, 216, 19, 0.32)',
  'color-success-transparent-500': 'rgba(157, 216, 19, 0.4)',
  'color-success-transparent-600': 'rgba(157, 216, 19, 0.48)',
  'color-info-100': '#D8FEF8',
  'color-info-200': '#B2FDF7',
  'color-info-300': '#8BFBFA',
  'color-info-400': '#6EEEF8',
  'color-info-500': '#3FD9F4',
  'color-info-600': '#2EACD1',
  'color-info-700': '#1F83AF',
  'color-info-800': '#145F8D',
  'color-info-900': '#0C4475',
  'color-info-transparent-100': 'rgba(63, 217, 244, 0.08)',
  'color-info-transparent-200': 'rgba(63, 217, 244, 0.16)',
  'color-info-transparent-300': 'rgba(63, 217, 244, 0.24)',
  'color-info-transparent-400': 'rgba(63, 217, 244, 0.32)',
  'color-info-transparent-500': 'rgba(63, 217, 244, 0.4)',
  'color-info-transparent-600': 'rgba(63, 217, 244, 0.48)',
  'color-warning-100': '#FFF5D9',
  'color-warning-200': '#FFE9B3',
  'color-warning-300': '#FFD98D',
  'color-warning-400': '#FFC971',
  'color-warning-500': '#FFB042',
  'color-warning-600': '#DB8C30',
  'color-warning-700': '#B76C21',
  'color-warning-800': '#934E15',
  'color-warning-900': '#7A390C',
  'color-warning-transparent-100': 'rgba(255, 176, 66, 0.08)',
  'color-warning-transparent-200': 'rgba(255, 176, 66, 0.16)',
  'color-warning-transparent-300': 'rgba(255, 176, 66, 0.24)',
  'color-warning-transparent-400': 'rgba(255, 176, 66, 0.32)',
  'color-warning-transparent-500': 'rgba(255, 176, 66, 0.4)',
  'color-warning-transparent-600': 'rgba(255, 176, 66, 0.48)',
  'color-danger-100': '#FFE5D4',
  'color-danger-200': '#FFC5AA',
  'color-danger-300': '#FF9E7F',
  'color-danger-400': '#FF7960',
  'color-danger-500': '#FF3C2B',
  'color-danger-600': '#DB1F1F',
  'color-danger-700': '#B71523',
  'color-danger-800': '#930D24',
  'color-danger-900': '#7A0824',
  'color-danger-transparent-100': 'rgba(255, 60, 43, 0.08)',
  'color-danger-transparent-200': 'rgba(255, 60, 43, 0.16)',
  'color-danger-transparent-300': 'rgba(255, 60, 43, 0.24)',
  'color-danger-transparent-400': 'rgba(255, 60, 43, 0.32)',
  'color-danger-transparent-500': 'rgba(255, 60, 43, 0.4)',
  'color-danger-transparent-600': 'rgba(255, 60, 43, 0.48)',
}

export const PRIMARY_COLOR = theme['color-primary-500']

// the mapping doesn't seem to support live reload
// you need to reload manually to confirm the effect
// https://akveo.github.io/react-native-ui-kitten/docs/guides/branding#typography
// https://akveo.github.io/react-native-ui-kitten/docs/design-system/customize-mapping
// https://github.com/eva-design/eva/blob/master/packages/eva/mapping.json
export const mapping = {
  strict: {
    'text-font-family': 'NotoSansKR-Regular',
  },
  components: {
    TopNavigation: {
      meta: {},
      appearances: {
        default: {
          mapping: {
            titleFontFamily: 'NotoSansKR-Bold',
            minHeight: 44,
          },
        },
      },
    },
    Card: {
      appearances: {
        outline: {
          mapping: {
            bodyPaddingHorizontal: 16,
          },
        },
      },
    },
  },
}
