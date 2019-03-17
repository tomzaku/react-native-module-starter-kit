import { TRootState } from '@conf/redux/reducer'
import { WithStyles, withStyles } from '@theme/theme'
import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import { Dispatch } from 'redux'
import { styles } from '../jss/settingTheme'
import { changeTheme } from '../redux/action'
import { TPaletteType } from '../redux/initalState'

interface SelectThemePropsOut {

}
interface SelectThemeStateProps {
	themeType: TPaletteType
}
interface SelectThemeActionsProps {
	changeTheme: () => void
}

interface SelectThemePropsIn extends SelectThemePropsOut, WithStyles<typeof styles>, SelectThemeActionsProps, SelectThemeStateProps {

}

const SelectTheme = ({ changeTheme, themeType, styles }: SelectThemePropsIn) => {
	return (
		<View style={styles.container}>
			<Button title={'Change Theme'} raised onPress={changeTheme}/>
		</View>
	)
}

const mapStateToProps = (state: TRootState) => ({
	themeType: state.setting.theme.paletteType,
})

const mapActionToProps = (dispatch: Dispatch) => ({
	// When apply changeTheme it will render all screen that in reactnavigation's stack (including tab: That will cause performance)
	changeTheme: () => dispatch(changeTheme()),
})

const withRedux = connect(mapStateToProps, mapActionToProps)

export const SelectThemeScreen = compose<SelectThemePropsIn, SelectThemePropsOut>(withRedux, withStyles(styles), pure)(SelectTheme)