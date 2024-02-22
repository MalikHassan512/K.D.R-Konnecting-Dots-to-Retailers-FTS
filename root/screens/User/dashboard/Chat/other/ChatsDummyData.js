/*
id={item.item.id}
name={item.item.name}
message={item.item.messages.length !== 0 ? item.item.messages[0].message : ""}
email={item.item.email}
time={item.item.messages.length !== 0 ? item.item.messages[0].dateTime.time : ""}
uri={Urls.dp + item.item.dp}
isNew={!item.item.Notcount > 0}
newMessage={false}
noOfNotSeen={item.item.Notcount}

 */

const ChatsDummyData = [
    {
        id: 1,
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        email: "jhon@examole.com",
        time: "12:00 PM",
        uri: "https://picsum.photos/200",
        isNew: true,
        newMessage: false,
        noOfNotSeen: 2,
    },
    {
        id: 2,
        name: "Ali",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        email: "jhon@examole.com",
        time: "12:20 PM",
        uri: "https://picsum.photos/200",
        isNew: false,
        newMessage: false,
        noOfNotSeen: 0,

    }
]


export default ChatsDummyData;