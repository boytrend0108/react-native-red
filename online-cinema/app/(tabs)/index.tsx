import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';
import SearchBar from '../components/SearchBar';

export default function Index() {
  const router = useRouter();

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={images.bg} className='absolute w-full h-full z-0' />

      <ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className='w-12 h-10 mb-20 mt-10 mx-auto' />

        <SearchBar onPress={() => router.push('/search')} />
      </ScrollView>
    </View>
  );
}
