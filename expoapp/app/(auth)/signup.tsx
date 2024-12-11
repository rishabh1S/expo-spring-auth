import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Eye, EyeOff } from "lucide-react-native";
import { useAuthentication } from "~/hooks/useAuthentication";
import { Formik } from "formik";
import { useValidation } from "~/hooks/useValidation";
import { signUpSchema } from "~/schemas/signupSchema";
import { User } from "~/model/user";

export default function SignUpPage() {
  const router = useRouter();
  const { register } = useAuthentication();
  const { validate } = useValidation();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values: any) => {
    setLoading(true);
    const user: User = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      userRole: values.userRole.value,
    };
    const response = await register(user);

    if (response) {
      Alert.alert("Success", "Registration successful!");
      router.push("/login");
    } else {
      Alert.alert("Error", "Registration failed. Please try again.");
    }
    setLoading(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            userRole: undefined,
          }}
          validate={(values) => validate(values, signUpSchema)}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View className="flex-1 justify-center items-center gap-4 px-4">
              <View className="flex flex-row justify-center items-center gap-4">
                <View className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder="First Name"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    className="rounded-full border px-4 py-3 w-full"
                  />
                  {errors.firstName && touched.firstName && (
                    <Text className="text-red-500">{errors.firstName}</Text>
                  )}
                </View>
                <View className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    className="rounded-full border px-4 py-3 w-full"
                  />
                  {errors.lastName && touched.lastName && (
                    <Text className="text-red-500">{errors.lastName}</Text>
                  )}
                </View>
              </View>
              <View className="w-full flex items-center gap-2">
                <Input
                  placeholder="Email"
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
              <View className="w-full flex items-center gap-2">
                <Input
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  className="rounded-full border px-4 py-3 w-full"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text className="text-red-500">{errors.confirmPassword}</Text>
                )}
              </View>
              <Select
                value={values.userRole}
                onValueChange={(role) => {
                  setFieldValue(
                    "userRole",
                    role
                      ? {
                          value: role.value,
                          label: role.value === "USER" ? "User" : "Admin",
                        }
                      : undefined
                  );
                }}
              >
                <SelectTrigger className="rounded-full border w-full">
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Choose User Role"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="border w-full">
                  <SelectGroup>
                    <SelectLabel>User Role</SelectLabel>
                    <SelectItem label="User" value="USER">
                      User
                    </SelectItem>
                    <SelectItem label="Admin" value="ADMIN">
                      Admin
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="default"
                onPress={() => handleSubmit()}
                disabled={loading}
                className="w-full rounded-full py-3 flex flex-row gap-4"
              >
                <Text className="text-center font-semibold text-gray-100 dark:text-gray-900">
                  Sign Up
                </Text>
                {loading && <ActivityIndicator size="small" color="#fff" />}
              </Button>
              <View className="flex flex-row">
                <Text className="text-gray-900 dark:text-gray-100">
                  Already have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("/login")}>
                  <Text className="font-semibold text-gray-900 dark:text-gray-100">
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
