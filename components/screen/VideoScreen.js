import React, {Component} from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import VideoPlayer from '../ui/VideoPlayer';

export default class VideoScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <VideoPlayer item={this.props.route.params.item} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
});
