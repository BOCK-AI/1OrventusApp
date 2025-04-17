import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../shared/CustomText';
import { Colors } from '@/utils/Constants';

interface NavItem {
  name: string;
  route: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Home', route: '/customer/home', icon: 'home-outline' },
  { name: 'Services', route: '/customer/services', icon: 'apps-outline' },
  { name: 'Activity', route: '/customer/activity', icon: 'time-outline' },
  { name: 'Account', route: '/customer/account', icon: 'person-outline' },
];

const BottomNavBar = () => {
  // Get current route to highlight active tab
  const currentRoute = router.pathname || '/customer/home';

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => router.navigate(item.route)}
        >
          <Ionicons
            name={item.icon as any}
            size={RFValue(18)}
            color={currentRoute === item.route ? Colors.primary : '#888'}
          />
          <CustomText
            fontFamily="Medium"
            fontSize={10}
            style={{
              color: currentRoute === item.route ? Colors.primary : '#888',
              marginTop: 4,
            }}
          >
            {item.name}
          </CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 5,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavBar; 