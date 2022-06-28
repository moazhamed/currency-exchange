import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    selectionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: height * 0.02
    },
    button: {
        width: width * 0.45,
        borderRadius: 15,
        marginTop: height * 0.05
    },
    currencyRatio: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'blue',
        justifyContent: 'center'
    },
    graph: {
        marginVertical: 50,
        borderRadius: 30
    }
});