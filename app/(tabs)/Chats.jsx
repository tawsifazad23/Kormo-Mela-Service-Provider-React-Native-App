import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ServiceProviderMessages = () => {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/user/service-provider/conversations', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.status === 200) {
          setConversations(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch conversations');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch conversations');
      }
    };

    // Fetch conversations immediately on component mount
    fetchConversations();

    // Set up interval to fetch conversations every 2 seconds
    const interval = setInterval(fetchConversations, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleChatPress = (conversation) => {
    navigation.navigate('ChatScreen', { conversation });
  };

  const handleInfoPress = (conversation) => {
    navigation.navigate('TripInfo', { conversation });
  };

  const formatTime = (time) => {
    const now = new Date();
    const messageTime = new Date(time);
    const today = now.toDateString() === messageTime.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = yesterday.toDateString() === messageTime.toDateString();

    const hours = messageTime.getHours();
    const minutes = messageTime.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

    if (today) {
      return `Today • ${formattedTime}`;
    } else if (isYesterday) {
      return `Yesterday • ${formattedTime}`;
    } else {
      return `${messageTime.getDate()}/${messageTime.getMonth() + 1}/${messageTime.getFullYear()} • ${formattedTime}`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Current Conversations</Text>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <View style={styles.chatItemContainer}>
            <TouchableOpacity onPress={() => handleChatPress(item)} style={styles.chatItem}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs10cupyp3Wf-pZvdPjGQuKne14ngVZbYdDQ&s' }} // Replace with the actual profile pic URL
                style={styles.profilePic}
              />
              <View style={styles.chatContent}>
                <Text style={styles.chatTitle}>
                  {item.service_provider_request.job_posting.user.first_name} {item.service_provider_request.job_posting.user.last_name}
                </Text>
                <Text style={styles.chatMessage}>
                  {item.last_message.message.length > 50 ? `${item.last_message.message.substring(0, 50)}...` : item.last_message.message}
                  <Text style={styles.messageTime}> • {formatTime(item.last_message.time)}</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoButton} onPress={() => handleInfoPress(item)}>
              <Ionicons name="information-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  chatList: {
    padding: 10,
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessage: {
    marginTop: 3,
    fontSize: 14,
    color: '#777',
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
  },
  infoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default ServiceProviderMessages;
