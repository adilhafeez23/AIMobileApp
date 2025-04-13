import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');

const CardList = () => {
  const cards = [
    {
      id: 1,
      title: 'Chin-ups',
      description: 'Chin-ups are a bodyweight exercise where you hang from a bar with an underhand grip (palms facing you) and pull yourself up until your chin is above the bar.',
      image: require('../assets/AnimationPics/jpg/ChinUps.png')},
      {
        id: 2,
        title: 'Dumbbells',
        description: 'Dumbbells are handheld weights used for a variety of resistance exercises like curls, presses, and rows.',
        image: require('../assets/AnimationPics/jpg/Dumbels.png')
      
      },
        {
          id: 3,
          title: 'Push-ups',
          description: 'Push-ups are a bodyweight exercise performed by raising and lowering your body using your arms while keeping a straight posture.',
          image: require('../assets/AnimationPics/jpg/PushUps.png')
        },
          {
            id: 4,
            title: 'Sit-ups',
            description: 'Sit-ups involve lying on your back, bending your knees, and lifting your upper body towards your knees using your core muscles.',
            image: require('../assets/AnimationPics/jpg/SitUps.png')
          },
            {
              id: 5,
              title: 'Weightlifting',
              description: 'Weightlifting typically involves lifting barbells or other weighted equipment through structured movements like squats, deadlifts, and presses.',
              image: require('../assets/AnimationPics/jpg/WeightLifting.png')
            }
          ];
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.responseContainer}  showsVerticalScrollIndicator={false}>
      {/* @ts-ignore */} 
      <TouchableOpacity onPress={() => navigation.navigate('ExerciseDetails')}>
        <View style={styles.container}>
      <ImageBackground
        source={require('../assets/CardImgs/CardImg01.jpeg')}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <View style={styles.row}>
          <View style={styles.animationContainer}>
          <Image
      source={require('../assets/AnimationPics/jpg/Running.png')} // <- your image path here
      style={styles.image} // make sure to define this in your styles
      resizeMode="contain" // or "cover", depending on your need
    />
            {/* <LottieView
              source={require('../assets/animations/animation1.json')}
              autoPlay
              loop
              style={styles.animation}
            /> */}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              This is the title of the card
            </Text>
            <Text
              style={styles.description}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Description of the card goes here. It can be a bit longer to show how it wraps.
            </Text>
          </View>
        </View>
      </ImageBackground>
        </View>
        </TouchableOpacity>
        
        {cards.map((card) => ( <View style={styles.container}>
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => navigation.navigate('CardDetails', { data: card})}>
        <ImageBackground
            source={require('../assets/CardImgs/CardImg01.jpeg')}
            style={styles.card}
            imageStyle={styles.cardImage}
        >
            <View style={styles.row}>
            <View style={styles.animationContainer}>
            <Image
      source={card.image} // <- your image path here
      style={styles.image} // make sure to define this in your styles
      resizeMode="contain" // or "cover", depending on your need
    />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {card.title}
                </Text>
                <Text
                style={styles.description}
                numberOfLines={2}
                ellipsizeMode="tail"
                >
                {card.description}
                </Text>
            </View>
            </View>
        </ImageBackground>
        </TouchableOpacity>
        </View>  )
        )}
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0c161f',
    marginBottom: 16,
    borderRadius: 12,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'transparent',
    height: height * 0.8,    
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    resizeMode: 'cover',
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  animationContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: 'transparent'
  },
  animation: {
    width: '100%',
    height: 100,
  },
  textContainer: {
    flex: 6,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#eee',
  },
});

export default CardList;
