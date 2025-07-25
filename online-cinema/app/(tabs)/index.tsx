import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import TrendingCart from '../components/TrendingCart';
import { fetchPopularMovies } from '../services/api';
import { getTrendingMovies } from '../services/appwrite';
import { useFetch } from '../services/useFetch';

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies, true);

  const {
    data,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: '' }), true);

  return (
    <View className='flex-1 items-center justify-start bg-primary'>
      <Image source={images.bg} className='absolute w-full h-full z-0' />

      <View>
        <Image source={icons.logo} className='w-12 h-10 mb-10 mt-10 mx-auto' />
        <SearchBar onPress={() => router.push('/search')} />
      </View>

      {moviesLoading || trendingLoading ? (
        <ActivityIndicator
          size='large'
          color='#0000ff'
          className='mt-10 self-center'
        />
      ) : moviesError || trendingError ? (
        <View className='flex-1 px-5 justify-center'>
          <Text className='text-white'>
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        </View>
      ) : (
        <ScrollView
          className='flex-1 w-full'
          showsVerticalScrollIndicator={false}
        >
          {trendingMovies && (
            <View className='w-full px-5'>
              <Text className='text-lg text-white font-bold mt-5 mb-3'>
                Trending movies
              </Text>

              <FlatList
                horizontal
                ItemSeparatorComponent={() => <View className='w-4' />}
                className='w-full'
                data={trendingMovies || []}
                renderItem={({ item, index }) => (
                  <TrendingCart movie={item} index={index} />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}

          <View className='w-full px-5'>
            <Text className='text-lg text-white font-bold mt-5 mb-3'>
              Latest movies
            </Text>

            <FlatList
              className='w-full'
              data={data}
              renderItem={({ item }) => <MovieCard movie={item as Movie} />}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
                gap: 10,
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
