import * as React from "react"
import { StyleProp, View, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"

export type LogoTypes = keyof typeof logoRegistry
export interface LogoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  logo: LogoTypes
  size?: number
}

/**
 * Describe your component here
 */
export const Logo = observer(function Logo(props: LogoProps) {
  const { style: $imageStyleOverride, logo, size } = props
  const $styles = [$container, $styles]

  return (
    <View style={$styles}>
      <Image
        style={[$imageStyle, size && { width: size, height: size }, $imageStyleOverride]}
        source={logoRegistry[logo]}
      />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}

export const logoRegistry = {
  satya2go: require("../../assets/images/satya2go.png"),
  lynx: require("../../assets/images/lynx.jpg"),
}
