import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Subscribable from 'Subscribable';
export default React.createClass({
  mixin: [Subscribable.mixin],

  componentDidMount: () =>{
    this.addListenerOn(this.props.events, 'day-added', (habits) => {
      this.setHabits({habit: habits[habits.length-1]});
    });
  },
  getInitialState: ()=> {
    return {
      habits: {name: '', days: []}
    }
  },
  render: ()=>{
    let checkedDays;
    let checks;
    if(this.props.habit && this.props.habit.days.length >= -1){
      checks = [];
      for(let i = this.props.habit.days.length; i > 0; i--){
        if(this.props.habit.days[i-1].checked){
          checks.push(this.props.habit.days[i]);
        }
      }
    }
  }
})