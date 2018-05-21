//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import styles from './style/AppSwitchStyle';
import { color } from 'AppTheme'
import { AppText } from './index'
// create a component
class AppSwitch extends Component {
  render() {
    const { onPress, label, labelKeyLang, desc ='', descKeyLang, value } = this.props;
    return (
      <View style={styles.switchComponent}>
        <View>
          <AppText style={styles.label} keyLang={labelKeyLang} >
            {label}
          </AppText>
          <AppText style={styles.desc} keyLang={descKeyLang} >
            {desc}
          </AppText>
        </View>
        <Switch
          onValueChange={onPress}
          value={value}
          onTintColor={color.SWITCH}
          thumbTintColor={color.BACKGROUND}
        />
      </View>
    );
  }
}
AppSwitch.defaultProps = {
  label: '',
  desc: '',
}
//make this component available to the app
export default AppSwitch;