
// this needs data.js and script.js
const langs = { neo: 'NEO.', en: 'ANG.', fr: 'FRA.', es: 'CAS.', it: 'ITA.', pt: 'POR.', ro: 'RUM.', ca: 'CAT.', slav: 'INTERSL.' };
var dict = prepareDictionary(rawDataCSV);
var index = {};
for (const langCode in langs) {
    var langName = langs[langCode];
    index[langCode] = prepareIndex(dict, langName);
}

function entryCardHTML(headword, gramclass, translationMap) {
    var header = `
        <div class="entry">
            <span class="headword">${headword}</span>
            <span class="grammatical-class">${gramclass}</span>
    `;
    var footer = '</div>';
    var translationHTML = '';
    for (const langCode in translationMap) {
        if (translationMap[langCode] != null && translationMap[langCode] != '') {
            translationHTML += '<br />';
            translationHTML += `<span class="translation">${langCode}. ${translationMap[langCode]}</span>`;
        }
    }
    return header + translationHTML + footer;
}

function nothingFoundHTML() {
    return `
    <div class="info">
        ¯\_(ツ)_/¯
    </div>
    `;
}


function searchHandler() {
    // Stage 1 - get the word from inputs
    var input = $('#search-input').val();

    // Stage 2 - look up numbers of entries in the index (TODO: language selection)
    var indexArray = [];
    for (const langCode in langs) {
        indexArray = indexArray.concat(advancedIndexLookup(input, index[langCode], langs[langCode]));
    }
    indexArray = removeArrayDuplicates(indexArray);
    if (indexArray.length == 0) {
        $('#contents').html(nothingFoundHTML());
        return;
    }

    // Stage 3 - get the translations for each number
    var resultsHTML = [];
    for (const i of indexArray) {
        var entry = dict[i];
        if (entry['cat. gram.'] == 'léttera')
            continue;
        var translations = {};
        for (const langCode in langs) {
            if (langCode == 'neo')
                continue;
            var langName = langs[langCode];
            translations[langCode] = entry[langName];
        }
        var entryHTML = entryCardHTML(entry['NEO.'], entry['cat. gram.'], translations);
        resultsHTML.push(entryHTML);
    }

    // Stage 4 - output into contents
    $('#contents').html('');
    for (const resultHTML of resultsHTML) {
        $('#contents').append(resultHTML);
    }
    return;
}
