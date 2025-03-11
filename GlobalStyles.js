import {Dimensions, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('window');

const GlobalStyles = StyleSheet.create({
  firstMenuPage: {
    display: 'flex',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultPageStyle: {
    height: height,
    width: width,
    paddingHorizontal: 20,
  },
  gradientBackground: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneaigHeader: {
    backgroundColor: 'black',
    padding: 14,
  },
  alignTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  oneaigText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  availableTokens: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
  },
  foodImageSize: {
    height: 55,
    width: 55,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  foodViewSize: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    marginBottom: 2,
    borderRadius: 20,
    marginTop: 25,
  },
  CouponsTextSize: {
    fontSize: 12,
    fontWeight: '700',
  },
  OrderScreenBarTextColor: {
    fontSize: 16,
  },
  TextInput: {
    fontSize: 18,
    fontWeight: '400',
  },
  Input: {
    marginTop: 22,
  },

  cardOutline: {
    borderRadius: 5,
    backgroundColor: 'white', // Required for shadow to be visible
    shadowColor: 'black', // Black shadow color
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2, // Shadow transparency (0 to 1)
    shadowRadius: 13, // Blur effect
    elevation: 3, // Required for Android
    padding: 13,
    marginTop: 20,
  },

  CardOrderText: {
    fontWeight: '700',
    fontSize: 20,
  },
  CardCreatedAndEpired: {
    fontWeight: '400',
    fontSize: 13,
    marginTop: 5,
  },
  CardTotalCoupons: {
    color: 'royalblue',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 13,
  },
  TransactionHeadingBackground: {
    backgroundColor: '#00D26A',
  },
  TransactionHeadingTextSize: {
    fontSize: 23,
    fontWeight: '700',
    color: 'white',
  },
  TransactionTimeDateTextSize: {
    fontSize: 13,
    fontWeight: '700',
    color: 'white',
  },
  TransactionOrderDetailsFoodItemsTextSize: {
    fontSize: 17,
  },
  TransactionOrderDetailsHeading: {
    fontSize: 20,
    fontWeight: '700',
  },
  QRcodebarbackground: {
    backgroundColor: '#00D26A',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 4,
  },
  QRcodebarMainHeading: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  QRcodebarSubHeading: {
    fontSize: 15,
    color: 'white',
  },
  QRcodeExpiresHading: {
    fontSize: 13,
    fontWeight: '600',
  },
  QRcodecheckstatus: {
    backgroundColor: 'lightblue',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    borderWidth: 2, // Border thickness
    borderColor: 'darkblue',
  },
  QRcodecheckstatustext: {
    fontSize: 15,
  },
  qrcodesharecancelbuttons:{
    backgroundColor:'royalblue',
    paddingHorizontal:24,
    paddingVertical:10,
    borderRadius:25
  },
  qrcodesharecancelbuttonsText:{
    fontSize:18,
    color:'white',
  }
});

export default GlobalStyles;