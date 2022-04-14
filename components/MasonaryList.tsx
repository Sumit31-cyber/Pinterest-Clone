import { ScrollView, StyleSheet } from "react-native";

import Pin from "./Pin";
import { Text, View } from "./Themed";

interface IMasonaryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const MasonaryList = ({ pins }: IMasonaryList) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* First Column */}
      <View style={styles.column}>
        {pins.map((pin, index) => {
          if (index % 2 === 0) return <Pin key={pin.id} pin={pin} />;
        })}
      </View>

      {/* Second Column */}
      <View style={styles.column}>
        {pins.map((pin, index) => {
          if (index % 2 !== 0) return <Pin key={pin.id} pin={pin} />;
        })}
      </View>
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
