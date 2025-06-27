// app/index.tsx
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function Home() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    heading: {
      fontSize: 24,
      marginBottom: 20,
      color: colors.primary,
    },
    button: {
      width: "80%",
      marginVertical: 5,
      marginHorizontal: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Welcome to Bridge
      </Text>

      <Link href="/(auth)/login" asChild>
        <Button mode="contained" style={styles.button}>
          Login
        </Button>
      </Link>

      <Link href="/(auth)/register" asChild>
        <Button
          buttonColor={colors.secondary}
          mode="contained"
          style={styles.button}
        >
          Register
        </Button>
      </Link>
    </View>
  );
}
