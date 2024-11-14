import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { AppStackScreenProps } from "../navigators"
import View from "react-native-ui-lib/view"
import Text from "react-native-ui-lib/text"
import { useStores } from "../models"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const {
    authenticationStore: { authUsername },
  } = useStores()
  return (
    <View padding-30 marginT-30>
      <Text>{authUsername}</Text>
    </View>
  )
})
