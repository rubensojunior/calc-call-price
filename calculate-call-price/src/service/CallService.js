function getMinutePrice(codOrigem, codDestino) {
    var minutePrice = 0

    if(codOrigem === '011' && codDestino === '016')
        minutePrice = 1.9
    else if(codOrigem === '016' && codDestino === '011')
        minutePrice = 2.9
    else if(codOrigem === '011' && codDestino === '017')
        minutePrice = 1.7
    else if(codOrigem === '017' && codDestino === '011')
        minutePrice = 2.7
    else if(codOrigem === '011' && codDestino === '018')
        minutePrice = 0.9
    else if(codOrigem === '018' && codDestino === '011')
        minutePrice = 1.9

    return minutePrice
}

export function calcCallPriceWithFM(codOrigem, codDestino, plano, minutos) {
    var discount = 0

    var minutePrice = getMinutePrice(codOrigem,codDestino)

    if(minutePrice === 0)
        return '-'

    if(plano === 'FaleMais 30')
        discount = 30
    else if(plano === 'FaleMais 60')
        discount = 60
    else if(plano === 'FaleMais 120')
        discount = 120

    if(discount === 0)
        return '-'

    var minutesWithDiscount = minutos - discount

    var totalPrice = 0

    if(minutesWithDiscount > 0)
        totalPrice = minutesWithDiscount * minutePrice * 1.1

    return totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function calcCallPriceWithoutFM(codOrigem, codDestino, minutos) {
    var minutePrice = getMinutePrice(codOrigem,codDestino)

    if(minutePrice === 0)
        return '-'

    var totalPrice = 0

    if(minutos > 0)
        totalPrice = minutos * minutePrice

    return totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default { calcCallPriceWithFM, calcCallPriceWithoutFM }