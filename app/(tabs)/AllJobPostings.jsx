import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export default function AllJobPostings() {
  const [jobPostings, setJobPostings] = useState([]);
  const [requestedPostings, setRequestedPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  const fetchJobPostings = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await fetch('http://127.0.0.1:8000/api/user/relevant-job-postings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setJobPostings(sortedData);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to fetch job postings.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const fetchRequestedPostings = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await fetch('http://127.0.0.1:8000/api/user/requested-job-postings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRequestedPostings(sortedData);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to fetch requested job postings.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    fetchJobPostings();
    fetchRequestedPostings();
    setLoading(false);

    const intervalId = setInterval(() => {
      fetchJobPostings();
      fetchRequestedPostings();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === 'requested') {
      fetchRequestedPostings();
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const filterJobPostings = () => {
    if (filter === 'all') {
      return jobPostings;
    }
    if (filter === 'requested') {
      return requestedPostings;
    }
    return [];
  };

  const handleRequest = async (jobId, action) => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await fetch('http://127.0.0.1:8000/api/user/service-provider-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ job_posting_id: jobId, action: action }),
      });

      if (response.ok) {
        Alert.alert('Success', `${action === 'send_request' ? 'Request sent' : 'Request cancelled'} successfully.`);
        fetchJobPostings();
        fetchRequestedPostings();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || `Failed to ${action === 'send_request' ? 'send' : 'cancel'} request.`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const isRequested = (jobId) => {
    return requestedPostings.some((job) => job.id === jobId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image source={{ uri: 'https://t3.ftcdn.net/jpg/05/29/37/20/360_F_529372045_2BCnHW6egaQxt0JFsa297F3UpIisNMHd.jpg' }} style={styles.logo} />
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: 'https://img.freepik.com/premium-photo/smiling-car-delivery-driver-headshot_810293-317090.jpg' }} style={styles.profileLogo} />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]} onPress={() => handleFilterChange('all')}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'requested' && styles.activeFilterButton]} onPress={() => handleFilterChange('requested')}>
          <Text style={styles.filterButtonText}>Requested</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      ) : filterJobPostings().length === 0 ? (
        <SafeAreaView style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No job postings found.</Text>
        </SafeAreaView>
      ) : (
        <ScrollView>
          {filterJobPostings().map((job, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{job.service_type}</Text>
              <Text style={styles.period}>{job.service_period}</Text>
              <Text style={styles.rate}>{job.service_rate} Taka</Text>
              <Text style={styles.location}>{job.onboarding_location}</Text>
              <Text style={styles.summary}>{job.job_summary}</Text>
              <TouchableOpacity
                style={isRequested(job.id) ? styles.cancelButton : styles.requestButton}
                onPress={() => handleRequest(job.id, isRequested(job.id) ? 'unsend_request' : 'send_request')}
              >
                <Text style={styles.requestButtonText}>{isRequested(job.id) ? 'Cancel Request' : 'Send Request'}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 1,
  },
  greeting: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  profileLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 110,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  period: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  rate: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#777',
  },
  requestButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#28a745',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#dc3545',
  },
  requestButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

