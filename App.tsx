/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {

  const [chosenWord, setChosenWord] = useState<null | string>(null);
  const [isWordChosen, setIsWordChosen] = useState<boolean>(false);

  const [resultContainerColor, setResultContainerColor] = useState<{backgroundColor: string} | null>(null);
  const [answerContainerDisplay, setAnswerContainerDisplay] = useState<{display: string} | null>(null);
  const [continueButtonColor, setContinueButtonColor] = useState<{color: string} | null>(null);
  const [continueButtonContainerColor, setContinueButtonContainerColor] = useState<{backgroundColor: string} | null>(null);

  const chooseWord = (word : string) =>{
    console.log(word);

    setChosenWord(word);
    setIsWordChosen(true);

    setContinueButtonContainerColor({backgroundColor: '#2bcbba'});
    setContinueButtonColor({color: 'white'})
  }

  const removeWord = () =>{
    setChosenWord(null);
    setIsWordChosen(false);

    setContinueButtonContainerColor({backgroundColor: 'white'});
    setContinueButtonColor({color: 'grey'})
  }

  const checkWord = (word : string | null) =>{
    console.log(word);


    if(word === 'Hause'){
      console.log("Correct!")
      setResultContainerColor({backgroundColor: '#2bcbba' });
      setAnswerContainerDisplay({display: 'flex'});
      setContinueButtonColor({color: '#2bcbba'})
      setContinueButtonContainerColor({backgroundColor: 'white'});
    }else{
      console.log("False !");
      setResultContainerColor({backgroundColor: '#fc5c65' });
      setAnswerContainerDisplay({display: 'flex'});
      setContinueButtonColor({color: '#fc5c65'})
      setContinueButtonContainerColor({backgroundColor: 'white'});
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="chevron-back" size={30} color="#900" />
        <Progress.Bar progress={0.3} width={250} height={10}/>
      </View>
      <View style={styles.body}>
        <Text style={styles.instructionText}>Fill in the missing word</Text>
        <Text style={styles.englishSentance}>The <Text style={styles.higlightedEnglish}>house</Text> is small</Text>
        <View style={styles.germanSentance}>
          <Text style={styles.regularWord}>Das</Text>
          <Text style={isWordChosen ? styles.missingWord : styles.regularWord} onPress={() => removeWord()}>{isWordChosen ? chosenWord : '____'}</Text>
          <Text style={styles.regularWord}>ist</Text>
          <Text style={styles.regularWord}>klein.</Text>
        </View>
        <View style={styles.wordContainer}>
          <Text style={chosenWord === 'folgen' ? styles.chooseWordHide : styles.chooseWord} onPress={() => chooseWord('folgen')}>folgen</Text>
          <Text style={chosenWord === 'Schaf' ? styles.chooseWordHide : styles.chooseWord} onPress={() => chooseWord('Schaf')}>Schaf</Text>
          <Text style={chosenWord === 'Bereiden' ? styles.chooseWordHide : styles.chooseWord} onPress={() => chooseWord('Bereiden')}>Bereiden</Text>
          <Text style={chosenWord === 'Hause' ? styles.chooseWordHide : styles.chooseWord} onPress={() => chooseWord('Hause')}>Hause</Text>
        </View>
        <View style={[styles.result, resultContainerColor]}>
          <View style={[styles.answerContainer, answerContainerDisplay]}>
            <Text style={styles.answerText}>Answer: <Text style={styles.answerWord}>House</Text></Text>
            <Icon name="flag" size={10} color="#fff" />
          </View>
          <TouchableOpacity style={[styles.answerButton, continueButtonContainerColor]} onPress={() => checkWord(chosenWord)}><Text style={[styles.continueButton, continueButtonColor]}>CONTINUE</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  body:{
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#273c75',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  instructionText:{
    fontSize: 13,
    color: 'white',
    opacity: 0.7
  },
  englishSentance:{
    fontSize: 20,
    color: 'white',
  },
  higlightedEnglish:{
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  germanSentance:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  regularWord:{
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
  },
  missingWord:{
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    color: 'grey',
    backgroundColor: 'white',

    paddingHorizontal: 10,
    paddingVertical: 20,

    borderRadius: 20,

    textAlign: 'center',
    fontWeight: 'bold',

  },
  wordContainer:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  chooseWord:{
    flexBasis: '40%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chooseWordHide:{
    flexBasis: '40%',
    backgroundColor: 'grey',
    color:'grey',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  result:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'none',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  answerContainer:{
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '70%',
  },
  answerText:{
    fontWeight: 'bold',
    color: '#f5f6fa'
  },
  answerWord:{
    fontWeight: '500',
    color: '#f5f6fa'
  },
  answerButton:{
    width: '70%',

    backgroundColor: 'white',

    borderRadius: 20,

    paddingVertical: 10,
    marginVertical: 20,

    alignSelf: 'center',
  },
  continueButton:{
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  }
});

export default App;
