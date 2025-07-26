import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

const saved = () => {
  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={icons.save} />
      <Text className='text-white'>Saved</Text>
    </View>
  );
};

export default saved;
