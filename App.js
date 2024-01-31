import React, { useState } from 'react';
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StripeProvider, useConfirmSetupIntent } from '@stripe/stripe-react-native';

export default function App() {
  const { confirmSetupIntent } = useConfirmSetupIntent();
  const [donationAmount, setDonationAmount] = useState('');
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleDonateNow = async () => {
    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationAmount: parseFloat(donationAmount), // Adjust this as needed
          // Other data your server expects
        }),
      });
  
      const result = await response.json();
  
      // Handle the result as needed
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Error making donation:', error);
    }
  };

  const handleDonationOption = (amount) => {
    setDonationAmount(amount.toString());
  };

  const handleCreditCardClick = () => {
    setShowCreditCardForm(true);
  };

  const handleDonateSubmit = () => {
    console.log('Donation submitted:', donationAmount);
    // Include logic to process the donation with the chosen amount (donationAmount)
  };

  return (
    <StripeProvider publishableKey="pk_test_51OeQ8KBreDsp0T1J9unY7l2maoqFQNtGi0gxNitUCNZmDgtvToFsxBjkgdmhMb5ieUF4NCwVirJGv7XPdY5GqXL500ucMV2STI">
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <ImageBackground
                source={require("./assets/images/Header.jpg")}
                style={styles.headerImage}
              >
                <View style={styles.overlay}>
                  <Text style={styles.headerText}>Support Our Veterans</Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.whiteSpace}></View>
            {/* Donation Options */}
            <View style={styles.donationFormContainer}>
              <View style={styles.donationOptions}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleDonationOption(10)}
                >
                  <Text style={styles.optionText}>$10</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleDonationOption(25)}
                >
                  <Text style={styles.optionText}>$25</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleDonationOption(50)}
                >
                  <Text style={styles.optionText}>$50</Text>
                </TouchableOpacity>
              </View>

              {/* Donation Form */}
              <View style={styles.inputContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={styles.donationInput}
                  placeholder="Enter donation amount"
                  keyboardType="ascii-capable"
                  value={donationAmount}
                  onChangeText={(text) => setDonationAmount(text)}
                />
              </View>

              {showCreditCardForm && (
                <View style={styles.creditCardForm}>
                  <Text style={styles.formLabel}>Card Number</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="1234 5678 9101 1121"
                    keyboardType="ascii-capable"
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                  />

                  <View style={styles.formRow}>
                    <View style={styles.formColumn}>
                      <Text style={styles.formLabel}>Expiration Date</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="MM/YY"
                        keyboardType="ascii-capable"
                        value={expirationDate}
                        onChangeText={(text) => setExpirationDate(text)}
                      />
                    </View>

                    <View style={styles.formColumn}>
                      <Text style={styles.formLabel}>CVV</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="123"
                        keyboardType="ascii-capable"
                        value={cvv}
                        onChangeText={(text) => setCvv(text)}
                      />
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={styles.donationSubmitButton}
                onPress={handleCreditCardClick}
              >
                <Text style={styles.buttonText}>Credit Card</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.whiteSpace}></View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.donateButton}
                onPress={handleDonateNow}
              >
                <Text style={styles.buttonText}>Donate Now</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.donationSubmitButton}
                onPress={handleDonateSubmit}
              >
                <Text style={styles.buttonText}>Confirm Donation</Text>
              </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: '30%',
  },
  headerImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentText: {
    color: '#E94560',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  donationFormContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  donationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#E94560',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dollarSign: {
    fontSize: 16,
    marginRight: 5,
    color: '#E94560',
  },
  donationInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    paddingLeft: 10,
  },
  donationSubmitButton: {
    backgroundColor: '#E94560',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10, // Added margin top to separate buttons
  },
  whiteSpace: {
    flex: 0.2,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  donateButton: {
    backgroundColor: '#E94560',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditCardForm: {
    marginTop: 10,
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  formInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formColumn: {
    flex: 1,
    marginRight: 10,
  },
});

