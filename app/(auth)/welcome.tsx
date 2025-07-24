import { TouchableOpacity, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboardingData } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboardingData.length - 1;

  const swiperRef = useRef<Swiper>(null);

  const handleSkip = () => {
    router.replace("/(auth)/sign-up");
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={handleSkip}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={setActiveIndex}
      >
        {onboardingData.map((item) => (
          <View key={item.id} className="flex items-center justify-center">
            <Text className="text-black text-2xl font-JakartaBold">
              {item.title}
            </Text>
            {/* <Text className="text-black text-2xl font-JakartaBold">{item.description}</Text> */}
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl text-center font-bold mx-10">
                {item.title}
              </Text>
              <Text className="text-[#858585] text-lg text-center font-JakartaSemiBold mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={
          isLastSlide
            ? () => router.replace("/(auth)/sign-up")
            : () => swiperRef.current?.scrollBy(1)
        }
        className="w-10/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
