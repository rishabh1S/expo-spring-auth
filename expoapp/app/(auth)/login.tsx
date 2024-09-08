import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <SafeAreaView />
      <VStack className="mx-2 gap-4">
        <VStack className="gap-2">
          <Text className="text-2xl font-semibold">Welcome to RideShare</Text>
          <Text className="font-medium">Start travelling with RideShare</Text>
        </VStack>
        <VStack className="gap-2">
          <VStack>
            <Text>Email</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                textContentType="emailAddress"
                value={emailAddress}
                onChangeText={(email) => setEmailAddress(email)}
                placeholder="Enter your Email"
              />
            </Input>
          </VStack>
          <VStack>
            <Text>Password</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                textContentType="password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </Input>
          </VStack>
        </VStack>
        <VStack className="gap-5">
          <Button size="md" variant="outline" action="primary">
            <ButtonText>Login</ButtonText>
          </Button>
          <HStack className="justify-center items-center gap-3">
            <Text className="font-medium text-xs">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.replace("/signup")}>
              <Text>Sign up</Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
}
