// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useRouter } from 'expo-router';

// export default function SignupScreen() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [nid, setNid] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [role, setRole] = useState('driver');
//   const [licenseNumber, setLicenseNumber] = useState('');
//   const [vehicleType, setVehicleType] = useState('');
//   const [experienceYears, setExperienceYears] = useState('');
//   const [skills, setSkills] = useState('');
//   const [errors, setErrors] = useState({});

//   const router = useRouter();

//   const handleSignup = async () => {
//     const newErrors = {};
//     if (!firstName) newErrors.firstName = true;
//     if (!lastName) newErrors.lastName = true;
//     if (!email) newErrors.email = true;
//     if (!password) newErrors.password = true;
//     if (!confirmPassword) newErrors.confirmPassword = true;
//     if (!phone) newErrors.phone = true;
//     if (!address) newErrors.address = true;
//     if (!nid) newErrors.nid = true;

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     const data = {
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       password: password,
//       phone: phone,
//       address: address,
//       nid: nid,
//       date_of_birth: dateOfBirth.toISOString().split('T')[0],
//       role: role,
//       years_in_industry: 0, // Default value if not provided
//       intro_video: null, // Default value for intro video
//       app_verified_date: new Date().toISOString().split('T')[0], // Current date as verified date
//       license_number: role === 'driver' ? licenseNumber : undefined,
//       vehicle_type: role === 'driver' ? vehicleType : undefined,
//       experience_years: role === 'maid' ? experienceYears : undefined,
//       skills: role === 'maid' ? skills : undefined,
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/user/signup/serviceprovider', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         Alert.alert('Signup Successful', responseData.message);
//         router.push('/(tabs)/AllJobPostings');
//       } else {
//         const errorData = await response.json();
//         Alert.alert('Error', errorData.error ? errorData.error : 'Signup failed');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.container}>
//           <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//             <Text style={styles.backButtonText}>Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Service Provider Signup</Text>
//           <TextInput
//             style={[styles.input, errors.firstName && styles.inputError]}
//             placeholder="First Name"
//             value={firstName}
//             onChangeText={setFirstName}
//           />
//           <TextInput
//             style={[styles.input, errors.lastName && styles.inputError]}
//             placeholder="Last Name"
//             value={lastName}
//             onChangeText={setLastName}
//           />
//           <TextInput
//             style={[styles.input, errors.email && styles.inputError]}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//           <TextInput
//             style={[styles.input, errors.password && styles.inputError]}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TextInput
//             style={[styles.input, errors.confirmPassword && styles.inputError]}
//             placeholder="Confirm Password"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TextInput
//             style={[styles.input, errors.phone && styles.inputError]}
//             placeholder="Phone (+880 1234567890)"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//           />
//           <TextInput
//             style={[styles.input, errors.address && styles.inputError]}
//             placeholder="Address"
//             value={address}
//             onChangeText={setAddress}
//           />
//           <TextInput
//             style={[styles.input, errors.nid && styles.inputError]}
//             placeholder="NID"
//             value={nid}
//             onChangeText={setNid}
//           />
//           <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
//             <Text style={styles.datePickerText}>Date of Birth: {dateOfBirth.toISOString().split('T')[0]}</Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={dateOfBirth}
//               mode="date"
//               display="spinner"
//               onChange={(event, selectedDate) => {
//                 const currentDate = selectedDate || dateOfBirth;
//                 setShowDatePicker(false);
//                 setDateOfBirth(currentDate);
//               }}
//             />
//           )}
//           <View style={styles.segmentedControlContainer}>
//             <TouchableOpacity
//               style={[styles.segmentedControlButton, role === 'driver' && styles.segmentedControlButtonActive]}
//               onPress={() => setRole('driver')}
//             >
//               <Text style={[styles.segmentedControlButtonText, role === 'driver' && styles.segmentedControlButtonTextActive]}>Driver</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.segmentedControlButton, role === 'maid' && styles.segmentedControlButtonActive]}
//               onPress={() => setRole('maid')}
//             >
//               <Text style={[styles.segmentedControlButtonText, role === 'maid' && styles.segmentedControlButtonTextActive]}>Maid</Text>
//             </TouchableOpacity>
//           </View>
//           {role === 'driver' && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="License Number"
//                 value={licenseNumber}
//                 onChangeText={setLicenseNumber}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Vehicle Type"
//                 value={vehicleType}
//                 onChangeText={setVehicleType}
//               />
//             </>
//           )}
//           {role === 'maid' && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Experience Years"
//                 value={experienceYears}
//                 onChangeText={setExperienceYears}
//                 keyboardType="numeric"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Skills"
//                 value={skills}
//                 onChangeText={setSkills}
//               />
//             </>
//           )}
//           <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
//             <Text style={styles.signupButtonText}>Signup</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//   },
//   container: {
//     width: '100%',
//     padding: 16,
//     backgroundColor: '#f8f9fa',
//     alignItems: 'center',
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     marginBottom: 16,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#007bff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     color: '#007bff',
//   },
//   input: {
//     width: '100%',
//     padding: 8,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     backgroundColor: '#fff',
//   },
//   inputError: {
//     borderColor: 'red',
//   },
//   datePicker: {
//     width: '100%',
//     padding: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     backgroundColor: '#fff',
//   },
//   datePickerText: {
//     color: '#333',
//   },
//   segmentedControlContainer: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   segmentedControlButton: {
//     flex: 1,
//     paddingVertical: 10,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   segmentedControlButtonActive: {
//     backgroundColor: '#007bff',
//   },
//   segmentedControlButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   segmentedControlButtonTextActive: {
//     color: '#fff',
//   },
//   signupButton: {
//     width: '100%',
//     padding: 10,
//     backgroundColor: '#007bff',
//     borderColor: '#007bff',
//     borderWidth: 1,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   signupButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });
import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity,
  SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

const FormInput = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, error, onFocus }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onFocus={onFocus}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nid, setNid] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [role, setRole] = useState('driver');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [skills, setSkills] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef(null);

  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (email !== confirmEmail) newErrors.confirmEmail = 'Emails do not match';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!address) newErrors.address = 'Address is required';
    if (!nid) newErrors.nid = 'NID is required';
    if (!/^\d{10}$/.test(nid)) newErrors.nid = 'NID must be 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      phone: `+880${phone}`,
      address: address,
      nid: nid,
      date_of_birth: dateOfBirth.toISOString().split('T')[0],
      role: role,
      years_in_industry: 0, // Default value if not provided
      intro_video: null, // Default value for intro video
      app_verified_date: new Date().toISOString().split('T')[0], // Current date as verified date
      license_number: role === 'driver' ? licenseNumber : undefined,
      vehicle_type: role === 'driver' ? vehicleType : undefined,
      experience_years: role === 'maid' ? experienceYears : undefined,
      skills: role === 'maid' ? skills : undefined,
    };

    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/user/signup/serviceprovider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('Signup Successful', responseData.message);
        router.push('/(tabs)/AllJobPostings');
      } else {
        Alert.alert('Error', responseData.error ? responseData.error : 'Signup failed');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password) => {
    if (!password) return 'Weak';
    const strength = password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
    if (password.length > 12 && strength) return 'Strong';
    if (strength) return 'Medium';
    return 'Weak';
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 'Strong':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'Weak':
      default:
        return 'red';
    }
  };

  const handleInputFocus = (ref) => {
    ref.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Service Provider Signup</Text>
              <FormInput
                label="First Name"
                placeholder="e.g. Mohammad"
                value={firstName}
                onChangeText={setFirstName}
                error={errors.firstName}
                onFocus={() => handleInputFocus(scrollViewRef)}
              />
              <FormInput
                label="Last Name"
                placeholder="e.g. Rahman"
                value={lastName}
                onChangeText={setLastName}
                error={errors.lastName}
                onFocus={() => handleInputFocus(scrollViewRef)}
              />
              <FormInput
                label="Email"
                placeholder="e.g. example@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                error={errors.email}
                onFocus={() => handleInputFocus(scrollViewRef)}
              />
              <FormInput
                label="Confirm Email"
                placeholder="e.g. example@example.com"
                value={confirmEmail}
                onChangeText={setConfirmEmail}
                keyboardType="email-address"
                error={errors.confirmEmail}
                onFocus={() => handleInputFocus(scrollViewRef)}
              />
              <View style={styles.passwordContainer}>
                <FormInput
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  error={errors.password}
                  onFocus={() => handleInputFocus(scrollViewRef)}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
                  <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.passwordStrength, { color: getPasswordStrengthColor(getPasswordStrength(password)) }]}>
                Password Strength: {getPasswordStrength(password)}
              </Text>
              <FormInput
                label="Confirm Password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                error={errors.confirmPassword}
                onFocus={() => handleInputFocus(scrollViewRef)}
              />
              <FormInput
                label="Phone"
                placeholder="1700550078"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                error={errors.phone}
                onFocus={() => handleInputFocus(scrollViewRef)}
                inputAccessoryViewID="phone-input"
              />
              <View style={styles.phonePrefix}>
                <Text>+880 | </Text>
              </View>
              <FormInput
                label="Address"
                placeholder="e.g. 1234 Main St"
                value={address}
                onChangeText={setAddress}
                error={errors.address}
                onFocus={() => handleInputFocus(scrollViewRef)}
              />
              <FormInput
                label="National Identification Number"
                placeholder="e.g. 1234567890"
                value={nid}
                onChangeText={setNid}
                keyboardType="number-pad"
                error={errors.nid}
                onFocus={() => handleInputFocus(scrollViewRef)}
              />
              <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.datePickerText}>Date of Birth: {dateOfBirth.toISOString().split('T')[0]}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || dateOfBirth;
                    setDateOfBirth(currentDate);
                    setShowDatePicker(false);
                  }}
                />
              )}
              <View style={styles.segmentedControlContainer}>
                <TouchableOpacity
                  style={[styles.segmentedControlButton, role === 'driver' && styles.segmentedControlButtonActive]}
                  onPress={() => setRole('driver')}
                >
                  <Text style={[styles.segmentedControlButtonText, role === 'driver' && styles.segmentedControlButtonTextActive]}>Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.segmentedControlButton, role === 'maid' && styles.segmentedControlButtonActive]}
                  onPress={() => setRole('maid')}
                >
                  <Text style={[styles.segmentedControlButtonText, role === 'maid' && styles.segmentedControlButtonTextActive]}>Maid</Text>
                </TouchableOpacity>
              </View>
              {role === 'driver' && (
                <>
                  <FormInput
                    label="License Number"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChangeText={setLicenseNumber}
                    error={errors.licenseNumber}
                    onFocus={() => handleInputFocus(scrollViewRef)}
                  />
                  <FormInput
                    label="Vehicle Type"
                    placeholder="Vehicle Type"
                    value={vehicleType}
                    onChangeText={setVehicleType}
                    error={errors.vehicleType}
                    onFocus={() => handleInputFocus(scrollViewRef)}
                  />
                </>
              )}
              {role === 'maid' && (
                <>
                  <FormInput
                    label="Experience Years"
                    placeholder="Experience Years"
                    value={experienceYears}
                    onChangeText={setExperienceYears}
                    keyboardType="numeric"
                    error={errors.experienceYears}
                    onFocus={() => handleInputFocus(scrollViewRef)}
                  />
                  <FormInput
                    label="Skills"
                    placeholder="Skills"
                    value={skills}
                    onChangeText={setSkills}
                    error={errors.skills}
                    onFocus={() => handleInputFocus(scrollViewRef)}
                  />
                </>
              )}
              <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Signup</Text>
              </TouchableOpacity>
              {loading && <ActivityIndicator size="large" color="#007bff" />}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#007bff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    alignSelf: 'flex-start',
    marginTop: 4,
    color: 'red',
  },
  datePicker: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  datePickerText: {
    color: '#333',
  },
  segmentedControlContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  segmentedControlButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  segmentedControlButtonActive: {
    backgroundColor: '#007bff',
  },
  segmentedControlButtonText: {
    fontSize: 16,
    color: '#333',
  },
  segmentedControlButtonTextActive: {
    color: '#fff',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  showPasswordText: {
    fontSize: 16,
    color: '#007bff',
  },
  passwordStrength: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 12,
    color: '#333',
  },
  signupButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  phonePrefix: {
    position: 'absolute',
    left: 15,
    top: 10,
    zIndex: 1,
    color: '#333',
  },
});

export default SignupScreen;
