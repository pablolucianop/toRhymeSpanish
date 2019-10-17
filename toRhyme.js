//SPANISH WORD ANALYZER
//select the word to analize or 'aW'
var AlphabetEs= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
var vowels = ['a','e','i','o','u','á','é','í','ó','ú']
var vowelsTilde = ['á','é','í','ó','ú']
var openVowels =['a','e','o','á','é','í','ó','ú']
var closedVowels= [ 'u', 'i' ]
var consonants = ['b','c','d','f','g','h','j','k','l','m','n','ñ','p','q','r','s','t','v','w','x','y','z']
var possibleDobleLetters = ['r', 'l', 't']
var analizedWord = 'gato'






// takes a string and returns it splitted letter by letter 
function aWsplittedF (analizedWord){
	 var analizedWordSplit = analizedWord.split('')
	 return analizedWordSplit
}

// takes a string and returns an array that distinguish between consonants , open vowels and closed vowals, making ['c', 'oV', 'cV'...]
function VowelOrConsonant(analizedWord){
	var wordProcesed = []
	//tests every letter of the word
	for (var i = 0; i < analizedWord.length; i++) {
		var letterRecognized = false
		var isVowel = false
		//againts every vowel
		for (var e = 0; e < vowels.length; e++) {
			//is a vowel?
			if (vowels[e] === analizedWord[i] ) {
				isVowel = true
			} 
		}

		//if it istn a vowel, its a consonant
		if (isVowel === false) {
			// console.log('consonante')
			wordProcesed.push('c')
		}

		//if its a vowel, its closed?
		if (isVowel) {
			for (var d = 0; d < closedVowels.length; d++) {
				if(closedVowels[d]===analizedWord[i] && letterRecognized ===false){
					wordProcesed.push('vC')
					letterRecognized = true
				} 
			}  
			if (letterRecognized === false){
					wordProcesed.push('vO')
					letterRecognized = true
			}
		}
	}
	return wordProcesed
}



//finds vowels and returns an index of them
function indexOfVowels(aWvowelOrConsonant){
	var ubicationVowels = []
	for (var i = 0; i < aWvowelOrConsonant.length; i++) {
		var repetition = 0
		if (aWvowelOrConsonant[i] === 'vO' || aWvowelOrConsonant[i] === 'vC' ) {
			ubicationVowels.push(i);
		}
	}
	return ubicationVowels
}


//finds diptongos and returns an index of them
function findDiptongos(aWSplitted){
	var diptongosIndex = []
	for (var i = 0; i < aWSplitted.length; i++) {
		//finds if there is a closed vowel
		if (aWSplitted[i] === 'i' || aWSplitted[i] === 'u' ) {
			for (var e = 0; e < vowels.length; e++) {
				//finds if there is a vowel before the closed vowel
				if (aWSplitted[i-1]=== vowels[e] ) {
				diptongosIndex.push(i-1)
				//finds if there is a vowel after the closed vowel
				} else if (aWSplitted[i+1]=== vowels[e]){
					////console.log('hay diptongo vocal abierta despues,  ', aWSplitted[i-1],aWSplitted[i+1] )
					diptongosIndex.push(i)
				}
			}
		}
	}

	//eliminates duplicates caused by two closed vowels diptongos
	uniqueArray = diptongosIndex.filter(function(item, pos) {
	    return diptongosIndex.indexOf(item) == pos;
	})

	return uniqueArray
}



//finds hiatos and returns an index of them
function findHiatos(aWSplitted){
	var hiatosIndex = []
	for (var i = 0; i < aWSplitted.length; i++) {
		//finds if there is an open vowel
		for (var e = 0; e < openVowels.length; e++) {
			if (aWSplitted[i] === openVowels[e]) {
				for (var o = 0; o < openVowels.length; o++) {
					if (aWSplitted[i+1] === openVowels[o]) {
						hiatosIndex.push(i)
					}
				}
			}
		}

	}

	//eliminates duplicates caused by two closed vowels diptongos
	uniqueArray = hiatosIndex.filter(function(item, pos) {
	    return hiatosIndex.indexOf(item) == pos;
	})

	return uniqueArray
}


//finds rr or ll and returns an index of them
function findDobleLetters(aWSplitted){
	var dobleLettersIndex = []
	for (var i = 0; i < aWSplitted.length; i++) {
		//finds if there a possible doble letter

		for (var e = 0; e < possibleDobleLetters.length; e++) {
			// ////console.log('aWSplitted[i]', aWSplitted[i])
			// ////console.log('possibleDobleLetters[e]',aWSplitted[e] )
			if (aWSplitted[i] === possibleDobleLetters[e]) {
				////console.log('rrr o llll',aWSplitted[i] )
				if (aWSplitted[i] === aWSplitted[i+1]) {
					dobleLettersIndex.push(i)
				}
				
			}
		}

	}



	//eliminates duplicates caused by two closed vowels diptongos
	uniqueArray = dobleLettersIndex.filter(function(item, pos) {
	    return dobleLettersIndex.indexOf(item) == pos;
	})

	return uniqueArray
}



