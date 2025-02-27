import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Groups from "@screens/groups";
import NewGroup from "@screens/newGroup";
import Players from "@screens/players";

const { Navigator, Screen } = createNativeStackNavigator()

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />
      <Screen name="newGroup" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  )
}
