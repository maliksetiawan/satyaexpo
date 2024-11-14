/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CompositeScreenProps } from "@react-navigation/native"
import {
  DashboardScreen,
  AbsensiScreen,
  ProfileScreen,
  InfoScreen,
  HistoryScreen,
  KunjunganScreen,
  CutiScreen,
  LemburScreen,
  ReimburseScreen,
  SupervisiScreen,
  StokopScreen,
  KaryawanScreen,
  SupportScreen,
  KalkulatorScreen,
  PelangganScreen,
  SalesScreen,
  OtherScreen,
} from "../screens"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ViewStyle } from "react-native"
import { colors } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import {
  LayoutDashboard,
  BadgeInfo,
  AlarmClockCheck,
  FileClock,
  CircleUserRound,
} from "lucide-react-native"
import { View } from "react-native-ui-lib"

export type MainTabParamList = {
  DashboardStack: undefined
  AbsensiStack: undefined
  ProfileStack: undefined
  InfoStack: undefined
  HistoryStack: undefined
}

export type MainTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<MainTabParamList>()

export type DashboardStackParamList = {
  Dashboard: undefined
  Kunjungan: undefined
  Cuti: undefined
  Lembur: undefined
  Reimburse: undefined
  Supervisi: undefined
  Stokop: undefined
  Karyawan: undefined
  Support: undefined
  Kalkulator: undefined
  Pelanggan: undefined
  Sales: undefined
  Other: undefined
}

const DashboardNavigation = createNativeStackNavigator<DashboardStackParamList>()

const DashboardStack = () => {
  return (
    <DashboardNavigation.Navigator initialRouteName="Dashboard">
      <DashboardNavigation.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <DashboardNavigation.Screen name="Kunjungan" component={KunjunganScreen} />
      <DashboardNavigation.Screen name="Cuti" component={CutiScreen} />
      <DashboardNavigation.Screen name="Lembur" component={LemburScreen} />
      <DashboardNavigation.Screen name="Reimburse" component={ReimburseScreen} />
      <DashboardNavigation.Screen name="Supervisi" component={SupervisiScreen} />
      <DashboardNavigation.Screen name="Stokop" component={StokopScreen} />
      <DashboardNavigation.Screen name="Karyawan" component={KaryawanScreen} />
      <DashboardNavigation.Screen name="Support" component={SupportScreen} />
      <DashboardNavigation.Screen name="Kalkulator" component={KalkulatorScreen} />
      <DashboardNavigation.Screen name="Pelanggan" component={PelangganScreen} />
      <DashboardNavigation.Screen name="Sales" component={SalesScreen} />
      <DashboardNavigation.Screen name="Other" component={OtherScreen} />
    </DashboardNavigation.Navigator>
  )
}

export function MainNavigator() {
  const { bottom } = useSafeAreaInsets()
  return (
    <Tab.Navigator
      initialRouteName={"AbsensiStack"}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 60 }],
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        style={{ color: colors.palette.primary300 }}
        options={{
          tabBarIcon: ({ focused }) => (
            <LayoutDashboard
              color={focused ? colors.palette.primary300 : colors.palette.neutral400}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="InfoStack"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <BadgeInfo
              color={focused ? colors.palette.primary300 : colors.palette.neutral400}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AbsensiStack"
        component={AbsensiScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              backgroundColor={colors.palette.primary300}
              // eslint-disable-next-line react-native/no-color-literals
              style={{
                padding: 20,
                borderRadius: 20,
                marginTop: -40,
                borderColor: colors.palette.neutral100,
                borderWidth: 3,
                elevation: 3,
              }}
            >
              <AlarmClockCheck
                color={focused ? colors.palette.neutral100 : colors.palette.neutral100}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HistoryStack"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FileClock
              color={focused ? colors.palette.primary300 : colors.palette.neutral400}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CircleUserRound
              color={focused ? colors.palette.primary300 : colors.palette.neutral400}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}
