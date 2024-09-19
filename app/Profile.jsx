import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const dummyUser = {
  first_name: 'John',
  last_name: 'Doe',
  phone: '+8801234567890',
  address: '123 Main Street, Dhaka',
  rating: 4.7,
  trips: 34,
};

export default function ProfileScreen() {
  const [user, setUser] = useState(dummyUser);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleSignOut = () => {
    Alert.alert('Logged Out', 'You have been logged out successfully.');
    navigation.replace('index'); // Navigate to the login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://img.freepik.com/premium-photo/smiling-car-delivery-driver-headshot_810293-317090.jpg' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.name}>{`${user.first_name} ${user.last_name}`}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={user.phone}
              onChangeText={(text) => setUser({ ...user, phone: text })}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.info}>{user.phone}</Text>
          )}

          <Text style={styles.title}>Address:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={user.address}
              onChangeText={(text) => setUser({ ...user, address: text })}
              placeholder="Enter address"
            />
          ) : (
            <Text style={styles.info}>{user.address}</Text>
          )}

          <Text style={styles.title}>Rating:</Text>
          <Text style={styles.info}>{user.rating}</Text>

          <Text style={styles.title}>Total Trips:</Text>
          <Text style={styles.info}>{user.trips}</Text>

          {isEditing ? (
            <Button title="Save Changes" onPress={handleSave} />
          ) : (
            <Button title="Edit Profile" onPress={handleEditToggle} />
          )}

          <Button title="Log Out" onPress={handleSignOut} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 5,
  },
  name: {
    fontSize: 33,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  infoContainer: {
    marginTop: 10,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    padding: 4,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
    padding: 5,
    paddingLeft: 7,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 5,
    fontSize: 16,
  },
});
