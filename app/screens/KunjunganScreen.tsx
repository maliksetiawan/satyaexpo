import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { View, Text } from "react-native-ui-lib"
import { colors } from "../theme/colors"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface KunjunganScreenProps extends AppStackScreenProps<"Kunjungan"> {}

export const KunjunganScreen: FC<KunjunganScreenProps> = observer(function KunjunganScreen() {
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
