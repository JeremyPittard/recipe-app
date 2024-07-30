import { View, Text, Pressable } from "react-native";
import MasonryList from "reanimated-masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

type RecipeListProps = {
  recipes: any;
};

// TODO create skeletons

const RecipeList = ({ recipes }: RecipeListProps) => {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text className="font-semibold">RecipeList</Text>
      <View>
        <MasonryList
          data={recipes}
          keyExtractor={(item): string => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecipeCard item={item} index={i} navigation={navigation} />
          )}
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
  navigation: any;
};

// TODO move to own component

const RecipeCard = ({ item, index, navigation }: RecipeCardProps) => {
  const height = index % 3 === 0 ? 25 : 35;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(200)
        .springify()
        .damping(20)}
    >
      <Pressable
        className="w-full flex justify-center mb-4 space-y-2"
        onPress={() => navigation.navigate("RecipeDetails", { ...item })}
      >
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
