import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {navigate} from './RootNavigation';

const ListComponent = props => {
  navigatedToPlayer = item => {
    navigate('Player', {item});
  };

  return (
    <View>
      {props.list.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.container}
          onPress={() => this.navigatedToPlayer(item)}>
          <Image
            source={{
              uri: item.thumb,
            }}
            style={styles.image}
            resizeMode="cover"
            onError={error => console.error(error)}
          />
          <Text style={styles.header}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 'auto',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: 20,
    overflow: 'hidden',
  },
  image: {
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height: 190,
  },
  header: {
    color: '#222',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export default ListComponent;
