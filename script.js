
function prepareDictionary(strRawCSV) {
    return $.csv.toObjects(strRawCSV);
}

function prepareIndex(arrayOfEntries, strLanguageCode) {
    var index = {};
    for (const i in arrayOfEntries) {
        var entry = arrayOfEntries[i];
        if (entry['cat. gram.'] == '')
            continue;
        var langTerm = entry[strLanguageCode].toString();
        if (langTerm == null || langTerm == 'constructor')
            continue;
        if (!(langTerm in index))
            index[langTerm] = [];
        index[langTerm].push(i);

        var stem = getStem(entry, strLanguageCode);
        if (stem != null && stem != 'constructor') {
            if (!(stem in index))
                index[stem] = [];
            index[stem].push(i);
        }
    }
    return index; // index maps headwords of some language to indices of terms in the dictionary
}

/*
console.log('start');
var dict = prepareDictionary(rawDataCSV);
var indexNEO = prepareIndex(dict, 'NEO.');
var indexANG = prepareIndex(dict, 'ANG.');
console.log('ready');
*/

function getStem(entry, strLanguageCode) {
    switch (strLanguageCode) {
        case 'NEO.':
            return getStemNEO(entry);
        case 'CAS.':
            return getStemCAS(entry);
        default: return null;
    }
}

function getStemNEO(entry) {
    //var results = [];
    if ((entry['cat. gram.'] == 'v. tr.' ||
        entry['cat. gram.'] == 'v.tr.' ||
        entry['cat. gram.'] == 'v.intr.') &&
        entry['NEO.'].length > 3) {
        // remove -ere -are -ire
        const areRE = /are$/;
        if (areRE.test(entry['NEO.'])) {
            //results.push(entry['NEO.'].replace(areRE, 'a'));
            return entry['NEO.'].replace(areRE, '');
        }
        const ereRE = /ere$/;
        if (ereRE.test(entry['NEO.'])) {
            //results.push(entry['NEO.'].replace(ereRE, 'a'));
            // additional removal of é
            var stem = entry['NEO.'].replace(ereRE, '');
            var lioe = stem.lastIndexOf('é');
            if (lioe > stem.length - 5)
                stem[lioe] = 'e';
            return stem;
        }   
        const ireRE = /ire$/;
        if (ireRE.test(entry['NEO.'])) {
            //results.push(entry['NEO.'].replace(ireRE, 'e'));
            return entry['NEO.'].replace(ireRE, '');
        }
    }
    if ((entry['cat. gram.'] == 'v.pronom.intr.') &&
        entry['NEO.'].length > 5) {
        // remove -ere-se -are-se -ire-se
        const areRE = /are-se$/;
        if (areRE.test(entry['NEO.'])) {
            //results.push(entry['NEO.'].replace(areRE, 'a'));
            return entry['NEO.'].replace(areRE, '');
        }
        const ereRE = /ere-se$/;
        if (ereRE.test(entry['NEO.'])) {
            //results.push(entry['NEO.'].replace(ereRE, 'a'));
            // additional removal of é
            var stem = entry['NEO.'].replace(ereRE, '');
            var lioe = stem.lastIndexOf('é');
            if (lioe > stem.length - 5)
                stem[lioe] = 'e';
            return stem;
        }   
        const ireRE = /ire-se$/;
        if (ireRE.test(entry['NEO.'])) {
            //results.push(entry['NEO.'].replace(ireRE, 'e'));
            return entry['NEO.'].replace(ireRE, '');
        }
    }
    if ((entry['cat. gram.'] == 'adj' || entry['cat. gram.'] == 's.m.' || entry['cat. gram.'] == 's.f.' || entry['cat. gram.'] == 's.m. et s.f.') &&
        entry['NEO.'].length > 3) {
        // remove o a e endings
        const oRE = /o$/;
        if (oRE.test(entry['NEO.'])) {
            return entry['NEO.'].replace(oRE, '');
        }
        const aRE = /a$/;
        if (aRE.test(entry['NEO.'])) {
            return entry['NEO.'].replace(aRE, '');
        }
        const eRE = /e$/;
        if (eRE.test(entry['NEO.'])) {
            return entry['NEO.'].replace(eRE, '');
        }
    }
    return null;
}


