/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { SafeAreaView, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { View, Text } from "react-native-ui-lib"
import { colors } from "../theme"
import { WebView } from "react-native-webview"
import { useStores } from "../models"

interface InfoScreenProps extends AppStackScreenProps<"Info"> {}

export const InfoScreen: FC<InfoScreenProps> = observer(function InfoScreen() {
  const {
    authenticationStore: { authToken },
  } = useStores()

  console.log(authToken)

  const InfoSistem = () => {
    return (
      <WebView
        style={{ flex: 1 }}
        source={{
          uri:
            "https://api-satya.satyadm.co.id/service/attach/notifWebview/" +
            authToken +
            "/" +
            "sistem",
        }}
        javaScriptEnabled={true}
        startInLoadingState={true}
        originWhitelist={["*"]}
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        mixedContentMode="always"
        domStorageEnabled={true}
      />
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View style={{ paddingBottom: 0 }}>
            <Text color={colors.palette.neutral500}>Informasi</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <InfoSistem />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
