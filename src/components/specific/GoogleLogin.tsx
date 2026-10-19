import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/context/ThemeContext";
import { Fonts, Shadows, Spacing, BorderRadius } from "@/constants/theme";
import { ThemedText } from "@/components/common/themed-text";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/context/AuthContext";

export default function GoogleLogin({ onSuccess }: { onSuccess?: (token: string) => void }) {
  const { colors: theme } = useAppTheme();
  const { setGoogleToken, setUserName, setUserImage, googleToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = googleToken;

  const handlePress = async () => {
    console.log('GoogleLogin: handlePress started');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);

    try {
      console.log('GoogleLogin: Checking play services...');
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      console.log('GoogleLogin: Calling signIn()...');
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.type !== "success") {
        return;
      }
      console.log('GoogleLogin: signIn success. userInfo structure:', Object.keys(userInfo));
      
      const userObj = userInfo.data.user;
      if (userObj) {
        const name = userObj.givenName || userObj.name || "User";
        console.log('GoogleLogin: setting user name to', name);
        setUserName(name);
        
        if (userObj.photo) {
          console.log('GoogleLogin: setting user image');
          setUserImage(userObj.photo);
        }
      }

      console.log('GoogleLogin: Fetching tokens...');
      const tokens = await GoogleSignin.getTokens();
      const token = tokens.accessToken;

      if (token) {
        console.log('GoogleLogin: setting google token');
        await setGoogleToken(token);
        onSuccess?.(token);
      } else {
        throw new Error("Google Sign-In completed but did not return an access token.");
      }
    } catch (error: unknown) {
      const errorCode =
        typeof error === "object" && error !== null && "code" in error &&
        typeof error.code === "string"
          ? error.code
          : null;

      if (errorCode === statusCodes.SIGN_IN_CANCELLED) {
        console.log("GoogleLogin: Sign-in cancelled by user");
      } else if (errorCode === statusCodes.IN_PROGRESS) {
        console.log("GoogleLogin: Sign-in already in progress");
      } else if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error("GoogleLogin: Play Services not available");
      } else {
        console.error("GoogleLogin: Error during sign-in process:", error);
        const message = error instanceof Error ? error.message : String(error);
        const detail = errorCode ? `Error code: ${errorCode}\n\n` : "";
        Alert.alert(
          "Google Sign-In failed",
          `${detail}${message}\n\nFor Android, verify the Web client ID, app package name, and signing certificate SHA-1 in the same Google Cloud project.`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: accessToken ? theme.success : theme.accent,
          opacity: isLoading ? 0.6 : 1,
        },
      ]}
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: accessToken ? theme.success + "15" : theme.accent + "10" },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.accent} />
        ) : (
          <Ionicons
            name={accessToken ? "checkmark-circle" : "logo-google"}
            size={24}
            color={accessToken ? theme.success : theme.accent}
          />
        )}
      </View>

      <View style={styles.textContainer}>
        <ThemedText style={styles.title}>
          {accessToken ? "Google Calendar Connected" : "Connect Google Calendar"}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {accessToken ? "Your events are syncing" : "Sync your tasks with your calendar"}
        </ThemedText>
      </View>

      <View style={styles.actionIcon}>
        <Ionicons
          name={accessToken ? "refresh-outline" : "chevron-forward"}
          size={20}
          color={theme.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    ...Shadows.soft,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    opacity: 0.6,
    marginTop: 2,
  },
  actionIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
