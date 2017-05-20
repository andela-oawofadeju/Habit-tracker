import React, { Component } from 'react';
import react from 'react-native';
import events from 'events';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
  View
} from 'react-native';
import store from 'react-native-simple-store';
import button from './button';
import Subscribable from 'Subscribable';

export default React.createClass({
  mixin: [Subscribable.mixin],

  getInitialState: () => {
    return{
      text:'',
      editHabit: false,
      habits: this.props.habits
    }
  },
  componentWillMount: () => {
    this.addListenerOn(this.props.events, 'edit-habit', () => {
      this.setState({editHabit: true})
    });
  },
  saveHabit: () => {
    let habitIdx = this.state.habits.findIndex( (habit, index, habits) => {
      if(habit.name == this.state.text){
        return true;
      }
    });
    if(habitIdx !== -1){
      let habits = this.state.habits;
      let storedHabit = habits.splice(habitIdx, 1);
      habits.push(storedHabit[0]);

      this.setState({habits: habit, habit:storedHabit[0], editHabit: false}, () => {
        this.props.events.emit('new-habit', this.state.habits);
        store.save('habits', this.state.habits);
      });
    } else {
      //Create New Habit
      let habit = {name: this.state.text, days: []}
      let habits = this.state.habits;
      habits.push(habit);

      this.setState({habits: habits, habit: habit, editHabit: false}, () => {
        this.props.events.emit('new-habit', this.state.habits);
        store.save('habits', this.state.habits);
      })
    }
  },
  cancelHabitEdit: () => {
    this.setState({editHabit: false});
    this.props.events.emit('cancel-habit');
  },

render: () => {
let input, save;
if(this.state.editHabit != true){
  label = <View></View>;
  input = <View></View>;
  save = <View></View>;
  cancel = <View></View>;
} else {
  label = <Text style={styles.label}>Enter Habit</Text>
  input=<TextInput style={styles.input} onChangeText={(text) => this.setState({text: text})} value={this.state.text} />
  save=<Button text={'Save'} onPress={this.saveHabit} textType={styles.saveText} buttonType={styles.saveButton} />
  cancel =<Button text={'Cancel'} onPress={this.cancelHabitEdit} />
}

return(
  <View style={styles.formElement}>
  {label}
  {input}
  <View style={styles.editButton}>
  {save}
  {cancel}
  </View>
  </View>
)
}
});

const styles = StyleSheet.create({
  input: {
    padding: 4,
    height: 40,
    borderWidth: 1,
    borderColor: '#A8CD1B',
    borderRadius: 3,
    margin: 5,
    width: 200,
    alignSelf: 'center',
  },
  formElement: {
    backgroundColor: '#CBE32D',
    margin: 5,
  },
  label: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginTop:  10,
  },
  restartButton: {
    borderColor: '#A8CD1B',
  },
  restartText: {
    color: '#005A31',
  },
  saveText: {
    color: '#005A31',
  },
  editButton: {
    flexDirection: 'row',
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center'
  }
})