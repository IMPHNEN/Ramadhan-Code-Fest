import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Main = () => {
    const navigation = useNavigation();
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [countdownTime, setCountdownTime] = useState(null);
    const [countdownMinutes, setCountdownMinutes] = useState(0);
    const countdownInputRef = useRef(null); 

    const startCountdown = () => {
        const countdownEndTime = dayjs().add(countdownMinutes, 'minute');
        setCountdownTime(countdownEndTime);
        if (countdownInputRef.current) {
            countdownInputRef.current.clear(); //Clear the input field after settting the time countdown
        }
    };

    // countdown time
    const getRemainingTime = () => {
        if (countdownTime) {
            const remainingSeconds = countdownTime.diff(dayjs(), 'second');
            if (remainingSeconds > 0) {
                const minutes = Math.floor(remainingSeconds / 60);
                const seconds = remainingSeconds % 60;
                return `${minutes}m ${seconds}s`;
            } else {
                return 'Countdown finished';
            }
        } 
    };

    useFocusEffect(
        React.useCallback(() => {
            const interval = setInterval(() => {
                setCurrentTime(dayjs());
            }, 1000); // for every 1 second, the countdown will decrease

            return () => clearInterval(interval);
        }, [])
    );

    return (
        <View style={styles.main}>
            <Text style={styles.countdown}>{getRemainingTime()}</Text>
            <View style={styles.countdownInputContainer}>
                <TextInput
                    ref={countdownInputRef} 
                    style={styles.countdownInput}
                    keyboardType="numeric"
                    placeholder="Enter minutes"
                    onChangeText={(text) => setCountdownMinutes(parseInt(text) || 0)}
                />
                <Button title="Start Countdown" onPress={startCountdown} />
            </View>
        </View>
    );
};

export default Main;
//styling
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
    countdown: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 20,
    },
    setCountdownButton: {
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
    },
    countdownInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countdownInput: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
});
