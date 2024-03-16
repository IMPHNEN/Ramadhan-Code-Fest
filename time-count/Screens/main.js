import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
    const navigation = useNavigation(); 

    const [date, setDate] = useState(dayjs());

    // updating time interval for every second
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(dayjs());
        }, 1000); // upfdating the date for every 1 second

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.main}>
        {/* Date and Day using dayjs */}
            <Text style={styles.time}>{date.format('hh:mm')}</Text>
            <Text style={styles.date}>{date.format('dddd, MMMM DD')}</Text>
            <Button 
            title='Set Countdown'
            onPress={() => navigation.navigate('Onboarding', { screen: 'Setter' })}
            />
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    time: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'aqua',
    },

    date: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 20,
    },
});
