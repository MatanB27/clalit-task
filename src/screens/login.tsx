import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "../components/button";
import { Input } from "../components/input";
import { ScreenContainer } from "../components/screen-container";
import { useAuthStore } from "../store/auth-store";

export const Login = () => {
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);

    if (usernameError) {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    const usernameValue = username.trim();
    const passwordValue = password.trim();

    const nextUsernameError = usernameValue ? "" : "יש להזין שם משתמש";
    const nextPasswordError = passwordValue ? "" : "יש להזין סיסמה";

    setUsernameError(nextUsernameError);
    setPasswordError(nextPasswordError);

    if (nextUsernameError || nextPasswordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        username: usernameValue,
        password: passwordValue,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer
      title="התחברות"
      subtitle="יש להזין שם משתמש וסיסמה. כל שילוב תקין יאפשר כניסה לאפליקציה."
    >
      <View style={styles.form}>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={usernameError}
          label="שם משתמש"
          onChangeText={handleUsernameChange}
          placeholder="הקלדת שם משתמש"
          returnKeyType="next"
          value={username}
        />
        <Input
          errorMessage={passwordError}
          label="סיסמה"
          onChangeText={handlePasswordChange}
          onSubmitEditing={handleLogin}
          placeholder="הקלדת סיסמה"
          returnKeyType="done"
          secureTextEntry
          value={password}
        />
        <Button isLoading={isSubmitting} onPress={handleLogin}>
          התחברות
        </Button>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
});
