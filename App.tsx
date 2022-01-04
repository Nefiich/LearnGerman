/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';

const App = () => {

  const [isBusy, setIsBusy] = useState<boolean>(true);



  const [wordList, setWordList] = useState<any[]>([]);
  const [mistakeWordList, setMistakeWordList] = useState<any[]>([]);

  const [currIdx, setCurrIdx] = useState<number>(0);

  const [chosenWord, setChosenWord] = useState<string | null>(null);
  const [isWordChosen, setIsWordChosen] = useState<boolean>(false);
  const [nextSentance, setNextSentance] = useState<boolean>(false);
  const [didArraysChange, setDidArraysChange] = useState<boolean>(false);

  const [victory, setVictory] = useState<boolean>(false);
  const [progressCount, setProgressCount] = useState(0);

  const [resultContainerColor, setResultContainerColor] = useState<{backgroundColor: string} | null>(null);
  const [answerContainerDisplay, setAnswerContainerDisplay] = useState<{display: string} | null>(null);
  const [continueButtonColor, setContinueButtonColor] = useState<{color: string} | null>(null);
  const [continueButtonContainerColor, setContinueButtonContainerColor] = useState<{backgroundColor: string} | null>(null);

  useEffect(() => {
    setIsBusy(true);

    const reference = firebase
    .app()
    .database('https://learngerman-e464e-default-rtdb.europe-west1.firebasedatabase.app/')
    .ref('/sentances');


    reference.once('value')
    .then(snapshot => {
      setWordList(snapshot.val());
      setIsBusy(false);
    });
    
  }, [])

  const chooseWord = (word : string) =>{

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

    if(nextSentance === true){
      setProgressCount(((currIdx / wordList.length)*100)+10);
      if(progressCount === 90){
        setProgressCount(0)
      }
      if(currIdx === 0){
        setProgressCount(((1 / wordList.length)*100));
      }

      setNextSentance(false);
      setChosenWord(null);
      setIsWordChosen(false);

      if(didArraysChange){
        setWordList(mistakeWordList)
        setCurrIdx(0);
      }else{
        setCurrIdx(currIdx+1);
      }

      setResultContainerColor({backgroundColor: 'rgba(39, 60, 117, 0.0)' });
      setAnswerContainerDisplay({display: 'none'});
      setContinueButtonColor({color: 'grey'})
      setContinueButtonContainerColor({backgroundColor: 'white'});

      if(wordList[currIdx+1] === undefined && mistakeWordList.length === 0){
        console.log("Congratulations!");
        setProgressCount(100);
        setVictory(true)
      }
      return;
    }



    if(word === wordList[currIdx].correctWord){
      setResultContainerColor({backgroundColor: '#2bcbba' });
      setAnswerContainerDisplay({display: 'flex'});
      setContinueButtonColor({color: '#2bcbba'})
      setContinueButtonContainerColor({backgroundColor: 'white'});

      if(mistakeWordList.length > 0){
        const newMistakeWordList = mistakeWordList.filter(sentance => sentance.correctWord !== word);
        setMistakeWordList(newMistakeWordList);
      }
      setNextSentance(true);
      setDidArraysChange(false);
    }else{
      setResultContainerColor({backgroundColor: '#fc5c65' });
      setAnswerContainerDisplay({display: 'flex'});
      setContinueButtonColor({color: '#fc5c65'})
      setContinueButtonContainerColor({backgroundColor: 'white'});

      setMistakeWordList((mistakeWordList) =>[...mistakeWordList, wordList[currIdx]]) 
      setNextSentance(true);
      setDidArraysChange(false);
    }

    if(wordList[currIdx+1] === undefined){
      if(mistakeWordList.length > 0){
        setDidArraysChange(true);
      }
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./assets/images/bg-image.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.header}>
          <Icon name="chevron-back" size={30} color="#fff" />
          <View style={styles.progressBar}>
            <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: "#2bcbba", width: `${progressCount}%`, borderRadius: 20}]}/>
          </View>
        </View>
        <View style={styles.body}>

          {victory ? <Text>Congratulations! Game over.</Text> :
          <>
            <Text style={styles.instructionText}>Fill in the missing word</Text>
            {isBusy ? <Text>Loading..</Text> : 
              <>
                <Text style={styles.englishSentance}>{wordList[currIdx].englishSentance.split(" ").map((text, index) => {
                  return text === wordList[currIdx].correctWordEnglish ? <Text style={styles.higlightedEnglish} key={index}>{text} </Text> : <Text key={index}>{text} </Text>
                })}</Text>
                <View style={styles.germanSentance}>
                  {wordList[currIdx].germanSentance.split(" ").map((text, index) => {
                    return text === wordList[currIdx].correctWord ? <Text style={isWordChosen ? styles.missingWord : styles.regularWord} key={index} onPress={() => removeWord()}>{isWordChosen ? chosenWord : '____'}</Text> : <Text key={index} style={styles.regularWord}>{text}</Text>
                  })}
                </View>
                <View style={styles.wordContainer}>
                  {wordList[currIdx].otherWords.split(", ").map((word, index) =>{
                    return <Text style={chosenWord === word ? styles.chooseWordHide : styles.chooseWord} onPress={() => chooseWord(word)} key={index}>{word}</Text>
                  })}
                </View>
                <View style={[styles.result, resultContainerColor]}>
                  <View style={[styles.answerContainer, answerContainerDisplay]}>
                    <Text style={styles.answerText}>Answer: <Text style={styles.answerWord}>{wordList[currIdx].correctWord}</Text></Text>
                    <Icon name="flag" size={10} color="#fff" />
                  </View>
                  <TouchableOpacity style={[styles.answerButton, continueButtonContainerColor]} onPress={() => checkWord(chosenWord)}><Text style={[styles.continueButton, continueButtonColor]}>CONTINUE</Text></TouchableOpacity>
                </View>
              </>
            }
          </>
          }
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  image:{
    flex: 1,
    justifyContent: "center"
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 30,
    background: 'transparent'
  },
  progressBar:{
    height: 25,
    flexDirection: "row",
    width: '70%',
    backgroundColor: 'rgba(39, 60, 117, 1)',
    borderColor: 'rgba(39, 60, 117, 1)',
    borderWidth: 7,
    borderRadius: 20
  },
  body:{
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'rgba(39, 60, 117, 0.7)',
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
