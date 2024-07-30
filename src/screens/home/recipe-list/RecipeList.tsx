import { View, Text, Image, Pressable } from "react-native";
import MasonryList from "reanimated-masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";

type RecipeListProps = {
  recipes: any;
};

// TODO create skeletons

const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <View className="mx-4 space-y-3">
      <Text className="font-semibold">RecipeList</Text>
      <View>
        <MasonryList
          data={recipes}
          keyExtractor={(item): string => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
          onEndReachedThreshold={0.1}
          style={{ gap: 16 }}
        />
      </View>
    </View>
  );
};

type RecipeCardProps = {
  item: any;
  index: any;
};

const RecipeCard = ({ item, index }: RecipeCardProps) => {
  const height = index % 3 === 0 ? 25 : 35;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(200)
        .springify()
        .damping(20)}
    >
      <Pressable className="w-full flex justify-center mb-4 space-y-2">
        <Image
          source={{ uri: item.strMealThumb }}
          className={`w-full ${
            index % 3 === 0 ? "h-60" : "h-48"
          } bg-black/5 rounded-xl`}
        />
        <Text className="font-semibold ml-2">
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}{" "}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeList;
