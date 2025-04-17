import {View, Text, TouchableOpacity, Image, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, StyleSheet, ImageStyle, ViewStyle} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { uiStyles } from '@/styles/uiStyles';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../shared/CustomText';
import { commonStyles } from '@/styles/commonStyles';
import { Colors } from '@/utils/Constants';

const { width } = Dimensions.get('window');

const cubes = [
    {name: 'Sedan', imageUri: require('@/assets/icons/sedan.png')},
    {name: 'Sedan Premium', imageUri: require('@/assets/icons/sedan.png')},
    {name: 'Suv', imageUri: require('@/assets/icons/suv.png')},
    {name: 'Suv Premium', imageUri: require('@/assets/icons/suv.png')},
    {name: 'Mini', imageUri: require('@/assets/icons/mini.png')},
]; 

// Ad carousel slides
const adSlides = [
    { id: 1, imageUri: require('@/assets/images/ad_banner.png') },
    { id: 2, imageUri: require('@/assets/images/ad_banner.png') },
    { id: 3, imageUri: require('@/assets/images/ad_banner.png') },
    { id: 4, imageUri: require('@/assets/images/ad_banner.png') },
];

const SheetContent = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    
    // Auto-scroll timer for carousel
    useEffect(() => {
        const timer = setInterval(() => {
            if (scrollViewRef.current) {
                const nextSlide = (activeSlide + 1) % adSlides.length;
                scrollViewRef.current.scrollTo({ x: nextSlide * width, animated: true });
                setActiveSlide(nextSlide);
            }
        }, 3000); // Change slide every 3 seconds
        
        return () => clearInterval(timer);
    }, [activeSlide]);
    
    // Handle scroll event to update active slide indicator
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setActiveSlide(index);
    };
    
    return(
        <View style={{height: '100%'}}>
            <TouchableOpacity style={uiStyles.searchBarContainer} onPress={()=> router.navigate('/customer/selectlocations')}>
                <Ionicons name="search-outline" size={RFValue(16)} color= "black" />
                <CustomText fontFamily='Medium' fontSize={11}>Where are you going?</CustomText>
            </TouchableOpacity>

            <View style={commonStyles.flexRowBetween}>
                <CustomText fontFamily='Medium' fontSize={11}>
                    Explore 
                </CustomText>

                <TouchableOpacity style={commonStyles.flexRow}>
                    <CustomText fontFamily='Medium' fontSize={10} >
                        View all
                    </CustomText>  
                    <Ionicons name="chevron-forward" size={RFValue(14)} color= "black" />
                </TouchableOpacity>
            </View>

            <View style={uiStyles.cubes}>
                {cubes?.slice(0, 4).map((item, index) => (
                    <TouchableOpacity style={uiStyles.cubeContainer} key={index} onPress={()=> router.navigate('/customer/selectlocations')}>
                        <View style={uiStyles.cubeIconContainer}>
                            <Image source={item?.imageUri} style={uiStyles.cubeIcon} />
                        </View>

                        <CustomText fontFamily='Medium' fontSize={9.5} style={{textAlign: 'center'}}>
                            {item?.name}
                        </CustomText>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Ad Carousel */}
            <View style={styles.carouselContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {adSlides.map((slide) => (
                        <TouchableOpacity 
                            key={slide.id} 
                            style={styles.slide}
                            onPress={() => console.log(`Ad ${slide.id} clicked`)}
                        >
                            <Image source={slide.imageUri} style={styles.adImage} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                
                {/* Pagination dots */}
                <View style={styles.paginationContainer}>
                    {adSlides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                { backgroundColor: index === activeSlide ? Colors.primary : '#E5E7EA' }
                            ]}
                        />
                    ))}
                </View>
            </View>
        </View>
    )     
} 

const styles = StyleSheet.create({
    carouselContainer: {
        height: 150,
        marginVertical: 10,
    },
    slide: {
        width,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    adImage: {
        width: width - 20,
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    } as ImageStyle,
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    } as ViewStyle,
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    }
});

export default SheetContent