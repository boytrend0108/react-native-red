import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabIcon = ({ focused, source, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={source}
        className='w-full flex flex-row flex-1 items-center justify-center min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden'
      >
        <Image source={icon} tintColor='#151312' className='size-5' />
        <Text className='text-secondary text-base font-semibold ml-2'>
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className='size-full rounded-full mt-4 items-center justify-center'>
      <Image
        source={icon}
        className='size-5'
        style={{ tintColor: '#a8b5db' }}
      />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              source={images.highlight}
              title={'Home'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.search}
              source={images.highlight}
              title={'Search'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              source={images.highlight}
              title={'Profile'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='saved'
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.save}
              source={images.highlight}
              title={'Saved'}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
