import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import HomeView from '../ui/HomeView';

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HomeView navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
});
