//SPANISH WORD ANALYZER
//select the word to analize or 'aW'
var analizedWord = "pero"

var AlphabetEs= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
var vowels = ['a','e','i','o','u','á','é','í','ó','ú']
var vowelsTilde = ['á','é','í','ó','ú']
var consonants = ['b','c','d','f','g','h','j','k','l','m','n','ñ','p','q','r','s','t','v','w','x','y','z']

var analizedWordObj = {}

//splits the word letter by letter an put it in lowercase
function toLowecaseAndSplitted (analizedWord){
	 analizedWordLower = analizedWord.toLowerCase()
	 analizedWordLowerSplit = analizedWordLower.split('')
	 return analizedWordLowerSplit
}

var aWSplitted = toLowecaseAndSplitted (analizedWord)
console.log(11,  aWSplitted)



var analizedWordLength = analizedWord.length

console.log(analizedWordLowerSplit)


//put rr y ll toghtther





//it distinguish between consonants and vowels, making ['c', 'v'...]
function VowelOrConsonant(aWSplitted){
	var wordConsonantVowel=[]
	var analizedWordLength = analizedWord.length

	for (var i = 0; i < analizedWordLength; i++){
		var isVowel = null
		for (var e = 0; e < vowels.length; e++) {
			if (aWSplitted[i] === vowels[e]) {
				console.log(aWSplitted[i] + ' vowel')
				isVowel = true
				wordConsonantVowel.push('v');
			} else {
				// console.log(aWSplitted[i] + ' esConsonante')
				if (vowels[e] === vowels[vowels.length -1] && !isVowel) {
					console.log(aWSplitted[i] + ' consonant')
					wordConsonantVowel.push('c');
				}
				}
			}
		}
	return wordConsonantVowel
}

var aWvowelOrConsonant = VowelOrConsonant(aWSplitted)

console.log(aWvowelOrConsonant, 'aWvowelOrConsonant')







//

function indexOfVowels(aWvowelOrConsonant){
	var ubicationVowels = []
	for (var i = 0; i < analizedWordLength; i++) {
		var repetition = 0
		if (aWvowelOrConsonant[i] === 'v') {
			ubicationVowels.push(i);
			// if(analizedWordLower[ubicationVowels[1]] === analizedWordLower[ubicationVowels[1]+1]) {
			// 	console.log('hay rrrrrrrrrrrrrrrrrrrrrepe', analizedWordLower[ubicationVowels[1]], analizedWordLower[ubicationVowels[1]+1])
			// 	 repetition = 1
			// }
		}
	}
	return ubicationVowels
}

var aWindexOfVowels = indexOfVowels(aWvowelOrConsonant)

console.log(aWindexOfVowels)

//take care of diptongos

//how to split a word in syllables? for the first syllable, find the second vowel, go back a letter and there split the first syllable
var splittedWord = analizedWord.substring(0,aWindexOfVowels[1]-1 );
console.log('splittedWord ', splittedWord)
var splittedWord2 = analizedWord.substring(aWindexOfVowels[1]-1,analizedWord.length );
console.log('splittedWord2 ', splittedWord2)