function getStemCAS(entry) {
    // Spanish
    if ((entry['cat. gram.'] == 'v. tr.' ||
        entry['cat. gram.'] == 'v.tr.' ||
        entry['cat. gram.'] == 'v.intr.') &&
        entry['CAS.'].length > 3) {
        // remove -er -ar -ir
        const areRE = /ar$/;
        if (areRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(areRE, '');
        }
        const ereRE = /er$/;
        if (ereRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(ereRE, '');
        }
        const ireRE = /ir$/;
        if (ireRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(ireRE, '');
        }
    }
    if ((entry['cat. gram.'] == 'v.pronom.intr.') &&
        entry['CAS.'].length > 5) {
        // remove -ere-se -are-se -ire-se
        const areRE = /arse$/;
        if (areRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(areRE, '');
        }
        const ereRE = /erse$/;
        if (ereRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(ereRE, '');
        }
        const ireRE = /irse$/;
        if (ireRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(ireRE, '');
        }
    }
    if ((entry['cat. gram.'] == 'adj' || entry['cat. gram.'] == 's.m.' || entry['cat. gram.'] == 's.f.' || entry['cat. gram.'] == 's.m. et s.f.') &&
        entry['CAS.'].length > 3) {
        // remove o a e endings
        const oRE = /o$/;
        if (oRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(oRE, '');
        }
        const aRE = /a$/;
        if (aRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(aRE, '');
        }
        const eRE = /e$/;
        if (eRE.test(entry['CAS.'])) {
            return entry['CAS.'].replace(eRE, '');
        }
    }
    return null;
}

function TESTCompleteIndexLookup(word) {
    var indices = removeArrayDuplicates(advancedIndexLookup(word, indexNEO, 'NEO.'));
    var results = [];
    for (const i of indices) {
        results.push(dict[i]['NEO.']);
    }
    return results;
}

function removeArrayDuplicates(array) {
    return array.filter(function (item, pos) {
        return array.indexOf(item) == pos;
    });
}

function simpleIndexLookup(word, index) {
    if (word in index) {
        return index[word];
    }
    return [];
}

function advancedIndexLookup(word, index, strLanguageCode) {
    var results = simpleIndexLookup(word, index);
    switch (strLanguageCode) {
        case 'NEO.':
            results = results.concat(neoIndexLookup(word, index));
        case 'FRA.':
            results = results.concat(fraIndexLookup(word, index));
        case 'CAS.':
            results = results.concat(casIndexLookup(word, index));
    }
    return results;
}

function neoIndexLookup(word, index) {
    var results = [];
    const potentialEndings = [/s$/, /es$/,
        /[iea]?sione[s]?$/, /[iea]?tione[s]?$/, /[iea]?mènte[s]?$/, /[iea]?mènto[s]?$/, /[iea]?bile[s]?$/, /[iea]?tate[s]?$/, /[iea]?le[s]?$/,
        /[aei]re$/, /[oaei]$/, /[aei]t$/, /[aei]n$/, /[aei]nt$/, /[aei]s$/, /[ae]mos$/, /[ae]te[s]?$/,
        /[ae]va$/, /[ae]n$/, /[aei]vas$/, /[ae]vamos$/, /[ae]vates$/, /[ae]van$/, /[ae]vant$/,
        /[ae]i$/, /í$/, /[aei]iste$/, /[aei]mmos$/, /[aei]u$/, /[aei]stes$/, /[aei]ron$/,
        /[aei]ra[oi]?$/, /[aei]ri$/, /[aei]rà[sn]?$/, /[aei]eremos$/, /[aei]eretes$/, 
        /[aei]ría[sn]?$/, /[aei]río$/, /[aei]riamos$/, /[aei]riates$/,
        /[aui]to$/, /[aui]ta$/, /[aui]tos$/, /[aui]tas$/, /[aèi]ndo$/, /[aèi]nte$/, /[aèi]ntes$/];

    const potentialPrefixes = [/^anti/, /^pre/, /^pro/, /^post/, /^ambi/, /^ante/, /^contra/, /^mal/, /^mis/,
        /^horti/, /^macro/, /^micro/, /^mono/, /^multi/, /^òmni/, /^omni/, 
        /^re/, /^tele/, /^trans/, /^ultra/, /^circun/, /^super/, /^supra/,
        /^co/, /^co[nmlr]/,
        /^in/, /^i[nmlr]/,
        /^en/, /^e[nmlr]/,
        /^de/, /^di/, /^dis/, /^des/,
        /^ex/, /^e[ptcbdgmnlrsfvzj]/,
        /^sub/, /^su[ptcbdgmnlrsfvzj]/,
        /^a/, /^a[ptcbdgmnlrsfvzj]/, /^/];
    for (const pre of potentialPrefixes) {
        if (pre.test(word)) {
            var wordPrefixRemoved = word.replace(pre, '');
            for (const re of potentialEndings) {
                if (re.test(wordPrefixRemoved)) {
                    var potentialStem = wordPrefixRemoved.replace(re, '');
                    results = results.concat(simpleIndexLookup(potentialStem, index));
                    const neoVowelsSubstitute = { 'è': 'e', 'e': 'è', 'í': 'i', 'i': 'í', 'á': 'a', 'a': 'á' };
                    var lastVowelIndex = -1;
                    for (var i = potentialStem.length - 1; i > potentialStem.length - 5; i--) {
                        if (potentialStem[i] in neoVowelsSubstitute) {
                            lastVowelIndex = i;
                            break;
                        }
                    }
                    if (lastVowelIndex != -1) {
                        var altered = potentialStem;
                        altered[lastVowelIndex] = neoVowelsSubstitute[altered[lastVowelIndex]];
                        results = results.concat(simpleIndexLookup(altered, index));
                    }
                }
            }
        }
    }
    return results;
}


