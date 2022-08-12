import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Pressable,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import NoteItem from "./components/NoteItem";
import Modal from "react-native-modal";

const win = Dimensions.get("window");

export default function App() {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    if (title.length < 3 || desc.length < 3) {
      Alert.alert(
        "OOPS!",
        "Title and description must be at least 3 characters long.",
        [{ text: "Ok" }]
      );
    } else {
      setData((prev) => [
        {
          noteTitle: title,
          noteText: desc,
          key: Date.now().toString(),
        },
        ...prev,
      ]);
      toggleModal();
      setTitle("");
      setDesc("");
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Short Notes</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <NoteItem item={item} setData={setData} />}
      />
      <Pressable style={styles.bottomBar} onPress={toggleModal}>
        <Text style={styles.plus}>+</Text>
      </Pressable>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>Create a Short Note</Text>
          <TextInput
            placeholder="Note Title"
            value={title}
            onChangeText={(val) => setTitle(val)}
            style={styles.inputField}
          />
          <TextInput
            placeholder="Note Description"
            multiline={true}
            value={desc}
            onChangeText={(val) => setDesc(val)}
            style={styles.inputField}
          />
          <View style={styles.buttonContainer}>
            <Button title="Add Note" onPress={handleSubmit} color="#0e132b" />
            <Button title="Cancel" onPress={toggleModal} color="#0e132b" />
          </View>
        </View>
      </Modal>
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
    justifyContent: "center",
    alignItems: "center",
    width: win.width,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 100,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e132b",
  },
  plus: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  inputField: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
