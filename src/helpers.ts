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

export const convertMonths = (month: number) => {
    switch (month) {
    case 1:
        return 'Stycznia'
    case 2:
        return 'Lutego'
    case 3:
        return 'Marca'
    case 4:
        return 'Kwietnia'
    case 5:
        return 'Maja'
    case 6:
        return 'Czerwca'
    case 7:
        return 'Lipca'
    case 8:
        return 'Sierpnia'
    case 9:
        return 'Września'
    case 10:
        return 'Października'
    case 11:
        return 'Listopada'
    case 12:
        return 'Grudnia'
    default:
        return ''
    }
}