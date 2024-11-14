/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import {
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { View, Text, Button, ProgressBar } from "react-native-ui-lib"
import { useStores } from "../models"
import { colors } from "../theme"
import {
  MapPinHouse,
  NotebookPen,
  History,
  HandCoins,
  Focus,
  DatabaseBackup,
  UserSearch,
  Ellipsis,
  MessageCircleQuestion,
  Calculator,
  Contact,
  BaggageClaim,
  ThumbsUp,
  ChevronUp,
  ChevronDown,
} from "lucide-react-native"

interface DashboardScreenProps extends AppStackScreenProps<"Dashboard"> {}

export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen({
  navigation,
}) {
  // Fetch user data from state tree, we should consider to put the data in the local storage or
  // secure local storage
  const {
    authenticationStore: { authUsername, authToken },
  } = useStores()

  // Determine if the user is sales or not
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSales, setIsSales] = useState(true)
  // We need to check if the user is sales or not via userdata

  // This following code is used to set state based on whether user has good standing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSalesPerformanceGood, setIsSalesPerformanceGood] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAttendnacePerformanceGood, setIsAttendnacePerformanceGood] = useState(false)

  // This code is used to toggle the statistics
  const [showSalesPerformanceStatistics, setShowSalesPerformanceStatistics] = useState(true)
  const [showAttendancePerformanceStatistics, setShowAttendancePerformanceStatistics] =
    useState(true)

  // This code is used to populate the button menu for sales users
  const buttonPropsSales = [
    {
      text: "Kunjungan",
      icon: <MapPinHouse size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Kunjungan"),
    },
    {
      text: "Cuti",
      icon: <NotebookPen size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Cuti"),
    },
    {
      text: "Lembur",
      icon: <History size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Lembur"),
    },
    {
      text: "Reimburse",
      icon: <HandCoins size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Reimburse"),
    },
    {
      text: "Supervisi",
      icon: <Focus size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Supervisi"),
    },
    {
      text: "Stok Op",
      icon: <DatabaseBackup size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Stokop"),
    },
    {
      text: "Karyawan",
      icon: <UserSearch size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Karyawan"),
    },
    {
      text: "Bantuan",
      icon: <MessageCircleQuestion size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Support"),
    },
    {
      text: "Kalkulator",
      icon: <Calculator size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Kalkulator"),
    },
    {
      text: "Pelanggan",
      icon: <Contact size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Pelanggan"),
    },
    {
      text: "Penjualan",
      icon: <BaggageClaim size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Sales"),
    },
    {
      text: "Lainnya",
      icon: <Ellipsis size={28} color={colors.palette.primary300} />,
      onPress: () => navigation.navigate("Other"),
    },
  ]

  // This code is used to populate the button menu for non-sales users
  const buttonPropsNonSales = [
    {
      text: "Cuti",
      icon: <NotebookPen size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
    {
      text: "Lembur",
      icon: <History size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
    {
      text: "Reimburse",
      icon: <HandCoins size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
    {
      text: "Supervisi",
      icon: <Focus size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
    {
      text: "Karyawan",
      icon: <UserSearch size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
    {
      text: "Karyawan",
      icon: <UserSearch size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
    {
      text: "Bantuan",
      icon: <MessageCircleQuestion size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
    {
      text: "Lainnya",
      icon: <Ellipsis size={28} color={colors.palette.primary300} />,
      onPress: () => console.log("Button 1 pressed"),
    },
  ]

  // Show or hide sales performance statistics
  const toggleSalesPerformanceStatistics = () => {
    if (showSalesPerformanceStatistics === true) {
      setShowSalesPerformanceStatistics(false)
    } else {
      setShowSalesPerformanceStatistics(true)
    }
  }

  // Show or hide attendance performance statistics
  const toggleAttendancePerformanceStatistics = () => {
    if (showAttendancePerformanceStatistics === true) {
      setShowAttendancePerformanceStatistics(false)
    } else {
      setShowAttendancePerformanceStatistics(true)
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20>
          <StatusBar hidden={true} translucent backgroundColor="transparent" />
          <View paddingB-30>
            <Text color={colors.palette.neutral500}>Dashboard</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text text60 color={colors.palette.neutral600}>
              Halo,
            </Text>
            <Image source={require("../../assets/images/satya2go.png")} style={styles.logo} />
          </View>
          <Text color={colors.palette.neutral600} text60 style={{ marginTop: -30 }}>
            {authUsername}
          </Text>
          <Text color={colors.palette.neutral600}>{authToken} (Office | Sales)</Text>
          {isSales ? (
            <>
              <View
                marginTop={30}
                backgroundColor={colors.palette.neutral100}
                style={{ borderRadius: 10, padding: 20 }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>Sales Performance</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text>0%</Text>
                    {isSalesPerformanceGood ? (
                      <ThumbsUp size={16} color={colors.palette.primary300} />
                    ) : null}
                  </View>
                </View>
                <View paddingV-10>
                  <ProgressBar progress={0} progressColor={colors.palette.primary300} />
                </View>
                {showSalesPerformanceStatistics ? null : (
                  <>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 10 }}>Target</Text>
                      <Text style={{ fontSize: 10 }}>Realisasi</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text text80>Rp. 0</Text>
                      <Text text80>Rp. 0</Text>
                    </View>
                    <View marginT-10>
                      <Text style={{ fontSize: 10 }}>
                        *) Data pada statistik ini mungkin tidak akurat selama masa migrasi
                      </Text>
                    </View>
                  </>
                )}
                {showSalesPerformanceStatistics ? (
                  <View
                    marginT-10
                    style={{ flexDirection: "row", justifyContent: "center", marginBottom: -15 }}
                  >
                    <TouchableOpacity onPress={toggleSalesPerformanceStatistics}>
                      <ChevronDown size={20} color={colors.palette.primary300} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    marginT-10
                    style={{ flexDirection: "row", justifyContent: "center", marginBottom: -15 }}
                  >
                    <TouchableOpacity onPress={toggleSalesPerformanceStatistics}>
                      <ChevronUp size={20} color={colors.palette.primary300} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View
                marginTop={15}
                marginBottom={30}
                backgroundColor={colors.palette.neutral100}
                style={{ borderRadius: 10, padding: 20 }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>Attendance Performance</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text>0%</Text>
                    {isAttendnacePerformanceGood ? (
                      <ThumbsUp size={16} color={colors.palette.primary300} />
                    ) : null}
                  </View>
                </View>
                <View paddingV-10>
                  <ProgressBar progress={0} progressColor={colors.palette.primary300} />
                </View>
                {showAttendancePerformanceStatistics ? null : (
                  <>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 10 }}>On Time</Text>
                      <Text style={{ fontSize: 10 }}>Off Time</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text text80>0</Text>
                      <Text text80>0</Text>
                    </View>
                    <View
                      marginT-10
                      style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                      <Text style={{ fontSize: 10 }}>Sakit</Text>
                      <Text style={{ fontSize: 10 }}>Cuti</Text>
                      <Text style={{ fontSize: 10 }}>Lembur</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text text80>0 hari</Text>
                      <Text text80>0 hari</Text>
                      <Text text80>0 jam</Text>
                    </View>
                    <View marginT-10>
                      <Text style={{ fontSize: 10 }}>
                        *) Data pada statistik ini mungkin tidak akurat selama masa migrasi
                      </Text>
                    </View>
                  </>
                )}
                {showAttendancePerformanceStatistics ? (
                  <View
                    marginT-10
                    style={{ flexDirection: "row", justifyContent: "center", marginBottom: -15 }}
                  >
                    <TouchableOpacity onPress={toggleAttendancePerformanceStatistics}>
                      <ChevronDown size={20} color={colors.palette.primary300} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    marginT-10
                    style={{ flexDirection: "row", justifyContent: "center", marginBottom: -15 }}
                  >
                    <TouchableOpacity onPress={toggleAttendancePerformanceStatistics}>
                      <ChevronUp size={20} color={colors.palette.primary300} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </>
          ) : (
            <>
              <View
                marginTop={30}
                marginBottom={30}
                backgroundColor={colors.palette.neutral100}
                style={{ borderRadius: 10, padding: 20 }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>Attendance Performance</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text>0%</Text>
                    {isAttendnacePerformanceGood ? (
                      <ThumbsUp size={16} color={colors.palette.primary300} />
                    ) : null}
                  </View>
                </View>
                <View paddingV-10>
                  <ProgressBar progress={0} progressColor={colors.palette.primary300} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 10 }}>On Time</Text>
                  <Text style={{ fontSize: 10 }}>Off Time</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text text80>0</Text>
                  <Text text80>0</Text>
                </View>
                <View marginT-10 style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 10 }}>Sakit</Text>
                  <Text style={{ fontSize: 10 }}>Cuti</Text>
                  <Text style={{ fontSize: 10 }}>Lembur</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text text80>0 hari</Text>
                  <Text text80>0 hari</Text>
                  <Text text80>0 jam</Text>
                </View>
                <View marginT-10>
                  <Text style={{ fontSize: 10 }}>
                    *) Data pada statistik ini mungkin tidak akurat selama masa migrasi
                  </Text>
                </View>
              </View>
            </>
          )}
          <View flex>
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}
            >
              {isSales
                ? buttonPropsSales.map((props, index) => (
                    <View key={index}>
                      <Button
                        {...props}
                        size="small"
                        color={colors.palette.primary300}
                        outline={true}
                        outlineColor={colors.palette.neutral100}
                        style={{
                          elevation: 3,
                          height: 70,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: colors.palette.neutral100,
                          marginBottom: 20,
                          marginHorizontal: 0,
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
                          {props.icon}
                          <Text
                            marginT-5
                            style={{ fontSize: 10, color: colors.palette.neutral400 }}
                          >
                            {props.text}
                          </Text>
                        </View>
                      </Button>
                    </View>
                  ))
                : buttonPropsNonSales.map((props, index) => (
                    <View key={index}>
                      <Button
                        {...props}
                        size="small"
                        color={colors.palette.primary300}
                        outline={true}
                        outlineColor={colors.palette.neutral100}
                        style={{
                          elevation: 3,
                          height: 70,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: colors.palette.neutral100,
                          marginBottom: 20,
                          marginHorizontal: 0,
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
                          {props.icon}
                          <Text
                            marginT-5
                            style={{ fontSize: 10, color: colors.palette.neutral400 }}
                          >
                            {props.text}
                          </Text>
                        </View>
                      </Button>
                    </View>
                  ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  logo: {
    height: 80,
    marginTop: -25,
    width: 80,
  },
})
