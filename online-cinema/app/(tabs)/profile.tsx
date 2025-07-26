import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

const profile = () => {
  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={icons.person} />
      <Text className='text-white'>Profile</Text>
    </View>
  );
};

export default profile;
