import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomText from '@/components/shared/CustomText';
import BottomNavBar from '@/components/customer/BottomNavBar';
import { Colors } from '@/utils/Constants';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  danger?: boolean;
}

const menuItems: MenuItem[] = [
  { id: '1', title: 'Edit Profile', icon: 'person-outline' },
  { id: '2', title: 'Payment Methods', icon: 'card-outline' },
  { id: '3', title: 'Addresses', icon: 'location-outline' },
  { id: '4', title: 'Notifications', icon: 'notifications-outline' },
  { id: '5', title: 'Help & Support', icon: 'help-circle-outline' },
  { id: '6', title: 'About', icon: 'information-circle-outline' },
  { id: '7', title: 'Logout', icon: 'log-out-outline', danger: true },
];

const Account = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Colors.primary}
        translucent={false}
      />
      
      {/* Profile section */}
      <View style={styles.profileSection}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <CustomText fontFamily="SemiBold" variant="h4">
            John Doe
          </CustomText>
          <CustomText fontFamily="Regular" variant="h6" style={styles.emailText}>
            john.doe@example.com
          </CustomText>
        </View>
      </View>
      
      {/* Menu section */}
      <View style={styles.menuSection}>
        {menuItems.map(item => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => console.log(`Tapped on ${item.title}`)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons 
                name={item.icon as any} 
                size={RFValue(20)} 
                color={item.danger ? '#F44336' : Colors.text} 
              />
              <CustomText 
                fontFamily="Medium" 
                variant="h6" 
                style={[
                  styles.menuItemText,
                  item.danger && styles.dangerText
                ]}
              >
                {item.title}
              </CustomText>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={RFValue(20)} 
              color="#999" 
            />
          </TouchableOpacity>
        ))}
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    paddingTop: 50,
    backgroundColor: Colors.secondary_light,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  emailText: {
    color: '#777',
    marginTop: 3,
  },
  menuSection: {
    padding: 15,
    paddingBottom: 80, // Extra padding for the bottom nav bar
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
  },
  dangerText: {
    color: '#F44336',
  },
});

export default Account; 