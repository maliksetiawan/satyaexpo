import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { View, Text } from "react-native-ui-lib"
import { colors } from "../theme/colors"

interface StokopScreenProps extends AppStackScreenProps<"Stokop"> {}

export const StokopScreen: FC<StokopScreenProps> = observer(function StokopScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20>
          <View paddingB-30>
            <Text color={colors.palette.neutral500}>Stokop</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})