import { Stack } from "expo-router";
import React from "react";
import { Button } from "~/components/ui/button";
import { Text } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: () => (
            <Text className="text-gray-900 dark:text-gray-100">Signup</Text>
          ),
          headerRight: () => <ThemeToggle />,
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: () => (
            <Text className="text-gray-900 dark:text-gray-100">Login</Text>
          ),
          headerRight: () => <ThemeToggle />,
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  );
}
