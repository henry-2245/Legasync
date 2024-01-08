// import React from 'react';
// import { StyleSheet, View, Text, Image, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Profile = () => {
//   // Example user data

//   const navigation = useNavigation();
//   const user = {
//     name: 'John Doe',
//     profileImage: require('legasync/Images/Nat.png'), // Replace with the path to your profile image
//   };

//   const handleClick = () =>{
//     navigation.navigate("LoginSignup");
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={user.profileImage} style={styles.profileImage} />
//       <Text style={styles.userName}>{user.name}</Text>
//       <View style={styles.follow}>
//       <Text style = {styles.follower}>Followers : 200</Text>
//       <Text style = {styles.following}>Following : 12</Text>
//       <Text style = {styles.post}>Post : 1</Text>

//       </View>

//       {/* Add other user details or actions as needed */}
//       <Button title = "Logout" onPress = {handleClick}>
//         Logout
//       </Button>
//     </View>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//     backgroundColor: '#2F2D2D',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 20
//   },
//   following: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginHorizontal: 10
//   },
//   follower:{
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold'

//   },
//   follow: {
    
//     flexDirection: 'row',
//     justifyContent: 'space-between'

//   },

//   post : {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold'

//   }

  
// });

// export default Profile;

//test


import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WisdomWidget from './WisdomWidget';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: 'John David',
    occupation: 'Motivational Speaker',
    followers: 13400,
    following: 1462,
    posts: 1,
    profileImage: require('legasync/Images/Abdul.jpg'),
  });

  const handleClick = () =>{
      navigation.navigate("LoginSignup");
    }


 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={user.profileImage}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.occupation}>{user.occupation}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <Text style={styles.statsNumber}>{user.followers}</Text>
          <Text style={styles.statsLabel}>Followers</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsNumber}>{user.following}</Text>
          <Text style={styles.statsLabel}>Following</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsNumber}>{user.posts}</Text>
          <Text style={styles.statsLabel}>Posts</Text>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>My Bio</Text>
        <Text style={styles.bioText}>
          I'm a motivational speaker and I'm always looking for new ways to improve my life. I'm also always looking for new ways to connect with people and make a difference in the world. I'm passionate about helping others reach their full potential and live their best lives.
        </Text>
      </View>

      {/* <WisdomWidget
        title="Biology"
        image={require('legasync/Images/Nat.png')}
        text="I'm passionate about biology and I love learning about the natural world."
      /> */}
      <Button title = "Logout" onPress = {handleClick}>
       Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2D2D',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white'
  },
  occupation: {
    fontSize: 16,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statsRow: {
    alignItems: 'center',
    color: 'white'
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
    
  },
  statsLabel: {
    fontSize: 14,
    color: 'white',

  },
  bioContainer: {
    marginTop: 20,
    padding: 10,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  bioText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,

  },
});

export default Profile;