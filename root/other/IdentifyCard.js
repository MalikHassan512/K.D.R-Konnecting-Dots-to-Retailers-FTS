import {FontAwesome, FontAwesome5} from "@expo/vector-icons";


export default function getCardType(number,Color) {
    const SIZE = 20;
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return <FontAwesome5 name="cc-visa" size={SIZE} color={Color}/>;

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return <FontAwesome name="cc-mastercard" size={SIZE} color={Color}/>;

    return <FontAwesome name="bank" size={SIZE} color={Color}/>;
}

const hideCardNumber = (number) => {
    let length = number.length;
    let lastFourDigits = number.substring(length - 4, length);
    let firstDigits = number.substring(0, length - 4);
    let hiddenDigits = "";
    let count = 0;
    for (let i = 0; i < firstDigits.length; i++) {
        hiddenDigits += "*";
        count++;
        if (count === 4) {
            hiddenDigits += " ";
            count = 0;
        }
    }
    return hiddenDigits + " " + lastFourDigits;
}


function RemoveYearFromCurrentDate(year) {
    let date = new Date();
    date.setFullYear(date.getFullYear() - year);
    console.log(date)
    return date;
}




export {
    hideCardNumber,
    RemoveYearFromCurrentDate
}