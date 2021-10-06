
/**
 * @summary Builds an order
 * @param {Object} context - current context
 * @param {Object} order an order to build
 * @returns {Object} An order builded,
 */
export default function buildOrder(order) {

    const cleanedItems = Array.isArray(order.shipping) && (order.shipping[0].items || []).map((item) => {
        return {
            id: item._id,
            productId: item._id,
            name: item.title,
            quantity: item.quantity,
            price: item.price.amount,
            properties: []
        };
    });

    console.log('account', order.account);
    console.log("address", order.shipping[0].address)

    const cleanedBilling = {
        first_name: (order.account?.profile && order.account.profile.firstName) || "",
        last_name: (order.account?.profile && order.account.profile.lastName) || "",
        address1: order.shipping[0].address?.address || "",
        address2: order.shipping[0].address?.reference || "",
        city: "",
        state: "",
        latitude: order.shipping[0].address?.geolocation?.latitude || 0,
        longitude: order.shipping[0].address?.geolocation?.longitude || 0,
        phone: ""
    }

    const cleanedShipping = {
        first_name: (order.account?.profile && order.account.profile.firstName) || "",
        last_name: (order.account?.profile && order.account.profile.lastName) || "",
        address1: order.shipping[0].address?.address || "",
        address2: order.shipping[0].address?.reference || "",
        city: "",
        state: "",
        latitude: order.shipping[0].address?.geolocation?.latitude || 0,
        longitude: order.shipping[0].address?.geolocation?.longitude || 0,
        phone: ""
    };

    const cleanedTotal = {
        shop_money: {
            amount: order.shipping[0].invoice.total
        }
    };

    const cleanedShippingTotal = {
        shop_money: {
            amount: order.shipping[0].invoice.shipping
        }
    };

    const buildDate = (datetime) => {
        const date = new Date(datetime);
        return date.getDate();
    };

    const buildTime = (datetime) => {
        const date = new Date(datetime);
        return date.getTime();
    };

    const cleanedMetadata = [
        {
            "name": "pickupDate",
            "value": buildDate(order.shipping[0].pickupDetails?.datetime) || null
        },
        {
            "name": "pickupTime",
            "value": buildTime(order.shipping[0].pickupDetails?.datetime) || null
        },
        {
            "name": "deliveryDate",
            "value": ""
        },
        {
            "name": "deliveryTime",
            "value": ""
        },
        {
            "name": "giftFrom",
            "value": order.giftNote?.sender || null
        },
        {
            "name": "giftTo",
            "value": order.giftNote?.reveiver || null
        },
        {
            "name": "giftNote",
            "value": order.giftNote?.message || null
        }
    ];

    const cleanedShippingLines = [
        {
            title: order.shipping[0]?.shipmentMethod?.label || null
        }
    ];

    return {
        id: order._id,
        order_number: order.orderId,
        line_items: cleanedItems,
        billing_address: cleanedBilling,
        shipping_address: cleanedShipping,
        note: (order.notes && order.notes[0]?.content) || "",
        total_price_set: cleanedTotal,
        total_shipping_price_set: cleanedShippingTotal,
        email: order.email || "",
        note_attributes: cleanedMetadata,
        shipping_lines: cleanedShippingLines
    };;
}