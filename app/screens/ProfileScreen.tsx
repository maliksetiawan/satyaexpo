/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { SafeAreaView, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { View, Text, Switch } from "react-native-ui-lib"
import { LogoutButton } from "../components/LogoutButton"
import { useStores } from "../models"
import { colors } from "../theme"
import { CircleUserRound } from "lucide-react-native"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const {
    authenticationStore: {
      authUsername,
      authAlamat,
      authNoHp,
      authPenempatanKeterangan,
      authToken,
      authNpwp,
      authSim,
      authTempatLahir,
      authTanggalLahir,
      authKebangsaan,
      authAgama,
      authPernikahan,
    },
  } = useStores()
  const [biometricsStatus, setBiometricsStatus] = useState(false)
  const toggleStatus = () => {
    if (biometricsStatus) {
      setBiometricsStatus(false)
    } else {
      setBiometricsStatus(true)
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20>
          <View paddingB-30>
            <Text color={colors.palette.neutral500}>Profil Karyawan</Text>
          </View>
          <View
            marginB-30
            style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
          >
            <CircleUserRound size={64} color={colors.palette.neutral300} />
            <Text text60 marginT-10>
              {authUsername}
            </Text>
            <Text>
              {authToken} &bull; {authPenempatanKeterangan}
            </Text>
          </View>
          <View
            backgroundColor={colors.palette.neutral100}
            style={{ borderRadius: 10, padding: 20 }}
          >
            <View marginB-10>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 10 }} grey40>
                    NPWP
                  </Text>
                  <Text style={{ fontSize: 10 }} grey40>
                    SIM
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>{authNpwp}</Text>
                  <Text>{authSim}</Text>
                </View>
              </View>
            </View>
            <View marginB-10>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 10 }} grey40>
                    Tempat Lahir
                  </Text>
                  <Text style={{ fontSize: 10 }} grey40>
                    Tanggal Lahir
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>{authTempatLahir.toUpperCase()}</Text>
                  <Text>{authTanggalLahir}</Text>
                </View>
              </View>
            </View>
            <View marginB-10>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 10 }} grey40>
                    Kebangsaan
                  </Text>
                  <Text style={{ fontSize: 10 }} grey40>
                    Agama
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>{authKebangsaan.toUpperCase()}</Text>
                  <Text>{authAgama.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            <View marginB-10>
              <Text style={{ fontSize: 10 }} grey40>
                Alamat
              </Text>
              <Text>{authAlamat}</Text>
            </View>
            <View marginB-10>
              <Text style={{ fontSize: 10 }} grey40>
                No Handphone
              </Text>
              <Text>{authNoHp}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }} grey40>
                Status Pernikahan
              </Text>
              <Text>{authPernikahan}</Text>
            </View>
          </View>
          <View
            backgroundColor={colors.palette.neutral100}
            style={{ borderRadius: 10, padding: 20, marginTop: 20 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text>Biometrics</Text>
              </View>
              <View>
                <Switch
                  value={!!biometricsStatus}
                  onValueChange={() => toggleStatus()}
                  onColor={colors.palette.primary300}
                />
              </View>
            </View>
          </View>
          <View marginT-30 marginB-30>
            <LogoutButton />
            <View centerH>
              <Text marginT-20 grey40 style={{ fontSize: 10 }}>
                Satya2Go App 2.0
              </Text>
              <Text grey40 style={{ fontSize: 10 }}>
                Powered By Lynx System
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
