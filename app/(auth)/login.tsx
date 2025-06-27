import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "ruebencee@gmail.com",
      password: "newpassword11",
    },
  });

  const onLogin = async (data: LoginFormData) => {
    try {
      const response = await fetch("http://10.0.2.2:5050/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Login failed", errorData.message || "Unknown error");
        return;
      }

      const result = await response.json();
      await AsyncStorage.setItem("token", result.accessToken);

      if (result.registrationStep === "COMPLETE_FAMILY") {
        router.push("/dependents/add");
      } else {
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.inner}>
        <Text
          variant="headlineMedium"
          style={{ marginBottom: 20, color: colors.primary }}
        >
          Login
        </Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
              mode="outlined"
              theme={{ roundness: 8 }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={styles.input}
              mode="outlined"
              theme={{ roundness: 8 }}
            />
          )}
        />

        <Button mode="contained" onPress={handleSubmit(onLogin)}>
          Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    borderRadius: 18,
  },
  button: {
    marginTop: 8,
  },
});
