import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = (props: any) => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <Text className="text-3xl">LOADING</Text>
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
