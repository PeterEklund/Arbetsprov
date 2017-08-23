const sass = require('./scss/app.scss');

var autoComplete = require('./js/autocomplete.js');
var resultList = document.querySelector('.search-result-list');
var resultArr = [];
var apiURl = 'http://services.groupkt.com/country/search';

var restData;

// Attach updated results
var updateList = function() {
    resultList.innerHTML = resultMarkup(resultArr);
}

// fetch from api
var getData = function(name) {
    url = apiURl + '?text=' + name;
    return fetch(url, {method: 'get'})


        .then(function() {
            response.json();
        })

        //.then(response => response.json())
        
        
        .then(function(response) {

            var data = response.RestResponse.result;

            if (data.length > 5) {
                data.splice(5, data.length);
            }

            restData = data;
        })
    
        .catch(function(error) {
            // Something went wrong
        });
}

// Create markup for list items, ..
var resultMarkup = function(list) {
    var itemList = "";
    for (var i = 0; i < list.length; i++) {
        
        var item = '<li tabindex="0"><span class="title">'
        + list[i]
        + '</span><span class="date"></span><button onClick="removeFromList('
        + i
        + ')" class="remove"><span class="help-text">Remove</span></button></li>';

        itemList = itemList + item;
    }

    return '<ul>' + itemList + '</ul>';
}

var removeFromList = function(id) {
    resultArr.splice(id, 1);

    // Should be extracted..
    updateList();

}

window.removeFromList = removeFromList;

new autoComplete({
    selector: '#search',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        
        // use fetch api
        // var api = getData(term);

        // api.then(function(data) {
        //     response(data)
        // });

        var choices = ['ActionScript', 'ActionScript2', 'ActionScript3', 'AppleScript', 'Asp', 'Assembly', 'BASIC', 'Batch', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Scala', 'Scheme', 'SQL', 'TeX', 'XML'];
        
        var matches = [];
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    },
    onSelect(event, term, item){
        resultArr.push(term);

        updateList();
    }
});