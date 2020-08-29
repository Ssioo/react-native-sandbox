import { Icon } from '@ui-kitten/components'
import React from 'react'

const genIcon = (
  name: string,
  pack: string = 'material',
  defaultStyle: object = {},
) => {
  return (props: any) => {
    const style = Array.isArray(props.style)
      ? [defaultStyle, ...props.style]
      : [defaultStyle, props.style]
    return <Icon name={name} pack={pack} style={style} />
  }
}

// https://oblador.github.io/react-native-vector-icons/
export const ArrowBackIcon = genIcon('arrow-back')
export const MenuIcon = genIcon('menu')
export const WorkIcon = genIcon('work')
export const CloseIcon = genIcon('close', 'material-comm')
export const InfoOutlineIcon = genIcon('info-outline')
