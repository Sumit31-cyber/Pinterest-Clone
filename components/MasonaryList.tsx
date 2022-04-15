import { useState } from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

import Pin from "./Pin";
import { View } from "./Themed";

interface IMasonaryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const MasonaryList = ({ pins }: IMasonaryList) => {
  const width = useWindowDimensions().width;
  const numOfCols = Math.ceil(width / 350);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.from(Array(numOfCols)).map((_, colIndex) => (
        <View style={styles.column} key={`column_${colIndex}`}>
          {pins.map((pin, index) => {
            if (index % numOfCols === colIndex)
              return <Pin key={pin.id} pin={pin} />;
          })}
        </View>
      ))}
      {/* First Column */}

      {/* Second Column */}
      {/* <View style={styles.column}>
        {pins.map((pin, index) => {
          if (index % 2 !== 0) return <Pin key={pin.id} pin={pin} />;
        })}
      </View> */}
    </ScrollView>
  );
};

export default MasonaryList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  column: {
    flex: 1,
  },
});
