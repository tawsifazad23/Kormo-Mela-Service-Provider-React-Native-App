// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';

// const ServiceProviderChatScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { conversation } = route.params;
//   const customerName = `${conversation.service_provider_request.job_posting.user.first_name} ${conversation.service_provider_request.job_posting.user.last_name}`;
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const flatListRef = useRef(null);

//   const fetchMessages = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         Alert.alert('Error', 'No token found');
//         return;
//       }

//       const response = await axios.get(`http://127.0.0.1:8000/api/user/get-messages-service-provider/${conversation.id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });

//       if (response.status === 200) {
//         setMessages(response.data);
//       } else {
//         Alert.alert('Error', 'Failed to fetch messages');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch messages');
//     }
//   };

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (!token) {
//           Alert.alert('Error', 'No token found');
//           return;
//         }

//         const response = await axios.post('http://127.0.0.1:8000/api/user/send-message-service-provider/', {
//           chat_id: conversation.id,
//           message: message,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         });

//         if (response.status === 200) {
//           setMessage('');
//           fetchMessages();
//         } else {
//           Alert.alert('Error', 'Failed to send message');
//         }
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Error', 'Failed to send message');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchMessages();

//     const interval = setInterval(fetchMessages, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd({ animated: true });
//     }
//   }, [messages]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.customerName}>{customerName}</Text>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('TripInfo', { conversation })}
//           style={styles.infoButton}
//         >
//           <Ionicons name="information-circle-outline" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageItem,
//               item.isUserMessage ? styles.userMessage : styles.customerMessage,
//             ]}
//           >
//             <Text style={styles.messageText}>{item.message}</Text>
//             <Text style={styles.messageTime}>{new Date(item.time).toLocaleString()}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.messagesList}
//         onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type your message"
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     backgroundColor: '#f1f1f1',
//   },
//   backButton: {
//     padding: 10,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//   },
//   infoButton: {
//     padding: 10,
//   },
//   messagesList: {
//     flexGrow: 1,
//     padding: 10,
//   },
//   messageItem: {
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//     maxWidth: '70%',
//   },
//   customerMessage: {
//     backgroundColor: '#e1ffc7',
//     alignSelf: 'flex-start',
//   },
//   userMessage: {
//     backgroundColor: '#cce5ff',
//     alignSelf: 'flex-end',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   messageTime: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     backgroundColor: '#f1f1f1',
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default ServiceProviderChatScreen;
// ServiceProviderChatScreen.js


// ServiceProviderChatScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ServiceProviderChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { conversation } = route.params;
  const customerName = `${conversation.service_provider_request.job_posting.user.first_name} ${conversation.service_provider_request.job_posting.user.last_name}`;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/user/get-messages-service-provider/${conversation.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        setMessages(response.data);
      } else {
        Alert.alert('Error', 'Failed to fetch messages');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch messages');
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found');
          return;
        }

        const response = await axios.post('http://127.0.0.1:8000/api/user/send-message-service-provider/', {
          chat_id: conversation.id,
          message: message,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.status === 200) {
          setMessage('');
          fetchMessages();
        } else {
          Alert.alert('Error', 'Failed to send message');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to send message');
      }
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.customerName}>{customerName}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TripInfo', { conversation })}
          style={styles.infoButton}
        >
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageItem,
              item.isUserMessage ? styles.userMessage : styles.customerMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{new Date(item.time).toLocaleString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f1f1f1',
  },
  backButton: {
    padding: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  infoButton: {
    padding: 10,
  },
  messagesList: {
    flexGrow: 1,
    padding: 10,
  },
  messageItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    maxWidth: '70%',
  },
  customerMessage: {
    backgroundColor: '#e1ffc7',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#cce5ff',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f1f1f1',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ServiceProviderChatScreen;
