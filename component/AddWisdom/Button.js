import { StyleSheet, View, Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// export default function Button({ label }) {
//   return (
//     <View style={styles.buttonContainer}>
//       <Pressable
//         style={({ pressed }) => [
//           styles.button,
//           { backgroundColor: pressed ? "#666" : "#888" }, // Change color when pressed
//         ]}
//         onPress={() => alert("You pressed a button.")}
//       >
//         <Text style={styles.buttonLabel}>{label}</Text>
//       </Pressable>
//     </View>
//   );
// }

export default function Button({ label, theme, onPress}) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            marginTop: 10,
            borderWidth: 3,
            borderColor: "#ffd33d",
            borderRadius: 18,
            backgroundColor: "grey", 
          },
        ]}
      >
        <Pressable
          style={[styles.button]} 
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "white" }]}>
            {" "}
            {/* Ensure color is set to white here */}
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#666" : "#888" },
          ]}
          onPress={() => alert("You pressed a button.")}
        >
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    width: 135,
    height: 45,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    paddingTop: 10,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "white",
    fontSize: 16,
  },
});
