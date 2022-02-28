import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/style';
import { render } from 'react-dom';

// Start Values 
let diceArr = [];
const ICONS = [{ value: 1, icon: 'numeric-1-circle' }, { value: 2, icon: 'numeric-2-circle' }, { value: 3, icon: 'numeric-3-circle' }, { value: 4, icon: 'numeric-4-circle' }, { value: 5, icon: 'numeric-5-circle' }, { value: 6, icon: 'numeric-6-circle' }];
const NBR_OF_THROWS = 3;
const NBR_OF_DICES = 5;
const Points_missing_For_Bonus = 63;


export default function Gameboard() {
    const [positionDiceNumber, setPositionDiceNumber] = useState(0);

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices.');
    const [bonusStatus, setBonusStatus] = useState('You are'+ Points_missing_For_Bonus +'points away from bonus');
    const [totalPoints, setTotalPoints] = useState(0);
    const [diceValues, setDiceValues] = useState([]);

    // Selection Arrays for points for numbers of the dices and which dices have been selected in the round one is playing
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(6).fill(false));
    const [choosenNumberPoints, setChoosenNumberPoints] = useState(new Array(6).fill(0));
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

    useEffect(() => {

        if(nbrOfThrowsLeft === NBR_OF_THROWS){
            setStatus('Throw dices.');
        }else if (nbrOfThrowsLeft > 0 ) {
            setStatus('Select and throw dices again.');
        }else{
            setStatus('Select your points.');
        }
        
        Bonus();
    }, [nbrOfThrowsLeft]);



    // get dices
    const allDices = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        allDices.push(
            <Pressable
                key={allDices + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={diceArr[i]}
                    key={"allDices" + i}
                    size={60}
                    color={setDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        )
    }

    
    // get number icons using the ICONS array
    const icon_list = [];
    for ( let i = 0; i < ICONS.length; i++){
        icon_list.push(
            <Pressable
                key={icon_list + i}
                onPress={() => selectPointsForOneNumber(i)}>
                <MaterialCommunityIcons
                name={ICONS[i].icon}
                key={"icon_list" + i}
                size={55}
                color={setNumbersColor(i)}>

                </MaterialCommunityIcons>
            </Pressable>
        )

    }


    function setNumbersColor(i) {
        return selectedDicePoints[i] ? "black" : "steelblue";
    }


    function setDiceColor(i) {
        return selectedDices[i] ? "black" : "steelblue";
    }


   
    function selectDice(i) {
        
        if (nbrOfThrowsLeft === 3) {
            setStatus('You have to throw dices first.');
            return;
        }

        let dices = [...selectedDices];

        dices[i] = selectedDices[i] ? false : true;
        // option to select all the dices holding the same value when clicking on one 
        // comment out the line above
        /*  for (let y = 0; y < NBR_OF_DICES; y++) {
            if (diceValues[i] === diceValues[y]) {
                dices[y] = selectedDices[i] ? false : true;
            }
        }  */


        setSelectedDices(dices);
    }

    function selectPointsForOneNumber(i) {

        //check if thge player is already allowed to select the points for one number 
        // as well as checking if you have already selected points for the indexed position
       if (nbrOfThrowsLeft > 0) {
        setStatus('Throw 3 times before setting points.')
        return;
        }
        else if (selectedDicePoints[i]===true) {
            setStatus('You already selected points for ' + ICONS[i].value);
            return;
        }

        // local array filled with the numberPoints that already have been filled by the user
        // the local array is necessary in order to use the set fucntion for the global variable choosenNumberPoints as well as passing an array to continuesly perform further calculation
       let array = [...choosenNumberPoints];
       let sum = 0;
       
        // local array in order to fill the selectedDicePoints array with the added numbers
       let selected = [...selectedDicePoints];
       selected[i] = selectedDicePoints[i] ? false : true;
       setSelectedDicePoints(selected);
       
       
        for (let y = 0; y < NBR_OF_DICES; y++) {
            if (diceValues[y] === ICONS[i].value) {
                   sum = sum + diceValues[y];
            }
        }

           array[i] = sum;
           setChoosenNumberPoints(array);
           calculateTotal(array);
      

       setStatus('Throw dices.');
       setSelectedDices(new Array(NBR_OF_DICES).fill(false));

       if(selectedDicePoints.every(x => x === true)){
        setNbrOfThrowsLeft(0);
       }else{setNbrOfThrowsLeft(NBR_OF_THROWS);}
       

   }



    function throwDices() {

        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points before next throw.');
            return;
        }
        
        //local arrays to fill with the value of the thrown dices
        let dices = [...diceValues];

        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                diceArr[i] = 'dice-' + randomNumber;
                dices[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        setDiceValues(dices);
    }


    function startOver() {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw dices');
        setBonusStatus('');
        setTotalPoints(0);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceValues([]);
        setSelectedDicePoints(new Array(6).fill(false));
        setChoosenNumberPoints(new Array(6).fill(0));
        diceArr = [];
    }


   function calculateTotal(array_given) {
    let sum = array_given.reduce((a, b) => a + b, 0);
    setTotalPoints(sum);
    }


    function Bonus() {
        if (!selectedDicePoints.every(x => x === true) && totalPoints < 63) {
            setBonusStatus('You are ' + (Points_missing_For_Bonus - totalPoints) + ' points away from bonus');
        }
        if (!selectedDicePoints.every(x => x === true) && totalPoints >= 63) {
            setBonusStatus('You got the bonus!');
        }
        if (selectedDicePoints.every(x => x === true) && totalPoints < 63) {
            setBonusStatus('You are ' + (63 - totalPoints) + ' points away from bonus');
            setStatus('Game over. All points selected.');
        }
        if (selectedDicePoints.every(x => x === true) && totalPoints >= 63) {
            setBonusStatus('You got the bonus!');
            setStatus('Game over. All points selected.');
        }
    }


    return (
        <View style={styles.gameboard}>
            <ScrollView>
                <View style={styles.flex}><Text>{allDices}</Text></View>
                    <Text style={styles.gameinfo}>Throws left: {selectedDicePoints.every(x => x === true) ? 0 : nbrOfThrowsLeft}</Text>
                    <Text style={styles.gameinfo}>{status}</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}
                        onPress= {() => {if(selectedDicePoints.every(x => x === true)){
                                            startOver()
                                        }else{
                                            throwDices()
                                        }}}>
                        <Text style={styles.buttonText}>
                            {selectedDicePoints.every(x => x === true) ? 'Start Over' : 'Throw dices'}
                        </Text>
                    </Pressable>
                </View>
                    <Text style={styles.total}>Total: {totalPoints}</Text>
                    <Text style={styles.gameinfo}>{bonusStatus}</Text>
                
                <View style={styles.flex}>
                {
                    choosenNumberPoints.map((choosenNumberPoints) => (
                    <Text style={styles.pointsNumbers} >{choosenNumberPoints}</Text>
                ))      
                }
                </View>
                <View style={styles.flex}>
                    <Text >{icon_list}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
