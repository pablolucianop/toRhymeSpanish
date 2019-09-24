//SPANISH WORD ANALYZER
//select the word to analize or 'aW'
var AlphabetEs= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
var vowels = ['a','e','i','o','u','á','é','í','ó','ú']
var vowelsTilde = ['á','é','í','ó','ú']
var openVowels =['a','e','o','á','é','í','ó','ú']
var closedVowels= ['i','u']
var consonants = ['b','c','d','f','g','h','j','k','l','m','n','ñ','p','q','r','s','t','v','w','x','y','z']
var possibleDobleLetters = ['r', 'l']



function toLowerCaseF(analizedWord){
var analizedWordLower= analizedWord.toLowerCase()
return analizedWordLower
}

function normalizeWordAndSplit(analizedWord){
var normalizedWord= analizedWord.toLowerCase().split('')
return normalizedWord
}

//splits the word letter by letter 
function aWsplittedF (analizedWord){
	 var analizedWordSplit = analizedWord.split('')
	 return analizedWordSplit
}

//it distinguish between consonants , open vowels and closed vowals, making ['c', 'oV', 'cV'...]
function VowelOrConsonant(aWSplitted){
	var wordConsonantVowel=[]
	var analizedWordLength = aWSplitted.length
	//for every letter of aW
	for (var i = 0; i < analizedWordLength; i++){
		var isVowel = null
		//for every vowel
		for (var e = 0; e < vowels.length; e++) {
			if (aWSplitted[i] === vowels[e]) {

				//for every closed vowel
				for (var u = 0; u < closedVowels.length; u++) {
					if (closedVowels[u] === aWSplitted[i]) {
						//console.log(aWSplitted[i] + ' Closed vowel')
						isVowel = true
						wordConsonantVowel.push('vC');
				//for every Open vowel
					} else if (isVowel != true){
						//console.log(aWSplitted[i] + 'Open vowel')
						isVowel = true
						wordConsonantVowel.push('vO');
					}
				}

			} else {
				// //console.log(aWSplitted[i] + ' esConsonante')
				if (vowels[e] === vowels[vowels.length -1] && !isVowel) {
					//console.log(aWSplitted[i] + ' consonant')
					wordConsonantVowel.push('c');
				}
				}
			}
		}
	return wordConsonantVowel
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
				//console.log('hay diptongo,  ', aWSplitted[i-1],aWSplitted[i+1] )
				diptongosIndex.push(i-1)
				//finds if there is a vowel after the closed vowel
				} else if (aWSplitted[i+1]=== vowels[e]){
					//console.log('hay diptongo vocal abierta despues,  ', aWSplitted[i-1],aWSplitted[i+1] )
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
			// //console.log('aWSplitted[i]', aWSplitted[i])
			// //console.log('possibleDobleLetters[e]',aWSplitted[e] )
			if (aWSplitted[i] === possibleDobleLetters[e]) {
				//console.log('rrr o llll',aWSplitted[i] )
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
		analizedWord:toLowerCaseF(analizedWord),
		aWSplitted: aWsplittedF (analizedWord),
		aWvowelOrConsonant:VowelOrConsonant(aWsplittedF (analizedWord)),
		aWindexOfVowels: indexOfVowels(VowelOrConsonant(aWsplittedF (analizedWord))),
		indexOfDiptongos:findDiptongos(aWsplittedF (analizedWord)),
		indexOfHiatos:findHiatos(aWsplittedF (analizedWord)),
		indexOfdobleLetters:findDobleLetters(aWsplittedF (analizedWord)),
		aWsplitted:[analizedWord],
		aWTotalySplitted:false
	}
	return analizedWordObj
}
console.log('////////////////////////')
// console.log( aWanalysis('perroroi'))
//take care of triptongos




function cutInSyllable(analizedWord){

	var firstVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[0]
	var firstHiatoIndex = aWanalysis(analizedWord).indexOfHiatos[0]
	var firstDiptongoIndex = aWanalysis(analizedWord).indexOfDiptongos[0]
	var secondVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[1]
	var thirdVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[2]
	var wordBeingCut = null
	var firstSyllable = null
	console.log(firstHiatoIndex)

	if (firstVowelIndex === firstHiatoIndex ){
		firstSyllable = analizedWord.substring(0,firstHiatoIndex+1);
		wordBeingCut= analizedWord.substring(firstHiatoIndex+1);
	} else if (firstVowelIndex === firstDiptongoIndex) {
		console.log('hay diptongo')
		firstSyllable = analizedWord.substring(0,thirdVowelIndex-1);
		wordBeingCut= analizedWord.substring(thirdVowelIndex-1);
	} else{
		firstSyllable = analizedWord.substring(0,secondVowelIndex-1);
		wordBeingCut= analizedWord.substring(secondVowelIndex-1);
	}
	var wordProcess  =[firstSyllable, wordBeingCut]
	return wordProcess
}

console.log(cutInSyllable('cardo'))



