import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomText from '@/components/shared/CustomText';
import BottomNavBar from '@/components/customer/BottomNavBar';
import { Colors } from '@/utils/Constants';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ActivityItem {
  id: string;
  type: 'ride' | 'delivery';
  title: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Cancelled';
}

// Sample activity data
const activityData: ActivityItem[] = [
  {
    id: '1',
    type: 'ride',
    title: 'Ride to City Center',
    date: '12 Jun, 2024',
    amount: '$12.50',
    status: 'Completed'
  },
  {
    id: '2',
    type: 'delivery',
    title: 'Food Delivery',
    date: '10 Jun, 2024',
    amount: '$8.75',
    status: 'Completed'
  },
  {
    id: '3',
    type: 'ride',
    title: 'Airport Transfer',
    date: '5 Jun, 2024',
    amount: '$35.00',
    status: 'Completed'
  },
  {
    id: '4',
    type: 'ride',
    title: 'Daily Commute',
    date: '3 Jun, 2024',
    amount: '$10.25',
    status: 'Cancelled'
  }
];

const Activity = () => {
  const renderActivityItem = ({ item }: { item: ActivityItem }) => (
    <View style={styles.activityItem}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={item.type === 'ride' ? 'car-outline' : 'restaurant-outline'} 
          size={RFValue(20)} 
          color={Colors.primary} 
        />
      </View>
      <View style={styles.activityDetails}>
        <CustomText fontFamily="Medium" variant="h6">{item.title}</CustomText>
        <CustomText fontFamily="Regular" variant="h7" style={styles.dateText}>{item.date}</CustomText>
      </View>
      <View style={styles.priceContainer}>
        <CustomText fontFamily="SemiBold" variant="h6">{item.amount}</CustomText>
        <CustomText 
          fontFamily="Regular" 
          variant="h8" 
          style={{
            color: item.status === 'Completed' ? '#4CAF50' : '#F44336',
          }}
        >
          {item.status}
        </CustomText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Colors.primary}
        translucent={false}
      />
      <View style={styles.header}>
        <CustomText fontFamily="SemiBold" variant="h3">
          Your Activity
        </CustomText>
      </View>
      
      <FlatList
        data={activityData}
        renderItem={renderActivityItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 15,
    paddingBottom: 80, // Extra padding for the bottom nav bar
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.background,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary_light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  dateText: {
    color: '#777',
    marginTop: 3,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
});

export default Activity; 