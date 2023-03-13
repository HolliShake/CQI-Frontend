
export const menuItems = [
    {
        id: 1,
        label: "admin.sidebar-items.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "admin.sidebar-items.dashboard.text",
        icon: "bx-bar-chart-square",
        link: "/"
    },
    {
        id: 3,
        label: "admin.sidebar-items.school-and-campus.text",
        icon: "bxs-school",
        link: "/schoolandcampus"
    },
    {
        id: 4,
        label: "admin.sidebar-items.delivery-unit.text",
        icon: "bxs-school",
        link: "/schoolandcampus"
    },
    {
        id: 5,
        label: "admin.sidebar-items.operation.text",
        isTitle: true
    },
    {
        id: 12,
        label: "admin.sidebar-items.admission.text",
        icon: "bx-store",
        subItems: [
            {
                id: 13,
                label: "menuitems.ecommerce.list.products",
                link: "#",
                parentId: 12
            },
            {
                id: 14,
                label: "menuitems.ecommerce.list.productdetail",
                link: "#",
                parentId: 12
            },
            {
                id: 15,
                label: "menuitems.ecommerce.list.orders",
                link: "#",
                parentId: 12
            },
            {
                id: 16,
                label: "menuitems.ecommerce.list.customers",
                link: "#",
                parentId: 12
            },
            {
                id: 17,
                label: "menuitems.ecommerce.list.cart",
                link: "#",
                parentId: 12
            },
            {
                id: 18,
                label: "menuitems.ecommerce.list.checkout",
                link: "#",
                parentId: 12
            },
            {
                id: 19,
                label: "menuitems.ecommerce.list.shops",
                link: "#",
                parentId: 12
            },
            {
                id: 20,
                label: "menuitems.ecommerce.list.addproduct",
                link: "#",
                parentId: 12
            }
        ]
    }
];

