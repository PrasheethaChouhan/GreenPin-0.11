import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "firebase";
const { width } = Dimensions.get("screen");
import db from "../config";

import { Header, Icon, Badge } from "react-native-elements";
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      ngoId: firebase.auth().currentUser.email,
      upcomingEvents: [],
    };
  }
  getEvents = () => {
    var email = this.state.ngoId;
    this.requestRef = db.collection("events").onSnapshot((snapshot) => {
      var dbUpcomingEvents = [];

      snapshot.docs.map((doc) => {
        dbUpcomingEvents.push(doc.data());
      });
      console.log(dbUpcomingEvents);

      this.setState({
        upcomingEvents: dbUpcomingEvents,
      });
      console.log(this.state.upcomingEvents);
    });
  };
  componentDidMount() {
    this.getEvents();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            padding: 10,
            borderWidth: 2,
            borderColor: "white",
            margin: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate("NGOeventScreen", {
              eventDetails: item,
            });
          }}
        >
          <Image source={item.eventImage} style={styles.img} />
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", textAlign: "center", margin: 5 }}>
              Name: {item.eventName}
            </Text>
            <Text style={{ color: "white", textAlign: "center" }}>
              Event Id: {item.eventId}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1B2E0F",
          marginTop: -30,
        }}
      >
        <Header
          centerComponent={{
            text: "GreenPin",
            style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
          }}
          rightComponent={
            <Icon
              name="paw"
              type="font-awesome"
              color="#696969"
              onPress={() => {
                this.props.navigation.navigate("NotificationScreen");
              }}
            />
          }
          backgroundColor="#eaf8fe"
        />

        <Text
          style={{
            color: "white",
            marginTop: 10,
            marginLeft: "-53%",
            fontSize: 22,
          }}
        >
          Upcoming Events
        </Text>

        <View
          style={{
            flex: 1,
            backgroundColor: "#1B2E0F",
            color: "#82152b",
          }}
        >
          {this.state.upcomingEvents.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>No event found</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.upcomingEvents}
              renderItem={this.renderItem}
            />
          )}
        </View>

        <Text style={{ color: "white", marginTop: 20, fontSize: 22 }}>
          Recent Plantations
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 300,
            padding: 10,
            marginTop: 10,
            backgroundColor: "#1B2E0F",
            color: "#82152b",
          }}
        >
          <ScrollView horizontal={true}>
            <Image
              style={{ width: 300, height: 300, padding: 10 }}
              source={require("../assets/images1.jpeg")}
            />
            <Image
              style={{ width: 300, height: 300 }}
              source={require("../assets/images2.jpeg")}
            />
            <Image
              style={{ width: 600, height: 280 }}
              source={require("../assets/images3.jpeg")}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
  },
  products: {
    width: width - 50 * 2,
    paddingVertical: 50 * 2,
  },

  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  productDescription: {
    padding: 50,
  },
  imageStyles: {
    width: 200,
    height: 200,
  },
  shadow: {
    shadowColor: "#415136",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageContainer: {
    elevation: 1,
  },
  button: {
    width: "95%",
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#375C1E",
    marginTop: 10,
  },

  img: {
    flex: 0.4,
    width: "50%",
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
    justifyContent: "center",
  },
});
