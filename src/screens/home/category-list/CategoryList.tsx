import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type CategoryProps = {
  categories: any[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryList = ({
  categories,
  activeCategory,
  setActiveCategory,
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

          const isActive: boolean = activeCategory === index;
          const ActiveClass = isActive ? "bg-amber-500" : "bg-black/5";
          return (
            <Pressable
              key={`category-${index}`}
              onPress={() => setActiveCategory(index)}
              className="flex items-center space-y-1 active:opacity-50"
            >
              <View className="rounded-full p-1">
                <Image
                  source={{ uri: imgSrc }}
                  className={`w-16 h-16 rounded-full ${ActiveClass}`}
                  resizeMode="contain"
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
