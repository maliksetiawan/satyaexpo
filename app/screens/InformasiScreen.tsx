import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Text, View } from "react-native-ui-lib"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface InformasiScreenProps extends AppStackScreenProps<"Informasi"> {}

export const InformasiScreen: FC<InformasiScreenProps> = observer(function InformasiScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-25>
          <View paddingB-30>
            <Text color={colors.palette.neutral500}>Informasi</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
