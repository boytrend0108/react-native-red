import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { id, title, poster_path, release_date, vote_average } = movie;
  console.log('MovieCard', movie.title);

  return (
    <Link href={`/movie/${id}`} className='flex-1 rounded-lg' asChild>
      <TouchableOpacity className='flex-1 w-full'>
        <Image
          source={
            poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500${poster_path}` }
              : images.imagePlaceholder
          }
          className='w-full h-52 mb-2'
          resizeMode='cover'
        />
        <Text className='text-white text-sm' numberOfLines={1}>
          {title}
        </Text>

        <View className='flex-row items-center justify-start gap-x-1'>
          <Image source={icons.star} className='size-4' />

          <Text className='text-xs text-white'>
            {Math.round(vote_average) / 2}
          </Text>
        </View>

        <View className='flex-row items-center justify-start gap-x-1'>
          <Text className='text-xs text-gray-400  '>
            {release_date ? release_date.split('-')[0] : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
