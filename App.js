import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather';
import { API_KEY } from './src/Config';

export default class App extends Component {
	state = {
		isLoading: true,
		temperature: 0,
		weatherCondition: null,
		error: null
	};

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.fetchWeather(position.coords.latitude, position.coords.longitude);
			},
			error => {
				this.setState({
					error: 'Error'
				});
			}
		);
	}

	fetchWeather(lat = 25, lon = 25) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
		)
			.then(res => res.json())
			.then(json => {
				this.setState({
					temperature: json.main.temp,
					weatherCondition: json.weather[0].main,
					isLoading: false
				});
			});
	}

	render() {
		const { isLoading } = this.state;
		return (
			<View style={styles.container}>
        <Text style={styles.NameTitle}>Mohamad Aniq Fakhrul Bin Mohamad Fauzi</Text>
				{isLoading ? (
					<Text>Fetching The Weather</Text>
				) : (
					<Weather
						weather={this.state.weatherCondition}
						temperature={this.state.temperature}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
  },
  NameTitle: {
    textAlign: 'center',
  }
});