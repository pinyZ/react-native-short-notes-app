import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import NoteItem from "./components/NoteItem";

const win = Dimensions.get("window");

const data = [{ key: "1", noteText: "First Note", noteTitle: "Title" }];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Short Notes</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <NoteItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    backgroundColor: "#0e132b",
    height: 60,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    width: win.width,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
