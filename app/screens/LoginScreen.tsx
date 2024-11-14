/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextInput, StyleSheet } from "react-native"
import { View, Text, Button } from "react-native-ui-lib"
import { useStores } from "../models"
import { Logo } from "../components"
import { colors } from "../theme"
// import { Lock } from "lucide-react-native"

// Login data
type FormData = {
  username: string
  password: string
}

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}
export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const { control, handleSubmit, watch } = useForm<FormData>()
  const validatePhoneNumber = watch("username")
  const validatePassword = watch("password")
  const [loginStatus, setLoginStatus] = useState(null)
  const {
    authenticationStore: {
      setAuthUsername,
      setAuthToken,
      setAuthAlamat,
      setAuthNoHp,
      setAuthPenempatanKeterangan,
      setAuthTanggalLahir,
      setAuthTempatLahir,
      setAuthAgama,
      setAuthKebangsaan,
      setAuthNpwp,
      setAuthSim,
      setAuthPernikahan,
    },
  } = useStores()

  const onLogin = async (data: FormData) => {
    try {
      const response = await fetch("https://api-satya.satyadm.co.id/service/Auth/usersV4", {
        method: "POST",
        headers: {
          Authorization: "Bearer token",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(data.username)}&password=${encodeURIComponent(
          data.password,
        )}`,
      })
      const result = await response.json()
      if (result.result.status === true) {
        setAuthToken(result.result.data.username)
        setAuthUsername(result.result.data.nama)
        setAuthAlamat(result.result.data.alamat)
        setAuthNoHp(result.result.data.no_hp)
        setAuthPenempatanKeterangan(result.result.data.penempatan)
        setAuthTanggalLahir(result.result.data.tgl_lahir)
        setAuthTempatLahir(result.result.data.tempat_lahir)
        setAuthAgama(result.result.data.agama)
        setAuthKebangsaan(result.result.data.kebangsaan)
        setAuthNpwp(result.result.data.npwp)
        setAuthSim(result.result.data.sim)
        setAuthPernikahan(result.result.data.pernikahan)
        setLoginStatus(false)
      } else {
        console.log("login failed", result)
        setLoginStatus(true)
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  const LoginMessage = () => {
    return (
      <View>
        <Text center marginB-15 style={{ color: colors.palette.angry500 }}>
          Nomor HP / Password Salah
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.centeredBox}>
      <View paddingH-50>
        <View centerH marginB-40>
          <Logo logo="satya2go" size={LOGO_SATYA_SIZE}></Logo>
        </View>
        <View centerH>
          <Text grey40 text50 marginB-15>
            Login
          </Text>
        </View>
        {loginStatus ? <LoginMessage /> : null}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder={"NIK"}
              placeholderTextColor={colors.palette.neutral400}
              style={{
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 30,
                elevation: 1,
                paddingVertical: 10,
                paddingHorizontal: 30,
                fontSize: 16,
                backgroundColor: colors.palette.neutral100,
              }}
            />
          )}
          name="username"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={"Password"}
              placeholderTextColor={colors.palette.neutral400}
              style={{
                fontSize: 16,
                borderRadius: 30,
                elevation: 1,
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: colors.palette.neutral100,
              }}
            />
          )}
          name="password"
          defaultValue=""
        />

        <Button
          text70
          white
          background-blue30
          marginT-20
          label={"Masuk"}
          onPress={handleSubmit(onLogin)}
          disabled={!validatePassword || !validatePhoneNumber}
        />
        <View centerH marginT-40>
          <Text grey40 style={{ fontSize: 12 }}>
            Satya2Go App 2.0
          </Text>
          <Text grey40 style={{ fontSize: 12 }}>
            PT. Satya Dinamika Mandiri
          </Text>
          <Text grey40 style={{ fontSize: 12, fontWeight: "bold" }}>
            Powered By Lynx System
          </Text>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  centeredBox: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
})

const LOGO_SATYA_SIZE = 128
// const LOGO_LYNX_SIZE = 64
