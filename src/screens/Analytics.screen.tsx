import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import R from 'ramda';
import { useMoodListContext } from '../providers/moodLists.provider';
import { theme } from '../theme';

export const Analytics: React.FC = () => {
  const { moodList } = useMoodListContext();

  const data = Object.entries(
    R.groupBy(({ mood }) => mood.emoji, moodList),
  ).map(([key, value]) => ({ x: key, y: value.length }));

  return (
    <View style={styles.container}>
      <VictoryPie
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={{ labels: { fontSize: 30 } }}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
