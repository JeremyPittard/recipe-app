import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../../assets/images/avatar.png")}
            className="w-12 h-12"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
