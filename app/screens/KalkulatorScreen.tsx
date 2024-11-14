/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { View, Text } from "react-native-ui-lib"
import { MoonStar } from "lucide-react-native"

interface KalkulatorScreenProps extends AppStackScreenProps<"Kalkulator"> {}

export const KalkulatorScreen: FC<KalkulatorScreenProps> = observer(function KalkulatorScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")

  const buttons = ["C", "DEL", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="]

  function calculator() {
    const lastArr = currentNumber[currentNumber.length - 1]

    if (
      lastArr === "/" ||
      lastArr === "*" ||
      lastArr === "-" ||
      lastArr === "+" ||
      lastArr === "."
    ) {
      setCurrentNumber(currentNumber)
    } else {
      // eslint-disable-next-line no-eval
      const result = eval(currentNumber).toString()
      setCurrentNumber(result)
    }
  }

  function handleInput(buttonPressed) {
    if (
      buttonPressed === "+" ||
      buttonPressed === "-" ||
      buttonPressed === "*" ||
      buttonPressed === "/"
    ) {
      setCurrentNumber(currentNumber + buttonPressed)
      return
    } else if (
      buttonPressed === 1 ||
      buttonPressed === 2 ||
      buttonPressed === 3 ||
      buttonPressed === 4 ||
      buttonPressed === 5 ||
      buttonPressed === 6 ||
      buttonPressed === 7 ||
      buttonPressed === 8 ||
      buttonPressed === 9 ||
      buttonPressed === 0 ||
      buttonPressed === "."
    ) {
      return true
    }
    switch (buttonPressed) {
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1))
        return
      case "C":
        setLastNumber("")
        setCurrentNumber("")
        return
      case "=":
        setLastNumber(currentNumber + "=")
        calculator()
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <StatusBar
            barStyle={darkMode ? "light-content" : "dark-content"}
            hidden={false}
            translucent
            backgroundColor="transparent"
          />
          <View style={styles.results} marginT-20>
            <TouchableOpacity style={styles.themeButton}>
              <MoonStar
                name={darkMode ? "light-up" : "moon"}
                size={24}
                color={darkMode ? "white" : "black"}
                onPress={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
              />
            </TouchableOpacity>
            <Text style={styles.historyText}>{lastNumber}</Text>
            <Text style={styles.resultText}>{currentNumber}</Text>
          </View>
          <View style={styles.buttons}>
            {buttons.map((button) =>
              button === "=" ||
              button === "/" ||
              button === "*" ||
              button === "-" ||
              button === "+" ? (
                <TouchableOpacity
                  key={button}
                  style={[styles.button, { backgroundColor: "#00b9d6" }]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={[styles.textButton, { color: "white", fontSize: 28 }]}>
                    {button}
                  </Text>
                </TouchableOpacity>
              ) : button === 0 ? (
                <TouchableOpacity
                  key={button}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        typeof button === "number"
                          ? darkMode
                            ? "#303946"
                            : "#fff"
                          : darkMode === true
                          ? "#414853"
                          : "#ededed",
                      minWidth: "36%",
                    },
                  ]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              ) : button === "." || button === "DEL" ? (
                <TouchableOpacity
                  key={button}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        button === "."
                          ? darkMode
                            ? "#303946"
                            : "#fff"
                          : darkMode === true
                          ? "#414853"
                          : "#ededed",
                      minWidth: "37%",
                    },
                  ]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              ) : button === "C" ? (
                <TouchableOpacity
                  key={button}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        typeof button === "number"
                          ? darkMode
                            ? "#303946"
                            : "#fff"
                          : darkMode === true
                          ? "#414853"
                          : "#ededed",
                      minWidth: "36%",
                    },
                  ]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={button}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        typeof button === "number"
                          ? darkMode
                            ? "#303946"
                            : "#fff"
                          : darkMode === true
                          ? "#414853"
                          : "#ededed",
                    },
                  ]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderColor: this.darkMode ? "#3f4d5b" : "#e5e5e5",
    flex: 2,
    justifyContent: "center",
    minHeight: "54%",
    minWidth: "24%",
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "35%",
    width: "100%",
  },
  historyText: {
    alignSelf: "flex-end",
    color: this.darkMode ? "#B5B7BB" : "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
  },
  resultText: {
    color: "#00b9d6",
    fontSize: 35,
    margin: 15,
    maxHeight: 45,
  },
  results: {
    alignItems: "flex-end",
    backgroundColor: this.darkMode ? "#282f3b" : "#f5f5f5",
    justifyContent: "flex-end",
    maxWidth: "100%",
    minHeight: "35%",
  },
  textButton: {
    color: this.darkMode ? "#b5b7bb" : "#7c7c7c",
    fontSize: 28,
  },
  themeButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: this.darkMode ? "#7b8084" : "#e5e5e5",
    borderRadius: 25,
    bottom: "5%",
    height: 50,
    justifyContent: "center",
    margin: 15,
    width: 50,
  },
})
