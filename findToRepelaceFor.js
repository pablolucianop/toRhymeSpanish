var where = ['p', 'e', 'r', 'r','o']

var what = ['a', 'e', 'i','o', 'u']

function find(where, whatToFind, whatToDo){
	let found = {
		where : where,
    	whatToFind : what,
    	find :[]
	}
	found.where = where
    found.whatToFind = what
    found.find
    for (let indexWhere = 0; indexWhere < where.length; indexWhere++) {
       for (let indexWhat = 0; indexWhat < whatToFind.length; indexWhat++) {
           if (where[indexWhere] === whatToFind[indexWhat] ) {
           	// whatToDo(where[index], what[e])
           	//what have been found, index in where, index of what have been found
           	found.find.push([what[indexWhat],indexWhere, indexWhat])
           }
       }
    }
    return found
}
console.log(find(where, what))