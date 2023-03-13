
export const menuItems = [
    {
        id: 1,
        label: "Menu",
        isTitle: true
    },
    {
        id: 2,
        label: "Dashboard",
        icon: "bx-bar-chart-square",
        link: "/"
    },
    {
        id: 3,
        label: "School and campuses",
        icon: "bxs-school",
        link: "/schoolandcampus"
    },
    {
        id: 4,
        label: "Delivery unit",
        icon: "bxs-school",
        link: "/schoolandcampus"
    },
    {
        id: 5,
        label: "Operation",
        isTitle: true
    },
    {
        id: 12,
        label: "Admission",
        icon: "bx-store",
        subItems: [
            {
                id: 13,
                label: "Products",
                link: "#",
                parentId: 12
            },
            {
                id: 14,
                label: "Product detail",
                link: "#",
                parentId: 12
            }
        ]
    }
];

