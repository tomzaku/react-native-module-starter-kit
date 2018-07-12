
import { ViewStyle } from 'react-native'
import { TMetric } from './light/metric'
import { Tpalette } from './light/palette'
import { TTypography } from './light/typography'
// import { metric } from './metric'
// import { palette } from './palette'
// import { typography } from './typography'
export const getAppStyle = (palette: Tpalette, metric: TMetric, typography: TTypography) => ({
	toolbar: {
		main: {
			backgroundColor: palette.toolbar.main,
		} as ViewStyle,
		text: {
			...typography.title,
			color: palette.toolbar.contrastText,
		},
	},
	tabbarNavigation: {
		main: {
			backgroundColor: palette.tabbarNavigation.main,
			borderTopWidth: metric.tabbarNavigation.borderTopWith,
			borderTopColor: palette.tabbarNavigation.borderColor,
		} as ViewStyle,
		activeTintColor: palette.tabbarNavigation.activeLabel,
		inactiveTintColor: palette.tabbarNavigation.inactiveLabel,
	},
	container: {
		main: {
			backgroundColor: palette.background.default,
			flex: 1,
		} as ViewStyle,
		padding: {
			backgroundColor: palette.background.default,
			flex: 1,
			padding: metric.container.padding,
		} as ViewStyle,
	},
}
)
