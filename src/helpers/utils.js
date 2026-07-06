// import { BASE_URL } from './constants.js';

export const parsedDescription = (description) => {
    return description.replaceAll('\\\\', '\\').replaceAll('\\r', '').replaceAll('\\n', '<br>').replaceAll('\\', '');
}


export const getRarityIconOrNot = (rarity) => {

    const rarities = [
        'common',
        'rare',
        'super rare',
        'ultra rare',
        'extra secret rare',
        'ghost rare',
        'gold rare',
        'parallel rarity',
        'premium gold rare',
        'prismatic secret rare',
        'secret rare',
        'ultra rare',
        'ultimate rare',
        'duel terminal',
        'na',
        'other',
        'gold secret rare',

    ];
    rarity = rarity.toLowerCase();
    if (rarities.includes(rarity))
        return `/assets/img/rarity/${rarity}.png`;
    else
        return null;

}


export function capitalize(text) {
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}



export function getSetCodeFromCardSet(cardSet, set_name) {
    let set_code = "";
    cardSet.forEach(function (set) {
        if (set.set_name === set_name) {
            set_code = set.set_code;
        }

    })

    return set_code;

}

export function getPriceFromCardSet(cardSet, set_name) {
    let price = "";
    cardSet.forEach(function (set) {
        if (set.set_name === set_name) {
            price = set.set_price;
        }

    })

    return price;

}