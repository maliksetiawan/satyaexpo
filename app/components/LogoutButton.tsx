/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button } from "react-native-ui-lib"
import { useStores } from "../models"

export interface LogoutButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const LogoutButton = observer(function LogoutButton() {
  const {
    authenticationStore: { logout },
  } = useStores()
  return (
    <View>
      <Button
        text70
        white
        background-red30
        marginT-20
        label={"Logout"}
        onPress={() => logout()}
      ></Button>
    </View>
  )
})
