import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import CarouselCards from './CarouselCards';
import data from '../screen/dataModel/VideoData';
import ListComponent from './ListComponent';
import VideoPlayBackList from './VideoPlayBackList';
import axios from 'axios';
const HomeView = props => {
  const [videoData, setVideoData] = useState({});
  axios.defaults.timeout = 3000;
  useEffect(() => {
    axios
      .get(
        'https://dev-3hv323iuu5m6590.api.raw-labs.com/json-programming-heroes',
      )
      .then(function (response) {
        setVideoData(response.data);
      })
      .catch(function (error) {
        setVideoData(data);
      });
  }, []);

  return videoData.carousel !== undefined ? (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <CarouselCards data={videoData.carousel} />
        <VideoPlayBackList />
        <ListComponent
          list={videoData.videolist}
          navigation={props.navigation}
        />
      </View>
    </ScrollView>
  ) : (
    <Text>Getting Data...</Text>
  );
};

export default HomeView;
