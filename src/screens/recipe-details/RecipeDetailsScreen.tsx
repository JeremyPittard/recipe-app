import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Route, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import {
  ChevronLeftIcon,
  ClockIcon,
  HeartIcon,
} from "react-native-heroicons/outline";

type RecipeDetailScreenProps = {
  route: Route<any, any>;
};

type RecipeParams = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const RecipeDetailScreen = (props: RecipeDetailScreenProps) => {
  const recipe: RecipeParams = props.route.params as RecipeParams;
  const [isFavourited, setIsFavourited] = React.useState(false);
  const [recipeData, setRecipeData] = useState<any>(null);
  const navigation = useNavigation();

  const getRecipeData = async (id: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecipeData(data.meals[0]);
    } catch (error) {
      throw new Error(`HTTP error! status: ${error}`);
    }
  };

  const ingredientsIndexes = (recipe: any) => {
    if (!recipe) return [];

    const indexes = [];
    for (let index = 1; index <= 20; index++) {
      if (recipe[`strIngredient${index}`]) {
        indexes.push(index);
      }
    }

    return indexes;
  };

  useEffect(() => {
    getRecipeData(recipe.idMeal);
  });
  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <StatusBar style="light" />

      <View className="flex-row justify-center">
        <Image
          source={{ uri: recipe.strMealThumb }}
          className="w-[98vw] h-[50vh] mt-2 rounded-3xl"
        />
      </View>

      <View className="w-full absolute flex-row justify-between items-center pt-10 px-4">
        <Pressable
          className="p-2 bg-white rounded-full flex justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon strokeWidth={3} size={30} color={"black"} />
        </Pressable>
        <Pressable
          className="p-2 bg-white rounded-full flex justify-center items-center"
          onPress={() => setIsFavourited(!isFavourited)}
        >
          <HeartIcon
            strokeWidth={3}
            size={30}
            color={"red"}
            fill={"red"}
            fillOpacity={isFavourited ? 1 : 0}
          />
        </Pressable>
      </View>

      {recipeData && (
        <View className="px-4 flex justify-center space-4-4 pt-8">
          <View className="space-y-2">
            <Text className="text-3xl font-bold text-left">
              {recipeData?.strMeal}
            </Text>
            <Text className="text-xl font-medium text-left text-neutral-600">
              {recipeData?.strArea}
            </Text>
          </View>
          <View className="space-y-4">
            <Text className="font-bold flex-1 text-xl mt-4">Ingredients</Text>
            <View className="space-y-2">
              {ingredientsIndexes(recipeData).map((index) => (
                <View
                  key={`ingredient-${index}`}
                  className="flex-row space-x-4"
                >
                  <Text>
                    {recipeData[`strMeasure${index}`]} -{" "}
                    {recipeData[`strIngredient${index}`]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="space-y-4">
            <Text className="font-bold flex-1 text-xl mt-4">Do the thing</Text>
            <View className="space-y-2">
              <Text>{recipeData.strInstructions}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
