import { View, StyleSheet } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomText from '@/components/shared/CustomText';
import BottomNavBar from '@/components/customer/BottomNavBar';
import { Colors } from '@/utils/Constants';

const Services = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Colors.primary}
        translucent={false}
      />
      <View style={styles.content}>
        <CustomText fontFamily="SemiBold" variant="h3">
          Services
        </CustomText>
        <CustomText fontFamily="Regular" variant="h6" style={styles.subText}>
          Explore our range of services
        </CustomText>
        
        {/* Sample content goes here */}
        <View style={styles.serviceCard}>
          <CustomText fontFamily="Medium" variant="h5">
            Transport
          </CustomText>
          <CustomText fontFamily="Regular" variant="h7" style={styles.cardText}>
            Book rides for your daily commute
          </CustomText>
        </View>
        
        <View style={styles.serviceCard}>
          <CustomText fontFamily="Medium" variant="h5">
            Delivery
          </CustomText>
          <CustomText fontFamily="Regular" variant="h7" style={styles.cardText}>
            Fast and reliable package delivery
          </CustomText>
        </View>
      </View>
      
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  subText: {
    color: '#777',
    marginTop: 5,
    marginBottom: 30,
  },
  serviceCard: {
    backgroundColor: Colors.secondary_light,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardText: {
    marginTop: 5,
    color: '#555',
  }
});

export default Services; 