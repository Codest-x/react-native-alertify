import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AlertProvider,
  DefaultTheme,
  useAlertContext,
} from 'react-native-alertify';
function Home() {
  const {showAlert, changeContent, isLoading, isShowing, setLoader} =
    useAlertContext();
  const {height, width} = Dimensions.get('window');

  const showLoadingAlert = () => {
    setLoader(true);
    showAlert({
      title: 'Loading Request',
      message: 'Please wait...',
      showIndicator: false,
    });
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  };

  const showLoadingAlertWithContentChange = () => {
    setLoader(true);
    showAlert({
      title: 'Loading Request',
      message: 'Please wait...',
      showIndicator: false,
    });
    setTimeout(() => {
      changeContent({
        title: 'Content Changed',
        message: 'This is a new content',
        type: 'success',
      });
      setLoader(false);
    }, 3000);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          height: height * 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 38,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          React Native Alertify
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          IsShowing: {isShowing.toString()}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          IsLoading: {isLoading.toString()}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Start clicking on the buttons below to see the different types of
          alerts and see the magic. Dont forget to scroll down to see more
          awesome examples.
        </Text>
        <View
          style={{
            height: height * 0.3,
            width: width * 0.8,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Simple Alert</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'No Message'}
                    onPress={() => {
                      showAlert({
                        title: 'Simple Alert',
                        showIndicator: false,
                      });
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'With Message'}
                    onPress={() => {
                      showAlert({
                        title: 'Simple Alert with Message',
                        message: 'This is a simple alert with message',
                        showIndicator: false,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Normal Alert</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: DefaultTheme.colors.light.success,
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'Success'}
                    onPress={() => {
                      showAlert({
                        title: 'Success Alert',
                        message: 'This is a success alert',
                        type: 'success',
                      });
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: DefaultTheme.colors.light.error,
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'Error'}
                    onPress={() => {
                      showAlert({
                        title: 'Error Alert',
                        message: 'This is an error alert',
                        type: 'error',
                      });
                    }}
                  />
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: DefaultTheme.colors.light.info,
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'Info'}
                    onPress={() => {
                      showAlert({
                        title: 'Info Alert',
                        message: 'This is an info alert',
                        type: 'info',
                      });
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: DefaultTheme.colors.light.warning,
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'Warning'}
                    onPress={() => {
                      showAlert({
                        title: 'Warning Alert',
                        message: 'This is a warning alert',
                        type: 'warning',
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Swipeable</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 1,
                  }}>
                  <Button
                    color={'white'}
                    title={'Swipeable'}
                    onPress={() => {
                      showAlert({
                        title: 'Swipeable Alert',
                        message: 'Swipe left or right to dismiss',
                        type: 'info',
                        swipeable: true,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Dismissible</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 1,
                  }}>
                  <Button
                    color={'white'}
                    title={'Dismissible '}
                    onPress={() => {
                      showAlert({
                        title: 'Dismissible Alert',
                        message: 'Clickme to dismiss',
                        type: 'info',
                        dismissible: true,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Show Progress</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'Color By Type'}
                    onPress={() => {
                      showAlert({
                        title: 'Alert with Progress',
                        message: 'This is a progress alert',
                        type: 'info',
                        showProgress: true,
                      });
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 0.45,
                  }}>
                  <Button
                    color={'white'}
                    title={'Custom Color'}
                    onPress={() => {
                      showAlert({
                        title: 'Alert with Progress',
                        message: 'This is a progress alert',
                        type: 'info',
                        showProgress: true,
                        progressColor: 'pink',
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Shadow By Type</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 1,
                  }}>
                  <Button
                    color={'white'}
                    title={'Shadow By Type'}
                    onPress={() => {
                      showAlert({
                        title: 'Alert with shadow by type',
                        message: 'Now shadow is like type color',
                        type: 'error',
                        shadowColorByType: true,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Background By Type</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 1,
                  }}>
                  <Button
                    color={'white'}
                    title={'Background By Type'}
                    onPress={() => {
                      showAlert({
                        title: 'Alert background by type',
                        message: 'Useful to show high priority alerts',
                        type: 'error',
                        backgroundByType: true,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.exampleContainer}>
              <Text style={styles.subtitle}>Loading Alert</Text>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 1,
                  }}>
                  <Button
                    color={'white'}
                    title={'Show Loading Alert'}
                    onPress={showLoadingAlert}
                  />
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    flex: 1,
                  }}>
                  <Button
                    color={'white'}
                    title={'Show Loading And Change Content'}
                    onPress={showLoadingAlertWithContentChange}
                  />
                </View>
              </View>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginBottom: 20,
              }}>
              If you want to see more examples, please refer to the
              documentation to do amazing things with this library.
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export const App = () => {
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <AlertProvider useDeviceTheme>
        <Home />
      </AlertProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'gray',
    borderRadius: 10,
    flex: 1,
    marginBottom: 20,
  },
  exampleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
