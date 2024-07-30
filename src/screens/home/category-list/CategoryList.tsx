import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Image } from "expo-image";
import { blurhash } from "../../../constants/vars";

type CategoryProps = {
  categories: any[];
  activeCategory: string;
  handleCategoryChange: any;
};

const CategoryList = ({
  categories,
  activeCategory,
  handleCategoryChange,
}: CategoryProps) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(250).springify()}
      exiting={FadeOutDown}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {categories.map((cat) => {
          const {
            strCategory: name,
            strCategoryThumb: imgSrc,
            idCategory: index,
          } = cat;

          const isActive: boolean = activeCategory === name.toLowerCase();
          const ActiveClass = isActive ? "bg-amber-500" : "bg-black/5";
          return (
            <Pressable
              key={`category-${index}`}
              onPress={() => handleCategoryChange(name.toLowerCase())}
              className="flex items-center space-y-1 active:opacity-50"
            >
              <View className="rounded-full p-1">
                <Image
                  source={{ uri: imgSrc }}
                  className={`w-16 h-16 rounded-full ${ActiveClass}`}
                  contentFit="cover"
                  placeholder={{ blurhash }}
                />
              </View>
              <Text>{name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default CategoryList;
