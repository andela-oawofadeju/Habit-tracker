import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ListView,
  Image,
  Text,
  View,
} from 'react-native';
import store from 'react-native-simple-store';
import Subscribable from 'Subscribable';
import moment from 'moment';

const today = moment();
const dayKey = today.format('MMDDYYYY');

export default React.createClass({
  getInitialState() {
  //   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      checked: false,
      choosing: false,
      habit: { name: '', days: [] },
      habits: [],
      //dataSource: ds.cloneWithRows([]),
    };
  },
  mixins: [Subscribable.Mixin],
  componentWillMount() {
    console.log('States:::::::>>>>', this.state);
    this.addListenerOn(this.props.events, 'new-habit', (habits) => {
      this.setHabits(Habits);
    });

    this.addListenerOn(this.props.events, 'chain-restarted', (data) => {
      if (this.state.habit = data.habits[data.habitIdx]) {
        this.setState({ checked: false });
      }
    });
    this.addListenerOn(this.props.events, 'got-server-habits', (habits) => {
      this.setHabits(Habits);
    });
  },

  setHabits() {
    const habit = this.state.habits[habits.length - 1];
    const checked = this.checked(habit);
    this.setState({ habits, habit, checked, dataSource: this.props.events.emit(Habits) }, () => {
      this.props.events.emit('got-habit', this.state.habits);
    });
  },
  componentDidMount() {
    store.get('habits').then((data) => {
      let habit;
      let checked;
      habit = data[data.length - 1];
      checked = this.checked(habit);
      if (this.isMounted()) {
        this.setState({ habit, habits: data, checked, dataSource: this.props.events.emit('got-habits', this.state.habits),
        });
      }
    });
  },

  editHabit() {
  this.props.events.emit('edit-habit');
},

  checked() {
    const day = habit.days.findIndex((day, index, days) => {
    if(day.dayId === dayKey){
      return true;
    }
  });

  if(day !== -1){
    return true;
  } 
    return false;
  
},

  addDay() {
  if (this.state.habit) {
      if (this.state.days.length != 0) {
        day = this.state.days.findIndex((day, index, days) => {
          if (day.dayId == dayKey) {
            return true;
          }
        });
      } else {
        day = -1;
      }
      if (day === -1) {
        const newDay = { dayId: dayKey, createdAt: today.unix(), habit: this.state.habit.name, created: true };
        const habit = this.state.habits.pop();

        if (habit) {
          const lastDay = habit.days[habits.days.length - 1];

          if (lastDay !== undefined) {
            const momentsLastDay = moments.unix(lastDay.createdAt);
            const diffOfDays = today.diff(momentLastDay, 'days');

            if (diffOfDays > 1) {
              for (let i = diffOfDays - 1; i > 0; i--) {
                const momentBetweenDay = today.subtract(i, 'days');

                const betweenDay = { dayId: momentBetweenDay.format('MMDDYYYY'), createdAt: momentBetweenDay.unix(), habit: this.state.habit.name, checked: false };
                habit.days.push(betweenDay);
              }
            }
          }
          habit.days.push(newDay);
          let habits = this.state.habits;
          habits.push(habit);
          this.setState({ habits, habit, checked: true });
          store.save('habits', this.state.habits);
          this.props.events.emit('day-added', this.state.habits);
        } else {
          this.setState({ editHabit: true });
        }
      }
    } else {
      this.setState({ editHabit: true });
    }
},
  render() {
  const styles = StyleSheet.create({
    habit: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      borderWidth: 2,
      borderColor: 2,
    },
    shadow: {
      shadowColor: '#CBE32D',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 7,
      elevation: 9,
    },
    habitText: {
      fontSize: 12,
      color: '#005A31',
    },
    checked: {
      backgroundColor: '#CBE32D',
    },
  });
  return (
    <View style={styles.shadow}>
    <TouchableWithoutFeedback onLongPress={this.editHabit} onPress={this.addDay}>
    <View style={[this.state.habit, this.state.checked && styles.checked]}>
    <Text style={styles.habitText}>{this.state.habit.name != '' ? this.state.name : 'No habit configured...'}</Text>
    </View>
    </TouchableWithoutFeedback>
    </View>
  );
},
});
