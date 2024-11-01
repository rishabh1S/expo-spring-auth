import { useRouter } from "expo-router";
import { Formik } from "formik";
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
  ActivityIndicator,
} from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAuthentication } from "~/hooks/useAuthentication";
import { useValidation } from "~/hooks/useValidation";
import { loginSchema } from "~/schemas/loginSchema";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthentication();
  const { validate } = useValidation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (values: any) => {
    setLoading(true);
    const user = await login(values.email, values.password);
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
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => validate(values, loginSchema)}
          onSubmit={handleSignIn}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="flex-1 justify-center items-center gap-4 px-4">
              <View className="w-full flex items-center gap-2">
                <Input
                  placeholder="Email"
                  textContentType="emailAddress"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  className="rounded-full border px-4 py-3 w-full"
                />
                {errors.email && touched.email && (
                  <Text className="text-red-500">{errors.email}</Text>
                )}
              </View>
              <View className="w-full flex items-center gap-2">
                <View className="w-full relative">
                  <Input
                    placeholder="Password"
                    textContentType="password"
                    value={values.password}
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
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
                {errors.password && touched.password && (
                  <Text className="text-red-500">{errors.password}</Text>
                )}
              </View>
              <Button
                variant="default"
                onPress={() => handleSubmit()}
                disabled={loading}
                className="w-full rounded-full py-3 flex flex-row gap-4"
              >
                <Text className="text-center font-semibold text-gray-100 dark:text-gray-900">
                  Login
                </Text>
                {loading && <ActivityIndicator size="small" color="#fff" />}
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
