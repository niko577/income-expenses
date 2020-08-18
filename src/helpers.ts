export const colors: string[] = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#5c6bc0',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
]

export const categoryIconList: string[] = [
    'category',
    'shopping_basket',
    'restaurant',
    'theaters',
    'directions_bus',
    'card_giftcard',
    'local_mall',
    'spa',
    'face',
    'work_outline',
]

export const accountIconList: string[] = [
    'credit_card',
    'account_balance_wallet',
    'account_balance',
    'attach_money',
    'euro_symbol',
    'computer',
    'work',
    'smartphone',
    'fastfood',
    'child_friendly',
    'shopping_basket',
]

export const convertMonths = (month: number, type: number) => {
    switch (month) {
    case 1:
        return type === 0 ? 'Stycznia' : 'Styczeń'
    case 2:
        return type === 0 ? 'Lutego' : 'Luty'
    case 3:
        return type === 0 ? 'Marca' : 'Marzec'
    case 4:
        return type === 0 ? 'Kwietnia' : 'Kwiecień'
    case 5:
        return type === 0 ? 'Maja' : 'Maj'
    case 6:
        return type === 0 ? 'Czerwca' : 'Czerwiec'
    case 7:
        return type === 0 ? 'Lipca' : 'Lipiec'
    case 8:
        return type === 0 ? 'Sierpnia' : 'Sierpień'
    case 9:
        return type === 0 ? 'Września' : 'Wrzesień'
    case 10:
        return type === 0 ? 'Października' : 'Październik'
    case 11:
        return type === 0 ? 'Listopada' : 'Listopad'
    case 12:
        return type === 0 ? 'Grudnia' : 'Grudzień'
    default:
        return ''
    }
}

export const prettyPrice = (price: number) => {
    const stringify = price.toString()
    const replaced = stringify.replace('.', ',')
    return replaced
}