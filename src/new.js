import React, { Component } from 'react';
import react from 'react-native';
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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habit: '',
      checked: false,
      days: [],
      editHabit: true,
    }
  }

  saveHabit() {
    this.setState({ habit: this.state.text, editHabit: false });
  }

  editHabit() {
    this.setState({ editHabit: true });
  }

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
        let newDay = { dayId: dayKey, createdAt: Date.now(), habit: this.state.habit };
        if (this.state.days === null) {
          this.setState({ days: [newDay], checked: true });
        } else {
          this.state.days.push(newDay);
          this.setState({ days: this.state.days, checked: true });
        }
      }
    } else {
      this.setState({ editHabit: true });
    }
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
      input = <TextInput style={styles.input} onChangeText={(Text) => this.setState({ text })} value={this.state.text} />;
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

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F3FAB6',
  },
  wrapper: {
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  habit: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderWidth: 2,
    borderColor: '#A8CD1B',
  },
  shadow: {
    shadowColor: '#CBE32D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
  habitText: {
    fontSize: 12,
    color: '#005A31',
  },
  Checked: {
    backgroundColor: '#CBE32D',
  },
  input: {
    padding: 4,
    height: 40,
    color: '#005A31',
    borderColor: '#A8CD1B',
    borderRadius: 5,
    margin: 6,
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
    fontSize: 12,
    marginTop: 30,
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
    height: 600,
  },
  chains: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    overflow: 'visible',
    borderColor: '#A8CD1B',
    borderWidth: 1,
  },
  restartButton: {
    borderColor: '#A8CD1B',
  },
  restartText: {
    color: '#005A31',
  },
  saveButton: {
    borderColor: '#A8CD1B',
  },
  saveText: {
    color: '#005A31',
  },
  editButtons: {
    flexDirection: 'row',
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});