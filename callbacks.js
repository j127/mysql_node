/**
 * Prints the input with a message
 */
function print(input) {
    console.log("this is function 1, which received these results:", input);
}

/**
 * Square a number and then run a callback function on it.
 */
function query(searchTerm, callback) {
    console.log("function 2 is querying (simulated)");
    setTimeout(function () {
        const searchResult = { [searchTerm]: ["Alice", "Bob", "Cat Stevens"] };
        callback(searchResult);
    }, 1000);
}

query("cats", print);
