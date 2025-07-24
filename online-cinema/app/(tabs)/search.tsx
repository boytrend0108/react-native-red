import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { fetchPopularMovies } from '../services/api';
import { updateSearchCount } from '../services/appwrite';
import { useFetch } from '../services/useFetch';

const Search = () => {
  const [query, setQuery] = useState('');

  const {
    data,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchPopularMovies({ query: query }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (data?.length > 0 && data[0]) {
      const movie = data[0];
      updateSearchCount(query, movie);
    }
  }, [data]);

  const renderHeader = () => {
    return (
      <View>
        {moviesLoading && (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className='mt-10 self-center'
          />
        )}

        {moviesError && (
          <View className='px-5 justify-center mt-10'>
            <Text className='text-white'>Error: {moviesError?.message}</Text>
          </View>
        )}

        {!moviesLoading && !moviesError && data?.results && (
          <Text className='text-lg text-white font-bold mt-5 mb-3'>
            Search Results for: {query}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={images.bg} className='absolute w-full h-full z-0' />
      <Image source={icons.logo} className='w-12 h-10 mb-20 mt-10 mx-auto' />
      <SearchBar searchText={query} setSearchText={setQuery} />

      <FlatList
        className='flex-1 px-5 w-full'
        data={moviesLoading ? [] : data || []}
        renderItem={({ item }) => <MovieCard movie={item as Movie} />}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 15,
          gap: 10,
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='flex-1 items-center justify-center mt-10'>
              <Text className='text-white'>No results found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
