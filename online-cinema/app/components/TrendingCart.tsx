import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TrendingCart = ({
  movie,
  index,
}: {
  movie: TrendingMovie;
  index: number;
}) => {
  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity className='flex flex-col items-start justify-start w-32 mr-4'>
        <View className='w-32 relative pl-5'>
          <Image
            source={{ uri: movie.poster_url }}
            className='w-32 h-48 rounded-lg'
            resizeMode='cover'
          />

          <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-b-full'>
            <MaskedView
              maskElement={
                <Text className='font-bold text-white text-6xl'>
                  {index + 1}
                </Text>
              }
            >
              <Image
                source={images.rankingGradient}
                className='size-14'
                resizeMode='cover'
              />
            </MaskedView>
          </View>
        </View>
        <Text className='font-bold text-white text-lg mt-6' numberOfLines={2}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCart;
