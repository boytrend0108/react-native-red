import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabIcon = ({ focused, source, icon, title }: any) => {
  if (focused) {
    return (
      <View className='w-full h-full items-center justify-center'>
        <ImageBackground
          source={source}
          className='flex flex-row items-center justify-center min-w-[112px] mt-[18px] rounded-full overflow-hidden'
          style={{ height: 60 }} // Now fits within the 60px tab bar height
        >
          <Image source={icon} tintColor='#151312' className='size-5' />

          <Text className='text-secondary text-base font-semibold ml-2'>
            {title}
          </Text>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View className='w-full h-full items-center justify-center mt-4'>
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
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 46,
          height: 60,
          position: 'absolute',
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderColor: '#0f0d23',
          paddingTop: 0,
          paddingBottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
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
