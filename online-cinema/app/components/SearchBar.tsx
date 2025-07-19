import { icons } from '@/constants/icons';
import React, { useState } from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  onPress: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ onPress, placeholder }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View className='flex-row items-center justify-between bg-dark-200 rounded-full px-5 py-4 w-full'>
      <Image
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor='#a8b5db'
      />

      <TextInput
        placeholder={placeholder || 'Search...'}
        placeholderTextColor='#a8b5db'
        value={searchText}
        className='flex-1 ml-2 text-white rounded-full px-3 py-2'
        onChangeText={setSearchText}
        onPress={onPress}
      />
    </View>
  );
};

export default SearchBar;
