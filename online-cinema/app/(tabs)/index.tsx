import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { fetchPopularMovies } from '../services/api';
import { useFetch } from '../services/useFetch';

export default function Index() {
  const router = useRouter();

  const {
    data,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: '' }), true);
  console.log('data', data?.results);

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={images.bg} className='absolute w-full h-full z-0' />

      <View>
        <Image source={icons.logo} className='w-12 h-10 mb-20 mt-10 mx-auto' />
        <SearchBar onPress={() => router.push('/search')} />
        <Text className='text-lg text-white font-bold mt-5 mb-3'>
          Latest movies
        </Text>
      </View>

      {moviesLoading ? (
        <ActivityIndicator
          size='large'
          color='#0000ff'
          className='mt-10 self-center'
        />
      ) : moviesError ? (
        <View className='flex-1 px-5 justify-center'>
          <Text className='text-white'>Error: {moviesError?.message}</Text>
        </View>
      ) : (
        <FlatList
          className='flex-1 w-full px-5'
          data={data?.results || []}
          renderItem={({ item }) => <MovieCard movie={item as Movie} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 15,
            gap: 10,
          }}
        />
      )}
    </View>
  );
}
