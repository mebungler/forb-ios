import React from "react";
import { Platform } from "react-native";
import {
	createStackNavigator,
	createBottomTabNavigator,
	createDrawerNavigator
} from "react-navigation";

import { View, Text, Image } from "react-native";

import logo from "../assets/images/logo.png";
import focusedLogo from "../assets/images/logo.png";

import TabBar from "../components/TabBar";
import Icon from "../services/IconService";
import HomeScreen from "../screens/Login";
import Chats from "../screens/Chats";
import Colors from "../constants/Colors";
import Products from "../screens/Products";
import Product from "../screens/Product";
import Header from "../components/Header";
import Chat from "../screens/Chat";
import Account from "../screens/Account";
import Ads from "../screens/Ads";
import EditAds from "../screens/EditAds";
import Services from "../screens/Services";
import Statistics from "../screens/Statistics";
import Payment from "../screens/Payment";
import AddProduct from "../screens/AddProduct";
import Favorites from "../screens/Favorites";
import DrawerContent from "../components/DrawerContent";
import ImageHeader from "../components/ImageHeader";
import Home from "../screens/Home";
import Subcategories from "../screens/Subcategories";
import UserAds from "../screens/UserAds";
import Filter from "../screens/Filter";
import PickLocation from "../screens/PickLocation";
import ImageView from "../screens/ImageView";
import WebView from "../screens/WebView";
import strings from "../localization/Strings";

const chats = createStackNavigator({
	Products: {
		screen: Products,
		navigationOptions: {
			header: null
		}
	},
	AddProduct: {
		screen: AddProduct,
		navigationOptions: {
			header: ({ navigation }) => <Header back name={strings.addAd} />
		}
	},
	UserAds: {
		screen: UserAds,
		navigationOptions: {
			header: ({ navigation }) => <Header back name={strings.userAds} />
		}
	},
	Product: {
		screen: Product,
		navigationOptions: {
			header: null
		}
	}
});

const products = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			header: null
		}
	},
	Products: {
		screen: Products,
		navigationOptions: {
			header: null
		}
	},
	Product: {
		screen: Product,
		navigationOptions: {
			header: null
		}
	},
	AddProduct: {
		screen: AddProduct,
		navigationOptions: {
			header: ({ navigation }) => <Header back name={strings.addAd} />
		}
	},
	UserAds: {
		screen: UserAds,
		navigationOptions: {
			header: ({ navigation }) => <Header back name={strings.userAds} />
		}
	},
	Subcategories: {
		screen: Subcategories,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header back name={strings.chooseSubcategory} />
			)
		}
	},
	Chat: {
		screen: Chat,
		navigationOptions: {
			header: null
		}
	}
});

//({ navigation }) => <ImageHeader {...{ navigation }} />

const favorites = createStackNavigator({
	Favorites: {
		screen: Favorites,
		navigationOptions: {
			header: ({ navigation }) => <Header name={strings.featuredAds} />
		}
	},
	Product: {
		screen: Product,
		navigationOptions: {
			header: null
		}
	}
});

const account = createStackNavigator({
	Account: {
		screen: Account,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header name={strings.profileSettings} />
			)
		}
	},
	Ads: {
		screen: Ads,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header back name={strings.myAnnouncements} />
			)
		}
	},
	EditAds: {
		screen: EditAds,
		navigationOptions: {
			header: ({ navigation }) => <Header back name={strings.editAd} />
		}
	},
	Payment: {
		screen: Payment,
		navigationOptions: {
			header: ({ navigation }) => <Header back name={strings.refill} />
		}
	},
	Statistics: {
		screen: Statistics,
		navigationOptions: {
			header: ({ navigation }) => <Header back name="Статистика" />
		}
	}
});

const services = createStackNavigator({
	Services: {
		screen: Services,
		navigationOptions: {
			header: ({ navigation }) => <Header name={strings.services} />
		}
	}
});

services.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<Icon
			name="organization"
			size={22}
			color={focused ? Colors.white : Colors.blue}
		/>
	)
};

chats.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<Icon
			name="categories-plus"
			size={22}
			color={focused ? Colors.white : Colors.blue}
		/>
	)
};

products.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<Icon
			name="forb"
			size={26}
			color={focused ? Colors.white : Colors.blue}
		/>
	)
};
favorites.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<Icon
			name="like"
			size={22}
			color={focused ? Colors.white : Colors.blue}
		/>
	)
};

account.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<Icon
			name="name"
			size={22}
			color={focused ? Colors.white : Colors.blue}
		/>
	)
};
export default createStackNavigator(
	{
		Rest: {
			screen: createDrawerNavigator(
				{
					Tabs: createBottomTabNavigator(
						{
							ProductsTab: products,
							ChatsTab: chats,
							ServicesTab: services,
							FavoritesTab: favorites,
							AccountTab: account
						},
						{
							tabBarComponent: TabBar,
							tabBarOptions: {
								keyboardHidesTabBar: true
							}
						}
					)
				},
				{ contentComponent: DrawerContent, drawerType: "slide" }
			),
			navigationOptions: { header: null }
		},
		Filter: {
			screen: Filter,
			navigationOptions: {
				header: null
			}
		},
		PickLocation: {
			screen: PickLocation,
			navigationOptions: {
				header: navigation => <Header back name={strings.address} />
			}
		},
		ImageView: {
			screen: ImageView,
			navigationOptions: {
				header: null
			}
		},
		WebView: {
			screen: WebView,
			navigationOptions: {
				header: null
			}
		},
		Chats: {
			screen: Chats,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name={strings.allPosts}
						back
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		}
	},
	{ mode: "modal" }
);
