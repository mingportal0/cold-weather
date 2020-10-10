import React from "react";
import { StyleSheet, View, Text, StatusBar, Alert, TouchableHighlight  } from "react-native";
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import Loading from '../common/loading';
import ViewMap from '../map/viewMap';

const API_KEY = "843fefc7ea5dba4e0d60df4c582b7ade";



const weatherOption = {
    Default: {
        iconName: "weather-sunny",
        gradient: ["#00B4DB", "#0083B0"],
        subtitle: "맑음"
    },
    Thunderstorm: {
        iconName: "weather-lightning",
        gradient: ["#000000", "#434343"],
        subtitle: "천둥번개"
    },
    Drizzle: {
        iconName: "weather-pouring",
        gradient: ["#3a7bd5", "#3a6073"],
        subtitle: "소나기"
    },
    Rain: {
        iconName: "weather-pouring",
        gradient: ["#000046", "#1CB5E0"],
        subtitle: "비"
    },
    Snow: {
        iconName: "weather-snowy-heavy",
        gradient: ["#C9D6FF", "#E2E2E2"],
        subtitle: "눈"
    },
    Clear: {
        iconName: "weather-sunny",
        gradient: ["#00B4DB", "#0083B0"],
        subtitle: "맑음"
    },
    Clouds: {
        iconName: "weather-cloudy",
        gradient: ["#3C3B3F", "#605C3C"],
        subtitle: "구름"
    },
    Haze: {
        iconName: "weather-hazy",
        gradient: ["#4DA0B0", "#D39D38"],
        subtitle: "안개"
    },
    Mist: {
        iconName: "weather-fog",
        gradient: ["#74ebd5", "#ACB6E5"],
        subtitle: "안개"
    }
}
export default class extends React.Component{

    /**
     * 생성자
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.state = { 
            navigation: props.navigation,
            isLoading: true
        };
    }

    render() {
        //return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} city={city} region={region} />;
        //return <Loading />;
        return this.state.isLoading ? <Loading /> : (
            <LinearGradient colors={weatherOption[this.state.condition].gradient || weatherOption["Default"].gradient} style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.halfcontainer}>
                    <TouchableHighlight onPress={()=>this.state.navigation.navigate('ViewMap', {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        })
                    }>
                        <MaterialCommunityIcons name="map-marker-radius" size={40} color="white"></MaterialCommunityIcons>
                    </TouchableHighlight>
                    <Text style={styles.region}>{this.state.region}</Text>
                    <Text style={styles.region}>{this.state.city}</Text>
                </View>
                <View style={styles.halfcontainer}>
                    <MaterialCommunityIcons name={weatherOption[this.state.condition].iconName || weatherOption["Default"].iconName} size={96} color="white"></MaterialCommunityIcons>
                    <Text style={styles.temp}>{this.state.temp}º</Text>
                </View>
                <View style={styles.halfcontainer}>
                    <Text style={styles.subtitle}>{weatherOption[this.state.condition].subtitle || weatherOption["Default"].subtitle}</Text>
                </View>
            </LinearGradient>
        )
    }
    componentDidMount() {
        this.getLocation();
    }
    componentDidUpdate(){
        //console.log(this.state);
    }
    componentWillUnmount(){
        
    }
    /**
     * 날씨 가져오기
     * @param {*} latitude 
     * @param {*} longitude 
     */
    getWeather = async (latitude, longitude) => {
        let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        const {
            data: {
            main: { temp },
            weather
            }
        } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        this.setState({
            isLoading: false,
            condition: weather[0].main,
            temp: temp,
            city: geocode[0].city,
            region: geocode[0].region,
            latitude: latitude,
            longitude: longitude
        });
    }
    
    /**
     * 현재 위치 가져오기
     */
    getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();
            const {
                coords: { latitude, longitude }
            } = await Location.getCurrentPositionAsync();
            this.getWeather(latitude, longitude);
        } catch (error) {
            Alert.alert("Cant't find you!", "So sad.");
        }
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    halfcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
        fontSize: 36,
        color: "white"
    },
    subtitle: {
        fontSize: 26,
        color: "white"
    },
    region: {
        fontSize: 40,
        color: "white"
    }
});