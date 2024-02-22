const DummyData = {
    monthly: {
        title: "Monthly premium plan",
        description: "You can choose your preferred premium plan from here. Check out the yearly prices, you always get discount there.",
        price: 30,
        isMonthly: true,
        discount: 0,
        PlainDetails: [
            "This plan is for 1 month",
            "You can cancel this plan anytime",
            "You can use this plan for 1 month",
            "Company will provide you 24/7 support",
            "Company can change the price anytime",
            "Company can cancel your membership anytime"
        ]
    },
    yearly: {
        title: "Yearly premium plan",
        description: "You can choose your preferred premium plan from here. Check out the yearly prices, you always get discount there.",
        price: 300,
        isMonthly: false,
        discount: 10,
        PlainDetails: [
            "This plan is for 1 year",
            "You can cancel this plan anytime",
            "You can use this plan for 1 year",
            "Company will provide you 24/7 support",
            "Company can change the price anytime",
            "Company can cancel your membership anytime"
        ]
    }


}

export default DummyData;