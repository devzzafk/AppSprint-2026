import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LinkHarvest</Text>

      <Text style={styles.tagline}>
        Don't search for a market.{'\n'}
        Let the market find you.
      </Text>

      <Text style={styles.description}>
        Connect local producers with buyers who are actively looking for
        what they have to offer.
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#F7F9F4',
  },

  logo: {
    fontSize: 38,
    fontWeight: '800',
    color: '#1B4332',
    marginBottom: 18,
  },

  tagline: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    color: '#172B24',
    marginBottom: 18,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    color: '#5B665F',
    marginBottom: 36,
  },

  button: {
    backgroundColor: '#1B4332',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});