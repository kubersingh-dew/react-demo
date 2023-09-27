import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.65);

const CarouselCardItem = ({item, index}) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.container}
      onPress={() => this.navigatedToPlayer(item)}>
      <Image
        source={{uri: item.thumb}}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.header}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_WIDTH,
    height: 180,
  },
  header: {
    color: '#222',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export default CarouselCardItem;
