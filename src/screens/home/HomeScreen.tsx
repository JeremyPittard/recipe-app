import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import CategoryList from "./category-list/CategoryList";
import { useEffect, useState } from "react";
import RecipeList from "./recipe-list";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string>("1");
  const [categories, setCategories] = useState<any>([]);

  // TODO move to services file. create a type for the respose
  const getCategories = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      throw new Error(`HTTP error! status: ${error}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          <BellIcon size={32} color="black" />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-lg">G'day jza</Text>
        </View>
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-2">
          <TextInput
            placeholder="Search"
            placeholderTextColor={"black"}
            className="text-lg flex-1 mb-1 pl-3 tracking-wider"
          />
          <Pressable
            className="bg-white rounded-full p-3 active:opacity-20"
            hitSlop={40}
            onPress={() => console.log("Pressed")}
          >
            <MagnifyingGlassIcon size={20} strokeWidth={3} color={"black"} />
          </Pressable>
        </View>
        <View>
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </View>
        <View>
          <RecipeList />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
