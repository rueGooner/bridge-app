// app/index.tsx
import { Link } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function Home() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the App</Text>

      <Link href="/(auth)/login" asChild>
        <Button mode="contained">Login</Button>
      </Link>

      <Link href="/(auth)/register" asChild>
        <Button buttonColor={colors.secondary} mode="contained">
          Register
        </Button>
      </Link>
    </View>
  );
}
