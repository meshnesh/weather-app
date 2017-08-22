import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
   animatedContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  temperature: {
    fontSize: 62,
    fontWeight: "100",
    margin: 0
  },
  location: {
    fontSize: 14,
    fontWeight: "100",
    marginBottom: 20,
  },
  weatherType: {
    fontSize: 34,
    fontWeight: "500"
  },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    height: 40,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  icon: {
    fontFamily: 'WeatherIcons-Regular',
    fontSize: 130,
    padding: 0
  }
});
export default Style;