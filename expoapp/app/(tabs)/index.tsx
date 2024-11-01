import { StyleSheet, View, Text } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import { useAuthentication } from "~/hooks/useAuthentication";

export default function TabOneScreen() {
  const { logout } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Button onPress={logout}>
        <Text className="text-gray-100 dark:text-gray-900">Logout</Text>
      </Button>
      <Button variant="secondary">
        <ThemeToggle />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
