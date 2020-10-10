import React from "react";
import { StyleSheet, Button, View, StatusBar } from "react-native";
import MapView, {Marker} from 'react-native-maps';

export default class extends React.Component{
    /**
     * 생성자
     * @param {*} props 
     */
    constructor(props){
        super(props);
        //console.log(props);
        this.state = { 
            navigation: props.navigation,
            region: {
                latitude: props.route.params.latitude,
                longitude: props.route.params.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Button title="Go back" onPress={() => this.state.navigation.goBack()} />
                <MapView style={styles.mapStyle} region={this.state.region} onRegionChange={this.onRegionChange}>
                    <Marker coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}} title="현재 위치" />
                </MapView>
            </View>
        );
    }

    componentDidMount() {
        //this.getLocation();
    }
    componentDidUpdate(){
        //console.log(this.state);
    }
    componentWillUnmount(){
        
    }
    onRegionChange= (region) => {
        //Autobinding
        this.onRegionChange.bind(this);
        this.setState({region});
        //console.log(this.state);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF6AA',
    },
    mapStyle: {
        width: "100%",
        height: "100%",
    },
});