import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { View, Text } from "react-native-ui-lib"
import { colors } from "../theme/colors"

interface PelangganScreenProps extends AppStackScreenProps<"Pelanggan"> {}

export const PelangganScreen: FC<PelangganScreenProps> = observer(function PelangganScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20>
          <View paddingB-30>
            <Text color={colors.palette.neutral500}>Pelanggan</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
