import { StyleSheet, Text, View } from 'react-native';

export const Summary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});
