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
import Loading from "../../components/loading";
import recipeList from "./recipe-list";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string>("beef");
  const [categories, setCategories] = useState<any>([]);
  const [recipes, setRecipes] = useState<any>([]);

  // TODO move to services file. create a type for the respose,
  // make it a get data and take params for the endpoint
  const getCategories = async () => {
    try {
      const response = await fetch(
        "https://themealdb.com/api/json/v1/1/categories.php"
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

  const getRecipes = async (category = "dessert") => {
    try {
      const response = await fetch(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      throw new Error(`HTTP error! status: ${error}`);
    }
  };

  const handleCategoryChange = (category: string) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipes([]);
  };

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="white" />
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
            handleCategoryChange={handleCategoryChange}
          />
        </View>
        <View>
          {categories.length === 0 || recipes.length === 0 ? (
            <Loading size="large" />
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
