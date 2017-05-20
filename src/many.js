import React, { Component } from 'react';
import react from 'react-native';
import events from 'events';
import EventEmitter from 'EventEmitter'
import Habit from './components/habit';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import Button from './components/button';

const today = new Date();
const dayKey = today.getMonth().toString() + today.getDate().toString() + today.getFullYear().toString();
let day;

export default React.createClass ({
  mixins: [Subscribable.mixins],

  componentWillMount: ()=>{
    this.addListener
  }
  constructor(props) {
    super(props);
    this.state = {
      habit: '',
      checked: false,
      days: [],
      editHabit: true,
    };
    this.eventEmitter = new events.EventEmitter();
  }

  saveHabit() {
    this.setState({ habit: this.state.text, editHabit: false });
  }

  restartHabit() {
    this.setState({ days: [], editHabit: false, checked: false });
  }

  cancelHabitEdit() {
    this.setState({ editHabit: false });
  }

  render() {
    let input, save;

    if (!this.state.editHabit) {
      label = <View></View>;
      input = <View></View>;
      save = <View></View>;
      cancel = <View></View>;
      restart = <View></View>;
    } else {
      label = <Text style={styles.label}>Enter Habit</Text>;
      input = <TextInput style={styles.input} onChangeText={(text) => this.setState({ text })} value={this.state.text} />;
      save = <Button text={'Save'} onPress={() => this.saveHabit()} textType={styles.saveText} buttonType={styles.saveButton} />;
      cancel = <Button text={'Cancel'} onPress={() => this.cancelHabitEdit()} />
      restart = <Button text={'Restart Chain'} onPress={() => this.restartHabit()} textType={styles.restartText} buttonType={styles.restartButton} />
    }
    let chains;
    if (this.state.habit) {
      chains = <View style={styles.chains}>
        {this.days.map((day, index) => {
          return <Image key={day.dayId} style={styles.icon}
            source={index % 30 == 0 && index != 0 ? require('./img/chain-icon-green.png') : require('./img/chain-icon.png')} />;
        })}
      </View>
    } else {
      chains = <View></View>;
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
        <Habit habits={this.state.habits} events={this.eventEmitter}/>
          <View style={styles.shadow}>
            <TouchableWithoutFeedback onLongPress={() => this.editHabit()} onPress={() => this.addDay()}>
              <View style={[styles.habit, this.state.checked && styles.checked]}>
                <Text style={styles.habitText}>{this.state.habit ? this.state.habit : 'No habit configured...'}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View Style={styles.formElement}>
            {label}
            {input}
            <View style={styles.editButtons}>
              {save}
              {cancel}
            </View>
            {restart}
          </View>
          <Text style={styles.days}>{this.state.days ? this.state.days.length : '0'} link{this.state.days.length == 1 ? '' : 's'} in the chain.</Text>
        </View>
        <ScrollView style={[styles.scroll]} automaticallyAdjustContentInsets={true} scrollEventThrottle={200}>
          {chains}
        </ScrollView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F3FAB6',
  },
  wrapper: {
    alignItems: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },

  days: {
    color: '#005A31',
    padding: 10,
    fontSize: 14,
  },
  icon: {
    padding: 0,
  },
  scroll: {
    height: 400,
  },
  chains: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    padding: 5,
    overflow: 'visible',
    borderColor: '#A8CD1B',
    borderWidth: 1,
  },
});