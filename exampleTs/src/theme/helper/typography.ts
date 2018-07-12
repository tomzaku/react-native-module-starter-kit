import { isIOS } from '@util/platform'
import { TextStyle } from 'react-native'

type Tem = (value: number) => number

export const getTypographyByEm = (em: Tem, generalTypography: TextStyle) => ({
	general: generalTypography,
	display4: {
		fontSize: em(3),
		fontWeight: '300',
		fontFamily: generalTypography.fontFamily,
		letterSpacing: -em(0.04),
		lineHeight: em(1.2),
		marginLeft: -em(0.04),
	} as TextStyle,
	display3: {
		fontSize: em(2.7),
		fontWeight: '400',
		fontFamily: generalTypography.fontFamily,
		letterSpacing: -em(0.02),
		lineHeight: em(1.3),
		marginLeft: em(0.02),
	} as TextStyle,
	display2: {
		fontSize: em(2.5),
		fontWeight: '400',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.06),
		marginLeft: -em(0.02),
	} as TextStyle,
	display1: {
		fontSize: em(2),
		fontWeight: '400',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.2),
	} as TextStyle,
	headline: {
		fontSize: em(1.5),
		fontWeight: '400',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.34),
	} as TextStyle,
	title: {
		fontSize: em(1.3),
		fontWeight: '500',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.3),
	} as TextStyle,
	subheading: {
		fontSize: em(1),
		fontWeight: '400',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.5),
	} as TextStyle,
	body2: {
		fontSize: em(0.875),
		fontWeight: '500',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.71),
	} as TextStyle,
	body1: {
		fontSize: em(0.875),
		fontWeight: '400',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.46),
	} as TextStyle,
	caption: {
		fontSize: em(0.76),
		fontWeight: '400',
		fontFamily: generalTypography.fontFamily,
		lineHeight: em(1.375),
	} as TextStyle,
	button: {
		fontSize: em(0.875),
		fontWeight: '500',
		fontFamily: generalTypography.fontFamily,
	} as TextStyle,
})
