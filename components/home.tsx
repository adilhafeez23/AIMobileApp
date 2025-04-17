import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import CardList from './cardList';
import AIModal from './aimodel';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface RootState {
  auth: {
    user: any; // replace 'any' with the actual type of 'user' if known
  };
}

function Home() {
  const [isChatVisible, setChatVisible] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('User:', user);
  return (
    <View style={styles.wrapper}>
      {/* Background image with overlay */}
      <ImageBackground
        source={require('../assets/BackgroundImg.jpeg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Main content */}
      <View style={styles.content}>
        {/* Header with Welcome Text and Account Icon */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome {user ? user.username : ''}</Text>
            <Text style={styles.subText}>Ready to start your fitness journey</Text>
          </View>
                {/* @ts-ignore */} 
          <TouchableOpacity style={styles.accountButton} onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../assets/user.png')} // replace with your account icon image
              style={styles.accountIcon}
            />
          </TouchableOpacity>
        </View>
  
          {/* CardList component */}
          <View style={{ width: '100%' }}>
            <CardList />
          </View>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => setChatVisible(true)}
        >
          <Image
            source={require('../assets/aiModel.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.badgeFooter}>
  <View style={styles.badgeContainer}>
    <View style={styles.badgeItem}>
      <Image
        source={require('../assets/Badges/SilverBadge.png')}
        style={styles.badgeIcon}
      />
      <Text style={styles.badgeText}>Badge Earned</Text>
    </View>
    <View style={styles.badgeItem}>
      <Image
        source={require('../assets/Badges/flame.png')}
        style={styles.badgeIcon}
      />
      <Text style={styles.badgeText}>7-Day Streak</Text>
    </View>
  </View>
      </View>
        <Modal visible={isChatVisible} animationType="slide">
          <AIModal onClose={() => setChatVisible(false)} />
        </Modal>
      </View>
      


    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust for dimming
  },
  content: {
    flex: 1,
    zIndex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  welcomeContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 14,
    color: '#ddd',
  },
  accountButton: {
    padding: 5,
  },
  accountIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  chatButton: {
    position: 'absolute',
    zIndex: 10,
    bottom: 30,
    right: 30,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  
  badgeFooter: {
    position: 'absolute',
    bottom: 100, // places it above the chatButton
    width: '90%',
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  badgeIcon: {
    width: 35,
    height: 35,
    marginRight: 6,
  },
  
  badgeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  
  
});

export default Home;
