/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';

export const SLIDER_WIDTH = Dimensions.get('window').width + 0;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.65);
export const IMAGE_DIMEN = Math.round(SLIDER_WIDTH * 0.65) / 3;

const CarouselPBItem = ({item, index}) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.container}
      onPress={() => this.navigatedToPlayer(item)}>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Image
            source={{uri: item.thumb}}
            style={styles.image}
            resizeMode="stretch"
          />
          <View>
            <Text style={styles.header}>{item.title}</Text>
            <Text style={styles.header}>
              Duration: {Math.round(item.duration / 1000)} Sec
            </Text>
            <Text style={styles.header}>
              Position: {Math.round(item.position / 1000)} Sec
            </Text>
          </View>
        </View>
        <View>
          <Progress.Bar
            progress={item.position / item.duration}
            width={ITEM_WIDTH - 20}
            color={'red'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00172d',
    borderRadius: 8,
    width: ITEM_WIDTH,
    padding: 10,
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
    width: IMAGE_DIMEN,
    height: IMAGE_DIMEN,
    borderRadius: 8,
    marginEnd: 10,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 3,
    color: 'white',
  },
});

export default CarouselPBItem;
