import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className='flex-1 items-center justify-center bg-gray-200'>
      <Text className='text- text-3xl font-bold'>Hello bro!!!</Text>

      <Link href='/onboarding'>Onbording</Link>
      <Link href={{ pathname: '/movie/[id]', params: { id: 'avengers' } }}>
        Avengers Movie
      </Link>
    </View>
  );
}
