import React from 'react';
import { FlatList, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import SongScreen from './SongScreen'
import { Card } from "react-native-elements";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const xOffset = new Animated.Value(0);

export default class SongSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  // static navigationOptions = {
  //   title: this.props.navigation.state.params.song.name,
  // };
  
 render() {
  let SCREEN_WIDTH = Dimensions.get("window").width;
    return (
      <AnimatedFlatList
        horizontal
        data={this.props.navigation.state.params.song.slides}
        pagingEnabled
        renderItem={({ item: text }) => {
          return (
            <Card
              title={null}
              key={text}
              containerStyle={{ padding: 0, width: SCREEN_WIDTH - 30 }}
            >
              <Text style={styles.text}>
                {text}
              </Text>
            </Card>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  text: {
    lineHeight: 40,
    fontSize: 16,
    margin: 20,
    textAlign: 'center'
  }
});
