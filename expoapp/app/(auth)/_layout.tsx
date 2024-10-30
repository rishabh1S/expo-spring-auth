import { Stack, useRouter } from "expo-router";
import React from "react";
import { Button } from "~/components/ui/button";
import { Text } from "react-native";

export default function AuthLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: () => <Text>Signup</Text>,
          headerRight: () => (
            <Button
              variant="outline"
              size="sm"
              onPress={() => router.push("/login")}
            >
              <Text>Login</Text>
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{ headerTitle: () => <Text>Login</Text> }}
      />
    </Stack>
  );
}
