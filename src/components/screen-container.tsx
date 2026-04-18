import type { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
}

export const ScreenContainer = ({
  children,
  title,
  subtitle,
  footer,
}: ScreenContainerProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={styles.body}>{children}</View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1b1f29",
    textAlign: "right",
    writingDirection: "rtl",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: "#5b6475",
    textAlign: "right",
    writingDirection: "rtl",
  },
  body: {
    flex: 1,
    marginTop: 24,
  },
  footer: {
    paddingTop: 16,
  },
});
