/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useEffect, useState, useCallback } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { View, Text } from "react-native-ui-lib"
import { useStores } from "../models"
import { colors } from "../theme"
import moment from "moment"
import { Table, Row, TableWrapper } from "react-native-table-component"
import { ChevronRight, ChevronLeft } from "lucide-react-native"

interface HistoryScreenProps extends AppStackScreenProps<"History"> {}

export const HistoryScreen: FC<HistoryScreenProps> = observer(function HistoryScreen({
  navigation,
}) {
  const currentMonth = moment().month() + 1
  const currentYear = moment().year()
  const [month, setMonth] = useState<number>(currentMonth)
  const [year] = useState<number>(currentYear)
  const [tableHead] = useState<string[]>(["Tanggal", "Datang", "Pulang", "Durasi", "Status"]) // Example table head, modify as needed
  const [tableData, setTableData] = useState<string[][]>([])
  const [tableData2, setTableData2] = useState<string[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const back = () => {
    setMonth((prevMonth) => Math.max(prevMonth - 1, 1))
  }

  const next = () => {
    setMonth((prevMonth) => Math.min(prevMonth + 1, 12))
  }

  const onRefresh = () => {
    setRefreshing(true)
    // Refresh logic here
    setRefreshing(false)
  }

  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  const compareTime = useCallback(() => {
    GetAbsen()
  }, [navigation])

  useEffect(() => {
    compareTime()

    const focusListener = navigation.addListener("focus", () => {
      compareTime()
    })

    return () => {
      focusListener() // Cleanup the listener on component unmount
    }
  }, [compareTime, navigation])

  const GetAbsen = async (month = "", b = "") => {
    const {
      authenticationStore: { authToken },
    } = useStores()

    interface AbsenData {
      tgl: string
      datang: string
      pulang: string
      durasi: string
      status: string
      keterangan: string
    }

    interface ResponseData {
      data: AbsenData[]
    }

    try {
      const response = await fetch(
        `${global.endPoint}service/SAbsen/getDataAbsen/${authToken}/all/${month}/${b}`,
      )
      const responseJson: ResponseData = await response.json()

      if (responseJson.data.length === 0) {
        setVisible(false)
        setData("kosong")
        setLoading(false)
      } else {
        const tableData2New = responseJson.data.map((z) => [z.keterangan])
        const kj = responseJson.data.map((l) => [l.tgl, l.datang, l.pulang, l.durasi, l.status])

        setVisible(false)
        setTableData(kj)
        setTableData2((prevTableData2) => prevTableData2.concat(tableData2New))
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20>
          <View paddingB-30>
            <Text color={colors.palette.neutral500}>Riwayat</Text>
          </View>
          {month === 1 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={back}>
                <ChevronLeft style={{ color: colors.palette.neutral200 }} size={20} />
              </TouchableOpacity>
              <Text>{bulan[month - 1] + " " + year}</Text>
              <TouchableOpacity onPress={next}>
                <ChevronRight style={{ color: colors.palette.primary300 }} size={20} />
              </TouchableOpacity>
            </View>
          )}

          {month !== 0 && month !== 1 && (
            <View>
              {month === 12 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={back}>
                    <ChevronLeft
                      style={{ color: colors.palette.primary300, paddingRight: 5 }}
                      size={20}
                    />
                  </TouchableOpacity>
                  <Text>{bulan[month - 1] + " " + year}</Text>
                  <TouchableOpacity onPress={next}>
                    <ChevronRight style={{ color: colors.palette.neutral200 }} size={20} />
                  </TouchableOpacity>
                </View>
              )}

              {month < 12 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={back}>
                    <ChevronLeft
                      style={{ color: colors.palette.primary300, paddingRight: 5 }}
                      size={20}
                    />
                  </TouchableOpacity>
                  <Text>{bulan[month - 1] + " " + year}</Text>
                  <TouchableOpacity onPress={next}>
                    <ChevronRight style={{ color: colors.palette.primary300 }} size={20} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          <View style={{ flex: 1, marginTop: 20 }}>
            <Table>
              <Row
                data={tableHead}
                flexArr={[2.5, 1, 1, 1]}
                style={styles.head}
                textStyle={styles.textHead}
              />
              <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              >
                <TableWrapper style={{ marginBottom: 90 }}>
                  {tableData.map((rowData, index) => (
                    <View key={index}>
                      {tableData2[index] === "telat" ? (
                        <Row
                          data={rowData}
                          flexArr={[2.5, 1, 1]}
                          style={styles.row1}
                          textStyle={styles.text2}
                        />
                      ) : (
                        <Row
                          data={rowData}
                          flexArr={[2.5, 1, 1]}
                          style={styles.row}
                          textStyle={styles.text}
                        />
                      )}
                    </View>
                  ))}
                </TableWrapper>
              </ScrollView>
            </Table>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
const styles = StyleSheet.create({
  head: {
    backgroundColor: colors.palette.primary300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: "white",
    fontSize: 12,
    height: 35,
    lineHeight: 20,
    paddingHorizontal: 5,
  },

  row: {
    backgroundColor: "white",
  },
  row1: {
    backgroundColor: "#c71b04",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  text: { color: "#424242", fontSize: 9, lineHeight: 30, margin: 6 },
  text2: { color: "white", fontSize: 9, margin: 6 },
  textHead: { color: "white", fontSize: 12, lineHeight: 20, margin: 6 },
})