function casIndexLookup(word, index) {
    var results = [];
    const potentialEndings = [/s$/, /es$/,
        /[iea]?ción[e]?[s]?$/, /[iea]?miente[s]?$/, /[iea]?miento[s]?$/, /[iea]?ble[s]?$/, /[iea]?dad[e]?[s]?$/, /[iea]?l[e]?[s]?$/,
        /[aei]r$/, /[oaei]$/, /[aei]s$/, / [áéí]s$ /, /[aei]n$/, /[ae]mos$/, /[áé]is$/, /ís$/,
        /aba[s]?$/, /abamos$/, /ábamos$/, /abais$/, /aban$/,
        /ía[s]?$/, /íamos$/, /íais$/, /ían$/,
        /[éó]$/, /aste$/, /asteis$/, /aron$/,
        /í$/, /iste$/, /imos$/, /isteis$/, /ieron$/,
        /[aei]ré$/, /[aei]rá[s]?$/, /[aei]remos$/, /[aei]réis$/, /[aei]rán$/,
        /[aei]ría[s]?$/, /[aei]ríamos$/, /[aei]ríais$/, /[aei]rían$/,
        /[ai]do[s]?$/, /[ai]da[s]?$/, /[aei]nd[oa][s]?$/, /iend[oa][s]?$/, /yend[oa][s]?$/];

    const potentialPrefixes = [/^anti/, /^pre/, /^pro/, /^post/, /^ambi/, /^ante/, /^contra/, /^mal/, /^mis/,
        /^horti/, /^macro/, /^micro/, /^mono/, /^multi/, /^òmni/, /^omni/,
        /^re/, /^tele/, /^trans/, /^tra/, /^ultra/, /^circun/, /^super/, /^sobre/, /^sobra/,
        /^co/, /^com/,
        /^in/, /^i/,
        /^en/, /^e/,
        /^de/, /^di/, /^dis/, /^des/,
        /^es/,
        /^sub/, /^su/,
        /^a/, /^/];
    for (const pre of potentialPrefixes) {
        if (pre.test(word)) {
            var wordPrefixRemoved = word.replace(pre, '');
            for (const re of potentialEndings) {
                if (re.test(wordPrefixRemoved)) {
                    var potentialStem = wordPrefixRemoved.replace(re, '');
                    results = results.concat(simpleIndexLookup(potentialStem, index));
                }
            }
        }
    }
    return results;
}



function fraIndexLookup(word, index) {
    var results = [];
    const potentialEndings = [/s$/, /es$/,
        /[iea]?tion[s]?$/, /[iea]?ment[e]?[s]?$/, /[iea]?bl[e]?[s]?$/, /[iea]?té[s]?$/, /[iea]?l[e]?[s]?$/, /^au$/];

    const potentialPrefixes = [/^anti/, /^pré/, /^pro/, /^post/, /^ambi/, /^anté/, /^contra/, /^mal/, /^mis/,
        /^mau/, /^mé/, /^mes/, /^contre/, /^contr/,
        /^horti/, /^macro/, /^micro/, /^mono/, /^multi/, /^òmni/, /^omni/,
        /^re/, /^ré/, /^tele/, /^trans/, /^ultra/, /^circun/, /^super/, /^sur/,
        /^co/, /^co[nmlr]/,
        /^en/, /^e[nmlr]/,
        /^in/, /^i[nmlr]/,
        /^de/, /^di/, /^dé/, /^dés/, /^dys/,
        /^é/, /^é[ptcbdgmnlrsfvzj]/,
        /^sub/, /^su[ptcbdgmnlrsfvzj]/,
        /^a/, /^a[ptcbdgmnlrsfvzj]/, /^/];
    for (const pre of potentialPrefixes) {
        if (pre.test(word)) {
            var wordPrefixRemoved = word.replace(pre, '');
            for (const re of potentialEndings) {
                if (re.test(wordPrefixRemoved)) {
                    var potentialStem = wordPrefixRemoved.replace(re, '');
                    results = results.concat(simpleIndexLookup(potentialStem, index));
                }
            }
        }
    }
    return results;
}