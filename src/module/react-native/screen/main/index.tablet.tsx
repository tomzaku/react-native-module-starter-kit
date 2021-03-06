import * as React from "react"
import { View, Text, Button } from "react-native";
import { NavigationScreenProps } from "react-navigation";

type Props = NavigationScreenProps & {}

const MainSandBox = (props: Props) => {
    const [count, setCount] = React.useState(0)
    return (
        <View>
            <Text>
                [Tablet] SandBox Number: {count}
            </Text>
            <Button title="Increasing" onPress={() => setCount(count + 1)} />
        </View>
    )
}

export default MainSandBox