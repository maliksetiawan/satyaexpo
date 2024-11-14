/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState, useEffect, useMemo, useCallback } from "react"
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, RefreshControl } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { View, Text, Button } from "react-native-ui-lib"
import { colors } from "../theme"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps"
import moment from "moment"
import * as Location from "expo-location"
import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"
import { Wifi, WifiOff, TriangleAlert, MapPin } from "lucide-react-native"

interface AbsensiScreenProps extends AppStackScreenProps<"Absensi"> {}

export const AbsensiScreen: FC<AbsensiScreenProps> = observer(function AbsensiScreen() {
  const [isClockIn, setIsClockIn] = useState(false)
  const [isClockOut, setIsClockOut] = useState(false)
  const [clockIn, setClockIn] = useState("")
  const [clockOut, setClockOut] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentLatitude, setCurrentLatitude] = useState(null)
  const [currentLongitude, setCurrentLongitude] = useState(null)
  const [isLocationTrackingActive, setIsLocationTrackingActive] = useState(false)
  const [photoSelfie, setPhotoSelfie] = useState(null)
  const [validAttendanceArea, setValidAttendanceArea] = useState(false)

  // Take photo when punch-in and punch-out
  const takePhoto = async () => {
    // Request permission for camera access
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      })
      console.log("Result object:", result)
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri

        // Resize the image to a max width of 800px
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 800 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
        )

        setPhotoSelfie(resizedPhoto.uri)
      } else {
        console.log("Photo was cancelled or no URI returned")
      }
    } else {
      alert("Permission to access camera is required.")
    }
  }

  // this is current time clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("hh:mm:ss"))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const radiusInMeters = 50

  // Acctual checkPoint at Satya Office
  // const checkPoint = {
  //   latitude: -6.155968959515586,
  //   longitude: 106.69045774930657,
  // }

  // Mock checkPoint at Tasikmalaya
  const checkPoint = {
    latitude: -7.299549309308194,
    longitude: 108.19982068760028,
  }

  // Function to request location permission and fetch user's current position
  const requestLocationPermission = async () => {
    try {
      // Request permission for location access
      const { status } = await Location.requestForegroundPermissionsAsync()

      // Check if permission is granted
      if (status !== "granted") {
        // For debug
        console.log("Permission denied. Re-asking for permission...")

        // Retry requesting permission after a delay
        return await requestLocationPermission()
      }

      // Fetch the current position
      const response = await Location.getCurrentPositionAsync({})

      const { latitude, longitude } = response.coords

      // Update state only if the coordinates are different to prevent unnecessary re-renders
      if (latitude !== currentLatitude) setCurrentLatitude(latitude)
      if (longitude !== currentLongitude) setCurrentLongitude(longitude)
    } catch (error) {
      // Handle any error that occurs during location fetching
      console.error("Error getting current location: ", error)
    }
  }

  // Only request the location once when the component mounts
  useEffect(() => {
    requestLocationPermission()
  }, [])

  // Memoize the function that checks if the user is inside the checkpoint area
  const isValidAttendaceArea = useMemo(() => {
    if (currentLatitude === null || currentLongitude === null) {
      return false // Skip calculation if no location yet
    }

    const toRad = (value) => (value * Math.PI) / 180

    // Destructure the coordinates
    const { latitude: lat1, longitude: lon1 } = checkPoint
    const { latitude: lat2, longitude: lon2 } = {
      latitude: currentLatitude,
      longitude: currentLongitude,
    }

    // Radius of the Earth in kilometers
    const R = 6371

    // Convert latitude and longitude from degrees to radians
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    // Distance in kilometers
    const distance = R * c

    // Convert distance to meters
    const distanceInMeters = distance * 1000 // Distance in meters

    // Check if the user is within 100 meters of the checkpoint
    return distanceInMeters <= 50
  }, [currentLatitude, currentLongitude])

  // Only update validAttendanceArea when isValidAttendaceArea changes
  useEffect(() => {
    setValidAttendanceArea(isValidAttendaceArea)
  }, [isValidAttendaceArea])

  // This executed when the user punch-in
  const punchIn = () => {
    requestLocationPermission()
    takePhoto()
    console.log("punch in")
    setClockIn(currentTime)
    setIsClockIn(true)
    console.log(photoSelfie)
    setIsLocationTrackingActive(true)
  }

  // This executed when the user punch-out
  const punchOut = () => {
    console.log("punch out")
    setClockOut(currentTime)
    setIsClockOut(true)
    setIsLocationTrackingActive(false)
  }

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await requestLocationPermission()
    setRefreshing(false)
  }, [])

  return (
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ marginBottom: 120 }}>
          <StatusBar hidden={true} translucent backgroundColor={colors.palette.neutral100} />
          <View padding-20 paddingB-20>
            <Text color={colors.palette.neutral500}>Absensi</Text>
          </View>
          <View
            style={{
              borderTopColor: colors.palette.neutral300,
              borderBottomColor: colors.palette.neutral300,
              borderBottomWidth: 1,
              borderTopWidth: 1,
            }}
          >
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              scrollEnabled={false}
              initialRegion={{
                latitude: checkPoint.latitude,
                longitude: checkPoint.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
            >
              <Marker
                coordinate={{ latitude: checkPoint.latitude, longitude: checkPoint.longitude }}
                title="Main Office"
                description="PT. Satya Dinamika Mandiri Head Office"
              >
                <MapPin size={16} color={colors.palette.angry500} />
              </Marker>
              <Circle
                center={{ latitude: checkPoint.latitude, longitude: checkPoint.longitude }}
                radius={radiusInMeters} // Radius of the circle in meters
                strokeColor="rgba(0, 0, 255, 0.4)" // Stroke color for the border of the circle
                fillColor="rgba(0, 0, 255, 0.1)" // Fill color for the inside of the circle
                zIndex={999}
              />
            </MapView>
          </View>

          {isLocationTrackingActive ? (
            <View
              paddingV-5
              marginB-10
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "lime",
                  width: 160,
                  padding: 5,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginTop: -22,
                }}
              >
                <Wifi size={14} color={colors.palette.neutral900} />
                <Text marginL-5 style={{ fontSize: 10 }}>
                  Location Tracking Active
                </Text>
              </View>
            </View>
          ) : (
            <View
              paddingV-5
              marginB-10
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: colors.palette.neutral300,
                  width: 160,
                  padding: 5,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginTop: -22,
                }}
              >
                <WifiOff size={14} color={colors.palette.neutral900} />
                <Text marginL-5 style={{ fontSize: 10 }}>
                  Location Tracking Off
                </Text>
              </View>
            </View>
          )}
          <View padding-20>
            <View marginB-30 style={{ alignItems: "center", flexDirection: "column" }}>
              <Text style={{ fontSize: 10 }}>Waktu Saat Ini</Text>
              <Text text50>{currentTime}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: colors.palette.neutral600 }}>Masuk</Text>
              <Text style={{ color: colors.palette.neutral600 }}>Pulang</Text>
            </View>
            <View marginB-30 style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {isClockIn ? (
                <Text text50 style={{ color: colors.palette.neutral700 }}>
                  {clockIn}
                </Text>
              ) : (
                <Text text50>~</Text>
              )}
              {isClockOut ? (
                <Text text50 style={{ color: colors.palette.neutral700 }}>
                  {clockOut}
                </Text>
              ) : (
                <Text text50>~</Text>
              )}
            </View>
            {isClockIn ? (
              <Button
                text70
                white
                marginT-20
                label={isClockOut ? "Selamat Beristirahat" : "Pulang"}
                style={
                  isClockOut
                    ? { backgroundColor: colors.palette.neutral300 }
                    : { backgroundColor: colors.palette.primary300 }
                }
                onPress={() => {
                  punchOut()
                }}
                disabled={isClockOut}
              />
            ) : (
              <Button
                text70
                white
                marginT-20
                label={"Masuk"}
                labelStyle={
                  !validAttendanceArea
                    ? { color: colors.palette.angry500 }
                    : { color: colors.palette.neutral100 }
                }
                disabled={!validAttendanceArea}
                style={
                  !validAttendanceArea
                    ? { backgroundColor: colors.palette.angry100 }
                    : { backgroundColor: colors.palette.primary300 }
                }
                onPress={() => {
                  punchIn()
                }}
              />
            )}
            {!validAttendanceArea ? (
              <View centerH marginT-10>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <TriangleAlert size={14} color={colors.palette.angry500} />
                  <Text style={{ fontSize: 10, color: colors.palette.angry500 }}>
                    Lokasi Anda terlalu jauh dari area checkpoint
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  map: {
    borderRadius: 20,
    height: 300,
    width: "100%",
  },
})
