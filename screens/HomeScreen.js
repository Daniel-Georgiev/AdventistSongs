import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements'
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import songList from '../songs/songList' 

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    songs: songList
  }


  performTagSearch(text){
    if(text !== ''){
      let output = [];
      songList.forEach((song, idx) => {
        song.tags.forEach((tag, idx)=>{
          if(tag.includes(text.toLowerCase())){
            if(output.indexOf(song) === -1)
            output.push(song)
          }
        })
      })
      this.setState({
        songs: output
      })
    }else{
      this.setState({
        songs: songList
      })
    }
  }

  resetSearch(){
    console.log(songList)
    this.setState({
      songs: songList
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (  
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <SearchBar style={styles.searchBar}
            lightTheme
            onChangeText={this.performTagSearch.bind(this)}
            placeholder='Type Here...' />
          <View style={styles.songList}>
            {
              this.state.songs.map((l, i) => (
                <ListItem
                  title={l.name}
                  onPress={() =>
                    navigate('Song', { song: this.state.songs[i] })
                  }
                  subtitle={l.subtitle}
                  key={`${l}_${i}`}
                />
              ))
            }
          </View>
        

        
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },

  searchBar: {
    width: '100%'
  }
});
