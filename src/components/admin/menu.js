export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboard.text",
        icon: "bx-bar-chart-square",
        link: "/"
    },
    {
        id: 3,
        label: "menuitems.school_and_campus.text",
        icon: "bxs-school",
        link: "/schoolandcampus"
    },
    {
        id: 4,
        label: "menuitems.delivery_unit.text",
        icon: "bxs-school",
        link: "/schoolandcampus"
    },
    {
        id: 5,
        label: "menuitems.operation.text",
        isTitle: true
    },
    {
        id: 12,
        label: "menuitems.ecommerce.text",
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
    },
    {
        id: 21,
        label: "menuitems.crypto.text",
        icon: "bx-bitcoin",
        subItems: [
            {
                id: 22,
                label: "menuitems.crypto.list.wallet",
                link: "#",
                parentId: 21
            },
            {
                id: 23,
                label: "menuitems.crypto.list.buy/sell",
                link: "#",
                parentId: 21
            },
            {
                id: 24,
                label: "menuitems.crypto.list.exchange",
                link: "#",
                parentId: 21
            },
            {
                id: 25,
                label: "menuitems.crypto.list.lending",
                link: "#",
                parentId: 21
            },
            {
                id: 26,
                label: "menuitems.crypto.list.orders",
                link: "#",
                parentId: 21
            },
            {
                id: 27,
                label: "menuitems.crypto.list.kycapplication",
                link: "#",
                parentId: 21
            },
            {
                id: 28,
                label: "menuitems.crypto.list.icolanding",
                link: "#",
                parentId: 21
            }
        ]
    },
    {
        id: 29,
        label: "menuitems.email.text",
        icon: "bx-envelope",
        subItems: [
            {
                id: 30,
                label: "menuitems.email.list.inbox",
                link: "#",
                parentId: 29
            },
            {
                id: 31,
                label: "menuitems.email.list.reademail",
                link: "#",
                parentId: 29
            },
            {
                id: 32,
                label: "menuitems.email.list.template.text",
                parentId: 29,
                subItems: [
                    {
                        id: 33,
                        label: 'menuitems.email.list.template.list.basic',
                        link: '#',
                        parentId: 32
                    },
                    {
                        label: 'menuitems.email.list.template.list.alert',
                        link: '#',
                        parentId: 32
                    },
                    {
                        label: 'menuitems.email.list.template.list.billing',
                        link: '#',
                        parentId: 32
                    }
                ]
            }
        ]
    },
    {
        id: 34,
        label: "menuitems.invoices.text",
        icon: "bx-receipt",
        subItems: [
            {
                id: 35,
                label: "menuitems.invoices.list.invoicelist",
                link: "#",
                parentId: 34
            },
            {
                id: 36,
                label: "menuitems.invoices.list.invoicedetail",
                link: "#",
                parentId: 34
            }
        ]
    }
];

