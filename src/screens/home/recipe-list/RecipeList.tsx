import { View, Text } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { MEALS } from "../../../constants";

const RecipeList = () => {
  return (
    <View className="mx-4 space-y-3">
      <Text className="font-semibold">RecipeList</Text>
      <View>
        <MasonryList
          data={MEALS}
          keyExtractor={(item): string => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
          //   refreshing={isLoadingNext}
          //   onRefresh={() => refetch({ first: ITEM_CNT })}
          onEndReachedThreshold={0.1}
          //   onEndReached={() => loadNext(ITEM_CNT)}
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
  return (
    <View>
      <Text>{item.strMeal}</Text>
    </View>
  );
};

export default RecipeList;
