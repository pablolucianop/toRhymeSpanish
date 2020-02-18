//SPANISH WORD ANALYZER
//select the word to analize or 'aW'
var AlphabetEs= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
var vowels = ['a','e','i','o','u','á','é','í','ó','ú']
var vowelsTilde = ['á','é','í','ó','ú']
var openVowels =['a','e','o','á','é','í','ó','ú']
var closedVowels= [ 'u', 'i','ü' ]
var consonants = ['b','c','d','f','g','h','j','k','l','m','n','ñ','p','q','r','s','t','v','w','x','y','z']
var dobleLetters = ['rr', 'll', 'tt']
var analizedWord = 'gato'
var unsplittables = ['br', 'cr', 'dr', 'gr', 'fr', 'kr', 'tr', 'bl', 'cl', 'gl', 'fl', 'kl', 'pl', 'gü', 'ch', 'desen']

var hiatos= openVowels.map((currElement, index) => {
//return every two character combination of open vowels, so every posible hiato
	return openVowels.map((currElement1, index) => {  return currElement1 +currElement})
	})
//add to the list of hiatos, hiatos with "h" in the middle
var hiatoWithH = hiatos.flat(Infinity).map((currElement1, index) => {  return currElement1[0]+"h"+currElement1[1]})
var allPosibleHiatos = hiatos.flat(Infinity).concat(hiatoWithH)



//finds string in another string and return index
var findAndIndex = (whatToFind,whereToFindIt)=>{   
    var primalIndex =[]
    var reg = new RegExp(whatToFind,"gi");
    while ((match = reg.exec(whereToFindIt)) != null) {
        primalIndex.push(['cons' , match.index, match]);
    }
    var depuredIndex = []
    for (var i = 0; i < primalIndex.length; i++) {
        depuredIndex.push(primalIndex[i][1])
    }
    return depuredIndex
}



