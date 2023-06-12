import React from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  Text,
  View,
} from 'react-native';
import alertStyles from './Alert.styles';
import {AlertIcon, AlertLoadingIcon} from '../index';
import {AlertComponentProps, AlertIndicatorType, AlertType} from '../../types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AlertComponent({
  isShowing,
  title,
  message,
  type = AlertType.SUCCESS,
  indicatorType = AlertIndicatorType.ICON,
  icon,
  showIndicator = true,
  onPress,
  theme,
  duration,
  handleHideAlert,
  stayOpen,
  shadowColorByType,
  showProgress,
  progressColor,
  isLoading,
  loadingAnimationMode = 'normal',
  swipeable = false,
  backgroundByType = false,
  hideAfterLoading = true,
}: AlertComponentProps) {
  const s = alertStyles({theme, type});
  const {top} = useSafeAreaInsets();
  const {width} = Dimensions.get('window');
  const [animation] = React.useState<{
    opacity: Animated.Value;
    translateY: Animated.Value;
    translateX: Animated.Value;
  }>({
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(-70),
    translateX: new Animated.Value(0),
  });
  const [progressAnimation] = React.useState<{
    width: Animated.Value;
    barBorderRadius: Animated.Value;
  }>({
    width: new Animated.Value(width * 0.9),
    barBorderRadius: new Animated.Value(10),
  });
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const {dx, dy} = gestureState;
        const dxDifference = Math.abs(dx) - Math.abs(dy);
        return dxDifference > 10;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (
        evt,
        gestureState: PanResponderGestureState & {dx: number; dy: number},
      ) => {
        animation.translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > width * 0.225) {
          Animated.timing(animation.translateX, {
            toValue: gestureState.dx > 0 ? width : -width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            handleHideAlert();
          });
        } else {
          Animated.spring(animation.translateX, {
            toValue: 0,
            speed: 10,
            bounciness: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  React.useEffect(() => {
    if (isShowing) {
      progressAnimation.barBorderRadius.setValue(0);
      if (!isLoading) {
        Animated.timing(progressAnimation.width, {
          toValue: 0,
          delay: 300,
          duration: duration,
          useNativeDriver: false,
        }).start();
      }
      Animated.parallel([
        Animated.timing(animation.opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(animation.translateY, {
          toValue: top,
          speed: 10,
          bounciness: 5,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished && !stayOpen && !isLoading && hideAfterLoading) {
          setTimeout(handleHideAlert, (duration || 0) - 1000);
        }
      });
    } else {
      Animated.parallel([
        Animated.timing(animation.opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animation.translateY, {
          toValue: -80,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          progressAnimation.width.setValue(width * 0.9);
          animation.translateX.setValue(0);
        }
      });
    }
  }, [isShowing, isLoading, duration]);

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        s.container,
        backgroundByType && !isLoading && s.containerByType,
        shadowColorByType && s.shadowByType,
        indicatorType === AlertIndicatorType.BAR &&
          showIndicator &&
          !backgroundByType &&
          s.indicatorBar,
        indicatorType === AlertIndicatorType.BAR &&
          showIndicator &&
          isLoading &&
          s.indicatorBarLoading,
        indicatorType === AlertIndicatorType.BAR &&
          !backgroundByType &&
          s.barByType,
        !showIndicator && s.containerNoIcon,
        {
          ...(!isShowing && {shadowOpacity: 0}),
          transform: [
            {translateY: animation.translateY},
            {translateX: animation.translateX},
          ],
        },
      ]}>
      {showProgress && !stayOpen && !isLoading && (
        <Animated.View
          style={[
            s.progressBar,
            backgroundByType && s.progressBarLoading,
            {
              width: progressAnimation.width,
              borderBottomRightRadius: progressAnimation.barBorderRadius,
              ...(progressColor && {backgroundColor: progressColor}),
            },
          ]}
        />
      )}
      <View
        {...(swipeable && !isLoading && panResponder.panHandlers)}
        style={s.content}>
        <View style={s.contentLeft}>
          <Text numberOfLines={message ? 1 : 2} style={s.title}>
            {title}
          </Text>
          {message && (
            <Text numberOfLines={1} style={s.message}>
              {message}
            </Text>
          )}
        </View>
        <View style={s.contentRight}>
          {!isLoading ? (
            showIndicator && !icon ? (
              indicatorType === AlertIndicatorType.ICON && (
                <AlertIcon
                  forceWhite={backgroundByType}
                  theme={theme}
                  type={type}
                  trigger={isShowing}
                />
              )
            ) : (
              icon
            )
          ) : (
            <AlertLoadingIcon
              animationMode={loadingAnimationMode}
              theme={theme}
              forceWhite={backgroundByType}
            />
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}
