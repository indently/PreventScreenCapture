import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  async function askForPermission() {
    // This permission is only required on Android
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      ScreenCapture.addScreenshotListener(() => {
        alert('You just took a screenshot! 😊');
      });
    }
  };

  const _activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
    console.log('Preventing screenshots!');
  };

  const _deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
    console.log('You can now take screenshots!');
  };

  useEffect(() => {
    askForPermission();
  }, []);


  return (
    <View style={styles.container}>
      <Button title="Allow" onPress={() => _deactivate()} />
      <Text>  </Text>
      <Button color='tomato' title="Prevent" onPress={() => _activate()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