//find these strings in a string and return an index
var findAndIndexMultipleStrings=(arrayStringsToFind,whereToFindIt)=>{
    var arrayOfIndexs = []
    for (var i = 0; i < arrayStringsToFind.length; i++){
         arrayOfIndexs.push(findAndIndex(arrayStringsToFind[i], whereToFindIt))
    }
    //the array flattened and sorted
    return [].concat.apply([], arrayOfIndexs).sort(function(a, b){return a - b});
    
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
var indexHiatosF = (analizedWord)=>{
    var indexOpenVowels = findAndIndexMultipleStrings(openVowels,analizedWord)
    var indexH = findAndIndexMultipleStrings(['h'],analizedWord)
    var indexHiatos = []
    for (var i = 0; i < indexOpenVowels.length-1; i++) {
        //and hiato is form when two open vowels are together
        if (indexOpenVowels[i]+1=== indexOpenVowels[i+1]) {
            indexHiatos.push(indexOpenVowels[i])  
        }
        //if there is an 'h' between two open vowels, its still and hiato, becouse the 'h' is silent!
        if (indexOpenVowels[i]+2=== indexOpenVowels[i+1] && analizedWord[indexOpenVowels[i]+1] ) {
            indexHiatos.push(indexOpenVowels[i])  
        }
    }
    return indexHiatos
}






//returns a full word analysis
function aWanalysis(analizedWord){
	var analizedWordObj = {
		aWoriginal:analizedWord,
		analizedWord:analizedWord.toLowerCase(),
		aWSplitted: analizedWord.toLowerCase().split(''),
		aWindexOfVowels: findAndIndexMultipleStrings(vowels,analizedWord),
		indexOfDiptongos:findDiptongos(analizedWord.toLowerCase().split('')),
		indexOfHiatos:findAndIndexMultipleStrings(allPosibleHiatos,analizedWord),
		indexOfdobleLetters:findAndIndexMultipleStrings(dobleLetters,analizedWord),
		indexOfunsplittables:findAndIndexMultipleStrings(unsplittables,analizedWord),
		aWTotalySplitted:false,
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
	var firstUnsplittableIndex = aWanalysis(analizedWord).indexOfunsplittables[0]
	var secondVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[1]
	var thirdVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[2]
	var firstRepeatedLetterIndex = aWanalysis(analizedWord).indexOfdobleLetters[0]
	var consonantsBetweenVowels =aWanalysis(analizedWord).aWindexOfVowels[1] -aWanalysis(analizedWord).aWindexOfVowels[0]
	var wordBeingCut = null
	var firstSyllable = null

	
	// console.log(consonantsBetweenVowels, 'consonantsBetweenVowels')
	function cutFirstSyllableHere(whereToCut){
			firstSyllable = analizedWord.substring(0,whereToCut);
			wordBeingCut= analizedWord.substring(whereToCut);

	}
	
	if (analizedWord.length < 2 ){
		cutFirstSyllableHere(analizedWord.length)
	// if its there an hiato, cut the syllable between vowels
	} else if (firstVowelIndex === firstHiatoIndex ){
		cutFirstSyllableHere(firstHiatoIndex+1)
	//else if its there a diptongo, cut the syllable one before the third vowel	
	} else if (firstVowelIndex === firstDiptongoIndex) {
		cutFirstSyllableHere(thirdVowelIndex-1)
	//else if, there is a repeated letter, cut the syllable two letter before the second vowel 
	} else if(secondVowelIndex-2 === firstRepeatedLetterIndex){
		cutFirstSyllableHere(secondVowelIndex-2)
		//else if, there are four consonants between the first vowel and the second, split it after the second consonant
	} else if(secondVowelIndex-5 === firstVowelIndex){
		cutFirstSyllableHere(secondVowelIndex-2)
		//else if, there are three consonants between the first vowel and the second, 
	} else if(secondVowelIndex-4 === firstVowelIndex){

		if(firstUnsplittableIndex === firstVowelIndex+1 ){

		cutFirstSyllableHere(firstVowelIndex+3)}
		else if(firstUnsplittableIndex === firstVowelIndex+2 ){
		cutFirstSyllableHere(firstVowelIndex+2)
		}else{
			cutFirstSyllableHere(firstVowelIndex+3)
		}

		//else if, there are two consonants between the first vowel and the second, 
	} else if(secondVowelIndex-3 === firstVowelIndex){
		if(firstUnsplittableIndex === firstVowelIndex+1 ){
		cutFirstSyllableHere(firstVowelIndex+1)
		}else{
			cutFirstSyllableHere(firstVowelIndex+2)
		}
		
				
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
	var leftToCut = analizedWord
	// var cutted = cutASyllable(analizedWord)
	// if(cutted.length === 1){IsThereLeftToCut = false }

	// splittedWord.push(cutted[0])
	// leftToCut = cutted[1]
			

	function cutAgaing(){
	 	var cutted = cutASyllable(leftToCut)
	 	splittedWord.push(cutted[0])
	 	leftToCut = cutted[1]
	 	if(cutted.length <= 1 || analizedWord.length<2){ IsThereLeftToCut = false}
	 	if (IsThereLeftToCut) {cutAgaing()}	
	 }
	 cutAgaing()


 return  splittedWord
}





var testedValues = [[['a'], ['a']], [['águila'], ['á', 'gui', 'la']], [['abril'], ['a', 'bril']], [['averigüéis'], ['a', 've', 'ri', 'güéis']], [['ren'], ['ren']], [['contra'], ['con', 'tra']], [['instaurar'], ['ins', 'tau', 'rar']], [['acróbata'], ['a', 'cró', 'ba', 'ta']], [['esdrújulo'], ['es', 'drú', 'ju', 'lo']], [['gato'], ['ga', 'to']], [['perro'], ['pe', 'rro']], [['alerta'], ['a', 'ler', 'ta']], [['atraco'], ['a', 'tra', 'co']], [['centellear'], ['cen', 'te', 'lle', 'ar']], [['plenitud'], ['ple', 'ni', 'tud']], [['Esti'], ['Es', 'ti']], [['terremoto'], ['te', 'rre', 'mo', 'to']], [['perro'], ['pe', 'rro']], [['canario'], ['ca', 'na', 'rio']], [['callo'], ['ca', 'llo']], [['abstracto'], ['abs', 'trac', 'to']], [['perrito'], ['pe', 'rri', 'to']], [['inserimos'], ['in', 'se', 'ri', 'mos']], [['amollares'], ['a', 'mo', 'lla', 'res']], [['calme'], ['cal', 'me']], [['desmotare'], ['des', 'mo', 'ta', 're']], [['desriscadas'], ['des', 'ris', 'ca', 'das']], [['desmoldaremos'], ['des', 'mol', 'da', 're', 'mos']], [['batanado'], ['ba', 'ta', 'na', 'do']], [['honrosas'], ['hon', 'ro', 'sas']], [['bipolares'], ['bi', 'po', 'la', 'res']], [['desenroscar'], ['des', 'en', 'ros', 'car']],]
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

function aWanalysis2(analizedWord){
 var a = aWanalysis(analizedWord)
 a.aWSplitted = cutAWordInSylables(analizedWord)
 return a
}

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

//var perro = 'Caminando' 
// console.log(aWanalysis2(perro)) 
// console.log(cutAWordInSylables(perro))
console.log(test(testedValues))
// console.log(testWordSplitting(testedValues[0][0],testedValues[1]))


////