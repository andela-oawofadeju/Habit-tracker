// import React, { Component } from 'react';
// import react from 'react-native';
// import events from 'events';
// import {
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Image,
//   Text,
//   View
// } from 'react-native';
// import store from 'react-native-simple-store';
// import Subscribable from 'Subscribable';
// import moment from 'moment';
// import form from './form';

// const eventEmitter = new events.EventEmitter();
// const today = moment();
// const dayKey = today.format('MMDDYYYY');

// export default React.createClass({
//   mixins: [Subscribable.Mixin],
//   componentWillMount: () => {
//     this.addListenerOn(this.props.events, 'new-habit', (habits) => {
//       let habit = habits[habits.length-1];
//       let checked = this.checked(habit);

//       this.setState({habits: habits, habit: habit, checked: checked})
//     });
//     this.addListenerOn(this.props.events, 'chain-restarted', (data) => {
//       if(this.state.habit = data.habits[data.habitIdx]){
//         this.setState({checked: false});
//       }
//     });
//   },
//   getInitialState: () => {
//   //   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

//     return {
//       checked: false,
//       choosing: false,
//       habit: { name: '', days: []},
//       habits: [],
//       //dataSource: ds.cloneWithRows([]),
//     }
//   },
//   componentDidMount: () => {
//     store.get('habits').then((data) => {
//       let habit;
//       let checked;
//       habit = data[data.length - 1];
//       checked = this.checked(habit);
//       if(this.isMounted()){
//         this.setState({habit: habit, habits: data, checked: checked, dataSource: this.props.events.emit('got-habits', this.state.habits)
//       });
//     }
//   });
// },

// editHabit: () => {
//   this.props.events.emit('edit-habit');
// },

// checked: () => {
//   let day = habit.days.findIndex((day, index, days) => {
//     if(day.dayId === dayKey){
//       return true;
//     }
//   });

//   if(day !== -1){
//     return true;
//   } else{
//     return false;
//   }
// },

// addDay: () => {
//     if (this.state.habit) {
//       if (this.state.days.length != 0) {
//         day = this.state.days.findIndex((day, index, days) => {
//           if (day.dayId == dayKey) {
//             return true;
//           }
//         });
//       } else {
//         day = -1;
//       }
//       if (day === -1) {
//         let newDay = { dayId: dayKey, createdAt: today.unix(), habit: this.state.habit.name, created:true };
//         let habit = this.state.habits.pop();

//         if(habit){
//           let lastDay = habit.days[habits.days.length - 1];

//           if(lastDay !== undefined){
//             let momentsLastDay = moments.unix(lastDay.createdAt);
//             let diffOfDays = today.diff(momentLastDay, 'days');

//             if(diffOfDays > 1){
//               for(let i= diffOfDays - 1; i > 0; i--){
//                 let momentBetweenDay = today.subtract(i, 'days');

//                 let betweenDay = { dayId: momentBetweenDay.format('MMDDYYYY'), createdAt:momentBetweenDay.unix(), habit: this.state.habit.name, checked: false }
//                 habit.days.push(betweenDay);
//                 }
//             }
//           }
//                 habit.days.push(newDay);
//                 let habits = this.state.habits;
//                 habits.push(habit);
//                 this.setState({habits: habits, habit: habit, checked: true})
//                 store.save('habits', this.state.habits);
//                 this.props.events.emit('day-added', this.state.habits);
//               } else {
//                 this.setState({editHabit: true}); 
//         }       
//       }
//     } else {
//       this.setState({ editHabit: true });
//     }
//   },
// render: () => {
//   return(
//     <View style={styles.shadow}>
//     <TouchableWithoutFeedback onLongPress={this.editHabit} onPress={this.addDay}>
//     <View style={[this.state.habit, this.state.checked && styles.checked]}>
//     <Text style={styles.habitText}>{this.state.habit.name != '' ? this.state.name: 'No habit configured...'}</Text>
//     </View>
//     </TouchableWithoutFeedback>
//     </View>
//   )
// }
// })

// const styles = StyleSheet.create({
//   habit: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     borderWidth: 2,
//     borderColor: 2,
//   },
//   shadow: {
//     shadowColor: '#CBE32D',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.9,
//     shadowRadius: 7,
//     elevation: 9,
//   },
//   habitText: {
//     fontSize: 12,
//     color: '#005A31',
//   },
//   checked: {
//     backgroundColor: '#CBE32D'
//   }
// })