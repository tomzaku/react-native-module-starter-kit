import SandBoxScreen from '../screen/main'
import SandBoxTabletScreen from '../screen/main'
import * as routeUtil from '@router/util/make'

export default routeUtil.make({
    SandBoxMain: {
        phone: {
            screen: SandBoxScreen,
            navigationOptions: () => ({
                title: 'SandBox Header',
            })
        },
        tablet: {
            screen: SandBoxTabletScreen,
        }
    }
})