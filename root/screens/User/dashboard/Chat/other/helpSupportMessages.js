export function getTime(){
    let time = new Date().getTime()
    let date = new Date(time);
    let hours = date.getHours(); // Minutes part from the timestamp
    let minutes = date.getMinutes(); // Seconds part from the timestamp
    minutes = minutes < 10 ? '0'+minutes : minutes;
    //display format: 12:00 AM
    let formattedTime = (hours>12 ? hours-12 : hours) + ':' + minutes + " " + (hours >= 12 ? 'PM' : 'AM');
    return formattedTime
}


const MainMenuMessage = {
    id: -2,
    content: "Welcome to KDR." +
        "\nHow can we help you?" +
        "\n1. Is there a cost or subscription associated with using K.D.R for businesses?" +
        "\n2. What features does K.D.R offer to businesses to enhance their visibility and reach?" +
        "\n3. What kind of support or assistance does KDR offer to businesses using the platform?" +
        "\n4. What is K.D.R (konnecting dots for retailers)?" +
        "\n5. How does K.D.R gather and verify information about businesses?" +
        "\n6. Does K.D.R cover businesses in all industries or are there specific categories?" +
        "\n7. Are there any specific criteria or requirements for businesses to join K.D.R?," +
        "\n8. Can I have different services on the same account?" +
        "\n9. How do I get my business listed on K.D.R?" +
        "\n10. What sets K.D.R apart from traditional search engines or similar platforms?" +
        "\n11. What is the customer service number?" +
        "\n12. Can consumers leave reviews or ratings for businesses on the platform?" +
        "\n13. How do I get featured on the K.D.R promotion section? ", 
    time: getTime(),
    senderInfo: {
        id: 0,
        Name: "KDR",
        image: null,
    },
    sender: "info@konnectingretailers.com",
    date: new Date().getDate(),
}
const ServiceMenuMessage = (obj)=>{
    let categories = obj.results
    let content = "What service do you need help with?\n"
    categories.forEach((category, index)=>{
        content += `${index+1}. ${category.title}\n`
    })
    content += `(Reply with service title)`
    return {
        id: -3,
        content: content,
        time: getTime(),
        senderInfo: {
            id: 0,
            Name: "KDR",
            image: null,
        },
        sender: "info@konnectingretailers.com",
        date: new Date().getDate(),

    }

}
const ServiceReplyMessage = (obj, text)=> {
    let categories = obj.results
    let content = ""
    let id = -35

    categories.forEach((category, index) => {

        if (category.title.toLowerCase().trim() === text.toLowerCase().trim()) {
            content += `What in '${text}' do you need help with?\n`

            category.sub_categories.forEach((sub, index) => {
                content += `${index + 1}. ${sub.title}\n`
            })
            content += `(Reply with service title)`
        }
    })
    if(content === "")
    {
        content = "Please enter a valid service title\n Enter a valid Service title"
        id=-3
    }

    return {
        id: id,
        content: content,
        time: getTime(),
        senderInfo: {
            id: 0,
            Name: "KDR",
            image: null,
        },
        sender: "info@konnectingretailers.com",
        date: new Date().getDate(),
    }
}




export default MainMenuMessage
export {ServiceMenuMessage,ServiceReplyMessage}
