import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselPBItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselPBItem';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const VideoPlayBackList = () => {
  const videoPBData = useSelector(state => state.VideoPBReducer);
  const initVal = [];
  const [videoPBList, setVideoPBList] = useState(initVal);
  useEffect(() => {
    setVideoPBList(videoPBData);
  }, [videoPBData]);

  const isCarouselPB = React.useRef(null);
  return videoPBList.length > 0 ? (
    <View style={styles.container}>
      <Text style={styles.header}>Continue Watching..</Text>
      <Carousel
        layoutCardOffset={0}
        ref={isCarouselPB}
        data={videoPBList}
        renderItem={CarouselPBItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        autoplay={false}
        loop={true}
      />
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
    width: '100%',
    alignSelf: 'flex-end',
  },
});

export default VideoPlayBackList;
