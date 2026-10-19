import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';
import { Spacing, Fonts, Shadows } from '@/constants/theme';
import { ThemedText } from '@/components/common/themed-text';
import { ThemedView } from '@/components/common/themed-view';
import { RevealUp } from '@/components/common/reveal-up';

interface SecuritySectionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  content: string;
  theme: any;
}

function SecuritySection({ title, icon, content, theme }: SecuritySectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={[styles.iconBox, { backgroundColor: theme.accent + '15' }]}>
          <Ionicons name={icon} size={20} color={theme.accent} />
        </View>
        <ThemedText style={[styles.sectionTitle, { color: theme.primary }]}>{title}</ThemedText>
      </View>
      <View style={[styles.contentCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <ThemedText style={[styles.contentText, { color: theme.textSecondary }]}>{content}</ThemedText>
      </View>
    </View>
  );
}

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors: theme } = useAppTheme();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: false,
      }} />

      {/* Header */}
      <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 16), backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={[styles.backButton, { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border }]}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <ThemedText style={[styles.headerTitleText, { color: theme.primary }]}>Privacy & Security</ThemedText>
          </View>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RevealUp delay={100}>
          <SecuritySection 
            title="Google Calendar Integration" 
            icon="calendar-outline" 
            content="MaxTrack syncs with your Google Calendar to help you manage your schedule. We only request permissions to read and create events in your calendar. Your data is never stored on external servers; it remains between your device and Google."
            theme={theme}
          />
        </RevealUp>

        <RevealUp delay={200}>
          <SecuritySection 
            title="Data Protection" 
            icon="shield-checkmark-outline" 
            content="Your authentication tokens and personal task data are stored locally on your device using encrypted storage. We do not track your location or sell your personal information to third parties."
            theme={theme}
          />
        </RevealUp>

        <RevealUp delay={300}>
          <SecuritySection 
            title="App Permissions" 
            icon="key-outline" 
            content="The app requires Notification permissions to remind you of upcoming tasks. Calendar access is used only to show and sync your schedule. You can manage these permissions at any time through your device settings."
            theme={theme}
          />
        </RevealUp>

        <RevealUp delay={400}>
          <SecuritySection 
            title="Security Features" 
            icon="lock-closed-outline" 
            content="We use industry-standard OAuth 2.0 protocols for Google Sign-In, ensuring that your password is never shared with us. Secure Store is used to maintain your session integrity safely."
            theme={theme}
          />
        </RevealUp>

        <View style={styles.footerInfo}>
          <ThemedText style={[styles.footerText, { color: theme.textSecondary, opacity: 0.5 }]}>MaxTrack v1.0.0</ThemedText>
        </View>
      </ScrollView>
    </ThemedView> 
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { zIndex: 100, borderBottomWidth: 1 },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 64 },
  titleWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitleText: { fontSize: 20, fontFamily: Fonts.black, textAlign: 'center' },
  backButton: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', ...Shadows.soft },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, paddingBottom: 60 },
  section: { marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingLeft: 8 },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  sectionTitle: { fontSize: 18, fontFamily: Fonts.bold },
  contentCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    ...Shadows.soft,
  },
  contentText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    lineHeight: 24,
    opacity: 0.8,
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    opacity: 0.5,
  }
});
