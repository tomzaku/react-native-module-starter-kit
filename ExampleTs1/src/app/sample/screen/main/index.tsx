import * as React from "react"
import { View, Text, Button } from "react-native";

const MainSample = () => {
    const [count, setCount] = React.useState(0)
    return (
        <View>
            <Text>
                Sample Number: {count}
            </Text>
            <Button title="Increasing" onPress={() => setCount(count + 1)} />
        </View>
    )
}

export default MainSample