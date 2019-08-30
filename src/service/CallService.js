function getMinutePrice(sourceCod, destinyCod) {
    var minutePrice = 0

    if(sourceCod === '011' && destinyCod === '016')
        minutePrice = 1.9
    else if(sourceCod === '016' && destinyCod === '011')
        minutePrice = 2.9
    else if(sourceCod === '011' && destinyCod === '017')
        minutePrice = 1.7
    else if(sourceCod === '017' && destinyCod === '011')
        minutePrice = 2.7
    else if(sourceCod === '011' && destinyCod === '018')
        minutePrice = 0.9
    else if(sourceCod === '018' && destinyCod === '011')
        minutePrice = 1.9

    return minutePrice
}

export function calcCallPriceWithFM(sourceCod, destinyCod, plan, minutes) {
    var discount = 0

    var minutePrice = getMinutePrice(sourceCod,destinyCod)

    if(minutePrice === 0)
        return '-'

    if(plan === 'FaleMais 30')
        discount = 30
    else if(plan === 'FaleMais 60')
        discount = 60
    else if(plan === 'FaleMais 120')
        discount = 120

    if(discount === 0)
        return '-'

    var minutesWithDiscount = minutes - discount

    var totalPrice = 0

    if(minutesWithDiscount > 0)
        totalPrice = minutesWithDiscount * minutePrice * 1.1

    return totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function calcCallPriceWithoutFM(sourceCod, destinyCod, minutes) {
    var minutePrice = getMinutePrice(sourceCod,destinyCod)

    if(minutePrice === 0)
        return '-'

    var totalPrice = 0

    if(minutes > 0)
        totalPrice = minutes * minutePrice

    return totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default { calcCallPriceWithFM, calcCallPriceWithoutFM }