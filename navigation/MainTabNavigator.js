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

const chats = createStackNavigator({
	Products: {
		screen: Products,
		navigationOptions: {
			header: null
		}
	},
	Chats: {
		screen: Chats,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header
					name="Все сообщения"
					openDrawer={navigation.openDrawer}
				/>
			)
		}
	},
	Chat: {
		screen: Chat,
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
			header: ({ navigation }) => (
				<Header back name="Добавляем объявления" />
			)
		}
	},
	UserAds: {
		screen: UserAds,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header back name="Объявления пользователя" />
			)
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
			header: ({ navigation }) => (
				<Header back name="Добавляем объявления" />
			)
		}
	},
	UserAds: {
		screen: UserAds,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header back name="Объявления пользователя" />
			)
		}
	},
	Subcategories: {
		screen: Subcategories,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header back name="Выберите субкатегорию" />
			)
		}
	}
});

//({ navigation }) => <ImageHeader {...{ navigation }} />

const favorites = createStackNavigator({
	Favorites: {
		screen: Favorites,
		navigationOptions: {
			header: ({ navigation }) => <Header name="Избранные объявления" />
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
			header: ({ navigation }) => <Header name="Настройки профиля" />
		}
	},
	Ads: {
		screen: Ads,
		navigationOptions: {
			header: ({ navigation }) => <Header back name="Мои объявления" />
		}
	},
	EditAds: {
		screen: EditAds,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header back name="Редактировать объявления" />
			)
		}
	},
	Payment: {
		screen: Payment,
		navigationOptions: {
			header: ({ navigation }) => <Header back name="Пополнение счета" />
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
			header: ({ navigation }) => <Header name="Сервисы" />
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
export default createDrawerNavigator(
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
				tabBarComponent: TabBar
			}
		)
	},
	{ contentComponent: DrawerContent, drawerType: "slide" }
);
