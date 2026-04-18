import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "../components/buttons/button";
import { Input } from "../components/input";
import { ScreenContainer } from "../components/screen-container";
import { useAuthStore } from "../store/auth-store";

interface LoginState {
  username: string;
  password: string;
  usernameError: string;
  passwordError: string;
}

export const Login = () => {
  const login = useAuthStore((state) => state.login);

  const [state, setState] = useState<LoginState>({
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (value: string) => {
    setState((currentState) => ({
      ...currentState,
      username: value,
      usernameError: "",
    }));
  };

  const handlePasswordChange = (value: string) => {
    setState((currentState) => ({
      ...currentState,
      password: value,
      passwordError: "",
    }));
  };

  const handleLogin = async () => {
    const usernameValue = state.username.trim();
    const passwordValue = state.password.trim();

    const nextUsernameError = usernameValue ? "" : "יש להזין שם משתמש";
    const nextPasswordError = passwordValue ? "" : "יש להזין סיסמה";

    setState((currentState) => ({
      ...currentState,
      usernameError: nextUsernameError,
      passwordError: nextPasswordError,
    }));

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
    <ScreenContainer title="התחברות" subtitle="יש להזין שם משתמש וסיסמא">
      <View style={styles.form}>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={state.usernameError}
          label="שם משתמש"
          onChangeText={handleUsernameChange}
          placeholder="הקלדת שם משתמש"
          returnKeyType="next"
          value={state.username}
        />
        <Input
          errorMessage={state.passwordError}
          label="סיסמה"
          onChangeText={handlePasswordChange}
          onSubmitEditing={handleLogin}
          placeholder="הקלדת סיסמה"
          returnKeyType="done"
          secureTextEntry
          value={state.password}
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
