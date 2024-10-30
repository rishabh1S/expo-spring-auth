import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAuthentication } from "~/hooks/useAuthentication";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthentication();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    const user = await login(email, password);
    if (user) {
      router.push("/");
    } else {
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center gap-4 px-4">
          <Input
            placeholder="Email"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
            className="rounded-full border px-4 py-3 w-full"
          />
          <View className="w-full relative">
            <Input
              placeholder="Password"
              textContentType="password"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              className="rounded-full border px-4 py-3 w-full pr-12"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} color="grey" />
              ) : (
                <Eye size={20} color="grey" />
              )}
            </Pressable>
          </View>
          <Button
            variant="outline"
            onPress={handleSignIn}
            disabled={loading}
            className={`w-full rounded-full py-3 ${
              loading ? "opacity-50" : "opacity-100"
            }`}
          >
            <Text className="text-center font-semibold">Login</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
