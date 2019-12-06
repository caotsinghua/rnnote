import React from 'react'
import { Input, InputProps } from 'react-native-elements'
import styles from './styles'
import { StyleSheet } from 'react-native'
interface SearchInputProps extends InputProps {
  round?: boolean
}

const SearchInput: React.FC<SearchInputProps> = props => {
  const { round, inputContainerStyle } = props

  return (
    <Input
      {...props}
      inputContainerStyle={StyleSheet.flatten([
        styles.commonInput,
        round && styles.roundInput,
        inputContainerStyle
      ])}
    />
  )
}

export default SearchInput
