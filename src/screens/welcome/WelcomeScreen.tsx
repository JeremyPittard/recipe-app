import { View, Image, Text } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const outerRingScale = useSharedValue(0);
  const innerRingScale = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    outerRingScale.value = withSpring(1, { duration: 1000 });
    innerRingScale.value = withDelay(100, withSpring(1, { duration: 500 }));
  }, []);

  useEffect(() => {
    setTimeout(() => navigation.navigate("Home"), 2500);
  });
  return (
    <Animated.View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      {/* logo */}
      <Animated.View
        className="bg-white/10 rounded-full p-12"
        style={{ transform: [{ scale: outerRingScale }] }}
      >
        <Animated.View
          className="bg-white/20 rounded-full p-8"
          style={{ transform: [{ scale: innerRingScale }] }}
        >
          <Animated.Image
            source={require("../../../assets/images/logo.png")}
            className="w-32 h-32 "
            resizeMode="contain"
            entering={FadeIn.delay(750)}
          />
        </Animated.View>
      </Animated.View>
      <Animated.View className="flex items-center space-y-2">
        <Animated.Text
          className="text-6xl font-bold tracking-widest capitalize text-white"
          entering={FadeInDown.delay(500)}
        >
          Foody
        </Animated.Text>
        <Animated.Text
          className="font-medium tracking-widest capitalize text-white"
          entering={FadeInDown.delay(650)}
        >
          Food is always right
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default WelcomeScreen;