//returns a full word analysis
function aWanalysis(analizedWord){
	var analizedWordObj = {
		aWoriginal:analizedWord,
		analizedWord:analizedWord.toLowerCase(),
		aWSplitted: aWsplittedF (analizedWord.toLowerCase()),
		aWvowelOrConsonant:VowelOrConsonant(analizedWord.toLowerCase()),
		aWindexOfVowels: indexOfVowels(VowelOrConsonant(analizedWord.toLowerCase())),
		indexOfDiptongos:findDiptongos(aWsplittedF (analizedWord.toLowerCase())),
		indexOfHiatos:findHiatos(aWsplittedF (analizedWord.toLowerCase())),
		indexOfdobleLetters:findDobleLetters(aWsplittedF (analizedWord.toLowerCase())),
		aWsplitted:[analizedWord],
		aWTotalySplitted:false
	}
	return analizedWordObj
}


//take care of triptongos



//recives a string and returns an array, with the ['first Sylable', 'the rest of the string, left to beeing cut']
function cutASyllable(analizedWord){
	// var wordProcess  =[]
	// var analizedWord = analizedWordArr[analizedWordArr.length-1]
	var firstVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[0]
	var firstHiatoIndex = aWanalysis(analizedWord).indexOfHiatos[0]
	var firstDiptongoIndex = aWanalysis(analizedWord).indexOfDiptongos[0]
	var secondVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[1]
	var thirdVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[2]
	var firstRepeatedLetterIndex = aWanalysis(analizedWord).indexOfdobleLetters[0]
	var consonantsBetweenVowels =aWanalysis(analizedWord).aWindexOfVowels[1] -aWanalysis(analizedWord).aWindexOfVowels[0]
	var wordBeingCut = null
	var firstSyllable = null
	
	console.log(consonantsBetweenVowels, 'consonantsBetweenVowels')
	function cutFirstSyllableHere(whereToCut){
			firstSyllable = analizedWord.substring(0,whereToCut);
			wordBeingCut= analizedWord.substring(whereToCut);
	}

	// if its there an hiato, cut the syllable between bowels
	if (firstVowelIndex === firstHiatoIndex ){
		cutFirstSyllableHere(firstHiatoIndex+1)

	//else if its there a diptongo, cut the syllable one before the third vowel	
	//lacks repeated letter case!!
	} else if (firstVowelIndex === firstDiptongoIndex) {
		cutFirstSyllableHere(thirdVowelIndex-1)

	//else if, there is a repeated letter, cut the syllable two letter before the second vowel 
	} else if(secondVowelIndex-2 === firstRepeatedLetterIndex){
		cutFirstSyllableHere(secondVowelIndex-2)

	//if there aren't any diptongo or hiato, cut the first syllable one letter before the second vowel. 
	}else{
		cutFirstSyllableHere(secondVowelIndex-1)
	}

	
	// wordProcess.push(firstSyllable)
	// wordProcess.push(wordBeingCut)

	if(firstSyllable === ''){
		var wordProcess = [wordBeingCut]
	}else if (firstSyllable === ''){
		var wordProcess = [wordBeingCut]
	} else {
		var wordProcess = [firstSyllable ,wordBeingCut ]
	}

	return wordProcess
}


var wordKing =  'esdrujulo'


//recives a string and returs an array of its sylables
function cutAWordInSylables(analizedWord){
	var IsThereLeftToCut = true
	var splittedWord = []
	var leftToCut 

	 var cutted = cutASyllable(analizedWord)

	if(cutted.length === 1){IsThereLeftToCut = false }

	splittedWord.push(cutted[0])
	leftToCut = cutted[1]
	

	function cutAgaing(){
	 	cutted = cutASyllable(leftToCut)
	 	splittedWord.push(cutted[0])
	 	leftToCut = cutted[1]
	 	if(cutted.length === 1){ IsThereLeftToCut = false}
	 	if (IsThereLeftToCut) {cutAgaing()}	
	 }
	 cutAgaing()


 return  splittedWord


}



	aWtemporal = cutAWordInSylables(wordKing) 


 var testedValues = [[['acróbata'], [ 'a' ,'cro','ba','ta']],[['esdrújulo'], [ 'es' ,'dru','ju','lo']], [['gato'], [ 'ga' ,'to']],[['alerta'], [ 'a','ler','ta']],[['atraco'], [ 'a' ,'tra','co']],[['centellear'], [ 'cen', 'te', 'lle', 'ar' ]],[['plenitud'], [ 'ple' ,'ni','tud']],[['Esti'], [ 'Es','ti']],[['terremoto'], [ 'te','rre','mo','to']],[['perro'], [ 'pe' ,'rro']],[['canario'], [ 'ca' ,'na', 'rio']],[['callo'], [ 'ca' ,'llo']],[['perrito'], [ 'pe' ,'rri','to']]]
// var testedValues = [[['Esti'], [ 'es','ti']]]



var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

}


//
function testWordSplitting(analizedWord, wordSpelledCorrect){
	var autoCuttedWord = cutAWordInSylables(analizedWord)
	if(arraysMatch(autoCuttedWord,wordSpelledCorrect)){
		console.log('todo bien')
		return true
	}else{
		console.log('todo mal')
		return [analizedWord, autoCuttedWord,wordSpelledCorrect ]
	}
}

function test(testedValues){
	var errorsArray = []
	for (var i = 0; i < testedValues.length; i++) {
		var wordTestResult = testWordSplitting(testedValues[i][0][0],testedValues[i][1])
		if(wordTestResult != true){
			errorsArray.push(wordTestResult)
		}
	}


	return errorsArray
}

var perro = 'abstra'
console.log(aWanalysis(perro))
console.log(cutAWordInSylables(perro))
// console.log(test(testedValues))
// console.log(testWordSplitting(testedValues[0][0],testedValues[1]))


