import React from 'react-native'

import {
  View,
  StyleSheet,
  ScrollView,
  BackAndroid
} from 'React';
import store from 'react-native-simple-store';
import Share from 'react-native-share';
import moment from 'moment';
import Subscribable from 'Subscribable';
import Habit from './components/habit';
import Button from './components/button';

//var LinkCount = require('./components/link-count');
import chains from './components/chains';

export default React.createClass({
  mixins: [Subscribable.Mixin],

  componentWillMount: () => {
    this.addListenerOn(this.props.events, 'got-habits', (habits) => {
      this.setState({habits: habits, habit: habits[habits.length - 1]});
    });

    this.addListenerOn(this.props.events, 'new-habit', (habits) => {
      if (habits.length >= 1) {
        this.setState({habit: habits[habits.length - 1]});
      } else {
        this.setState({habit: {name: '', days: [], reminder: ''}});
      }
      console.log('main new-habit event...');

      this.sendData({flag: 'new-habit'});
    });

    this.addListenerOn(this.props.events, 'day-added', () => {
      this.sendData({flag: 'day-added'});
    });

    this.addListenerOn(this.props.events, 'chain-restarted', () => {
      this.sendData({flag: 'chain-restarted'});
    });

    this.addListenerOn(this.props.events, 'settings-saved', (settings) => {
      this.setState({settings: settings});
    });
  },

  componentDidMount: () => {
    store.get('settings').then((data) => {
      if (data === null) {
        data = {};
      }
      this.setState({settings: data});
    });

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator.getCurrentRoutes().length == 1) {
        BackAndroid.exitApp();
      } else {
        return true;
      }
    });
  },

  getInitialState: () => {
    return {
      habits: [],
      habit: {name: '', days: []},
    }
  },


  onShare: () => {
    Share.open({
      share_text: 'Habit Progress',
      share_URL: 'For my ' + this.state.habit.name + ' habit I have done ' + this.state.habit.days.length + ' days in a row.  Yay for progress!',
      title: 'For my ' + this.state.habit.name + ' habit I have done ' + this.state.habit.days.length + ' days in a row.  Yay for progress!',
    },(e) => {
    });
  },

  openSettings: () => {
    this.props.navigator.push({name: 'settings'});
  },

  openHabits: () => {
    this.props.navigator.push({name: 'habits'});
  },

  render: () => {
    return (
      <View style={styles.container}>
        <ScrollView style={[styles.mainScroll]} automaticallyAdjustContentInsets={true} scrollEventThrottle={200} showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <Habit habits={this.state.habits} events={this.props.events}/>

            <LinkCount habit={this.state.habit} events={this.props.events}/>
          </View>

          <Chains habits={this.state.habits} events={this.props.events}/>
        </ScrollView>

        <View style={styles.buttonRow}>
          <Button text={'Settings'} imageSrc={require('./img/gear-icon.png')} onPress={this.openSettings} textType={styles.navText} buttonType={styles.shareButton} />
          <Button text={'Share'} imageSrc={require('./img/share-icon.png')} onPress={this.onShare} textType={styles.shareText} buttonType={styles.shareButton} />
          <Button text={'Habits'} imageSrc={require('./img/stack-icon.png')} onPress={this.openHabits} textType={styles.navText} buttonType={styles.shareButton} />
        </View>
      </View>
    )
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#045491',
  },

  wrapper: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainScroll: {
    height: 500
  },

  share: {
    marginBottom: 15,
    marginTop: 15,
    paddingTop: 5,
    borderColor: '#DFD9B9',
    borderWidth: 1,
    width: 45,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  shareButton: {
    borderColor: '#DFD9B9',
    borderRadius: 0
  },

  shareText: {
    textAlign: 'center',
    color: '#DFD9B9',
    paddingTop: 2
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  navText: {
    textAlign: 'center',
    color: '#DFD9B9',
    fontSize: 12
  },
});