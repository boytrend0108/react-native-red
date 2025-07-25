import { icons } from '@/constants/icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { fetchMovieDetails } from '../services/api';
import { useFetch } from '../services/useFetch';

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className='flex-col items-start justify-center mt-5 px-4'>
      <Text className='text-gray-400 text-sm font-bold mr-1'>{label}:</Text>
      <Text className='text-white text-sm'>{value}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string), true);

  console.log('Movie details:', movie);

  return (
    <View className='bg-primary flex-1 pb-10'>
      <ScrollView>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
          }}
          className='w-full h-[550px] rounded-lg'
          resizeMode='stretch'
        />
        <Text className='text-white font-bold text-xl mt-4 pl-4'>
          {movie?.title}
        </Text>

        <View className='px-4 mt-2'>
          <Text className='text-gray-400 text-sm font-bold'>
            {movie?.release_date ? movie.release_date.split('-')[0] : ''}
          </Text>
        </View>

        <View className='px-4 mt-2 flex flex-row items-center'>
          <Image source={icons.star} />
          <Text className='text-white text-sm ml-1 font-bold'>
            {movie?.vote_average ? Math.round(movie.vote_average) / 2 : 0}/10
          </Text>
          <Text className='text-gray-400 text-sm ml-1 font-bold'>
            ({movie?.vote_count} votes)
          </Text>
        </View>

        <MovieInfo
          label='Genre'
          value={movie?.genres.map((genre) => genre.name).join(', ') || null}
        />
        <MovieInfo label='Overview' value={movie?.overview || null} />
        <MovieInfo
          label='Runtime'
          value={movie?.runtime ? `${movie.runtime} minutes` : null}
        />
        <MovieInfo label='Release Date' value={movie?.release_date || null} />
        <MovieInfo
          label='Budget'
          value={movie?.budget ? `$${movie.budget.toLocaleString()}` : null}
        />
        <TouchableOpacity
          className='bg-accent p-4 rounded-lg mx-4 mt-4'
          onPress={() => router.back()}
        >
          <Image source={icons.arrow} className='w-6 h-6 mx-auto rotate-180' />
          <Text className='text-white text-center font-bold'>Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
