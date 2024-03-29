import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Textbox from "../component/EditProfile/Textbox";
import BlackButton from "../component/EditProfile/BlackButton";
import Avatar from "../component/EditProfile/Avatar";
import { MaterialIcons } from "@expo/vector-icons";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "John David",
    occupation: "Motivational Speaker",
    followers: 13400,
    following: 1462,
    posts: 1,
    profileImage: require("legasync/Images/Abdul.jpg"),
  });

  const navigation = useNavigation();

  //still testing
  const handleSavePress = () => {
    console.log("Saved Pressed");
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container1}
      >
        {/* Top section */}
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.backbtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="keyboard-arrow-left" size={50} color="white" />
          </TouchableOpacity>

          <Text style={styles.header}>Edit Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Avatar></Avatar>
        </View>

        <View style={styles.bottomSection}>
          <Textbox label="Username" />
          <Textbox label="Email" />
          <Textbox label="Phone Number" keyboardType="number-pad" />
          <Textbox label="Bio" />
          <BlackButton onPress={handleSavePress} title="Save" />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    backgroundColor: "#2F2D2D",
  },
  topSection: {
    width: "100%",
    height: 200,
    backgroundColor: "#7C7C7C",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileSection: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: -50,
    right: 5,
    
  },
  bottomSection: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: 125,
    justifyContent: "center",
  },
  profiletxt: {
    color: "white",
    fontSize: 14,
    paddingTop: 5,
  },
  backbtn: {
    marginLeft: 15,
    position: "absolute",
  },
});

export default EditProfile;

// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   TextInput,
//   Modal,
// } from "react-native";
// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { MaterialIcons } from "@expo/vector-icons";

// const EditProfile = () => {

//   const [user, setUser] = useState({
//         name: "John David",
//         occupation: "Motivational Speaker",
//         followers: 13400,
//         following: 1462,
//         posts: 1,
//         profileImage: require("legasync/Images/Abdul.jpg"),
//       });

//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.safeContainer}>
//       <View style={styles.topSection}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <MaterialIcons name="keyboard-arrow-left" size={45} color="white" />
//         </TouchableOpacity>

//         <Text style={styles.tsText}>Edit Profile</Text>
//       </View>

//       <ScrollView>
//         <View style={styles.midSection}>
//           <TouchableOpacity >
//             <Image source={user.profileImage} style={styles.profileImage}></Image>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     backgroundColor: "#2F2D2D",
//     paddingHorizontal: 20,
//   },

//   topSection: {
//     paddingTop: 23,
//     marginHorizontal: 12,
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop:30,
//     left: 10,
//   },

//   tsText: {
//     fontWeight: "bold",
//     fontSize: 35,
//     color: "white",
//     lineHeight: 35,
//   },

//   backButton: {
//     paddingTop: 15,
//     position: "absolute",
//     left: -20,
//   },

//   midSection:{
//     alignItems: "center",
//     marginVertical: 22,
//   },

//   profileImage:{
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf: "center",
//     borderWidth: 2,
//     borderColor: "white",
//   },
// });

// export default EditProfile;
