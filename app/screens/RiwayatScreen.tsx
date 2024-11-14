import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { View, Text } from "react-native-ui-lib"

interface RiwayatScreenProps extends AppStackScreenProps<"Riwayat"> {}

export const RiwayatScreen: FC<RiwayatScreenProps> = observer(function RiwayatScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20>
          <View paddingB-30>
            <Text color={colors.palette.neutral500}>Riwayat</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
