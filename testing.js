function normalizeWordAndSplit(analizedWord){
var normalizedWord= analizedWord.toLowerCase().split('')
return normalizedWord
}

console.log(normalizeWordAndSplit('perro'))