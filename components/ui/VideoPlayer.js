/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';
import {
  addVideoPBAction,
  removeVideoPBAction,
} from '../storage/redux/videoplayback/VideoPBActions';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {useIsFocused} from "@react-navigation/native";

const {width} = Dimensions.get('window');
var durationVal = 0;
var positionVal = 0;

const VideoPlayer = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const videoLimitInPer = 15;
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('stretch');

  const videoPosition = () => {
    if (props.item.position === undefined || props.item.position === null) {
      return 0;
    } else {
      return props.item.position / 1000;
    }
  };

  useEffect(() => {
      if (!isFocused) {
        var lowerLimit = (videoLimitInPer * durationVal) / 100;
        var upperLimit = ((100 - videoLimitInPer) * durationVal) / 100;
        if (positionVal < upperLimit && positionVal > lowerLimit) {
          dispatch(
            addVideoPBAction({
              id: props.item.id,
              sources: props.item.sources,
              title: props.item.title,
              thumb: props.item.thumb,
              position: positionVal,
              duration: durationVal,
            }),
          );
        } else {
          dispatch(removeVideoPBAction(props.item.id));
        }
      }
  }, [isFocused]);

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    durationVal = data.playableDuration * 1000;
    positionVal = data.currentTime * 1000;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
    videoPlayer.current.seek(videoPosition());
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType === 'content') {setScreenType('cover');}
    else {setScreenType('content');}
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTimeStatus) => setCurrentTime(currentTimeStatus);

  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri:props.item.sources,
        }}
        style={styles.mediaPlayer}
        volume={5}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    video: {
      alignSelf: 'center',
      width: width,
      height:'auto',
    },
    container: {
        flex: 1,
      },
      toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
      },
  });

export default VideoPlayer;
