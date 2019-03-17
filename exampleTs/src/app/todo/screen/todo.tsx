import { AppText } from '@com/AppText'
import { WithStyles, withStyles } from '@theme/theme'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { NavigationInjectedProps } from 'react-navigation'
import { compose, getContext, pure, withContext } from 'recompose'
import { styles } from '../jss/todo'

interface ITodoPropsOut {

}
interface ITodoPropsIn extends WithStyles<typeof styles>, NavigationInjectedProps {

}

const Todo = ({ styles, navigation }: ITodoPropsIn) => {
	return (
		<View style={styles.container}>
			<AppText text={'Todo'} style={{ color: 'blue' }} />
			<Button title={'Move to single'} onPress={() => navigation.navigate('TodoSingle')} />
			<Button title={'Move to Calendar'} onPress={() => navigation.navigate('Calendar')} />
		</View>
	)
}

export const TodoScreen = compose<ITodoPropsIn, ITodoPropsOut>(withStyles(styles), pure)(Todo)